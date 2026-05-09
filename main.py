from flask import Flask, request, render_template, jsonify, redirect
from flask_mail import Mail, Message
import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configuring Flask-Mail using environment variables
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

mail = Mail(app)


# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv('MYSQL_HOST', 'localhost'),
        database=os.getenv('MYSQL_DATABASE'),
        user=os.getenv('MYSQL_USER'),
        password=os.getenv('MYSQL_PASSWORD')
    )


@app.route("/")
def index():
    try:
        # Fetch the latest 4 rows from recentWorks table
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT postUrl, postCaption, postImage, postTags
            FROM recentWorks
            ORDER BY id DESC
            LIMIT 4
            """
        )
        recent_works = cursor.fetchall()

        # Fetch the latest 4 rows from blogPosts table, sorted by updatedAt
        cursor.execute(
            """
            SELECT postDetailId, postTitle, postCategory, postImgUrl, updatedAt
            FROM blogPosts
            ORDER BY updatedAt DESC
            LIMIT 4
            """
        )
        blog_posts = cursor.fetchall()

    except Exception as e:
        print(f"Database Error: {e}")
        recent_works = []
        blog_posts = []
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

    # Pass both the fetched data to the template
    return render_template("index.html", recent_works=recent_works, blog_posts=blog_posts)


@app.route('/send', methods=['POST'])
def send_email():
    # Get data from the form
    name = request.form.get('name')
    email = request.form.get('email')
    subject = request.form.get('subject')
    message = request.form.get('message')

    if not all([name, email, subject, message]):
        return jsonify({'status': 'error', 'message': 'All fields are required'}), 400

    # Send the email
    try:
        msg = Message(subject=f"New message from {name}",
                      sender=email,
                      recipients=[os.getenv('RECIPIENT_EMAIL')])  # Replace with your email
        msg.body = f"Subject: {subject}\n\nName: {name}\nEmail: {email}\n\nMessage:\n{message}"
        mail.send(msg)
        return redirect('/')
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'status': 'error', 'message': 'Failed to send email. Please try again later.'}), 500


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5000)

