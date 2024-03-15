document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offsetTop = targetElement.offsetTop - document.querySelector('.header').offsetHeight;

        window.scroll({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
});


// For Chrome, Safari, and Edge
document.body.style.overflow = 'hidden';

// For Firefox
window.addEventListener('DOMContentLoaded', (event) => {
    document.body.style.overflow = 'auto';
});

document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector('.header');
    var menu = document.querySelector('.menu');

    window.addEventListener('scroll', function () {
        if (window.scrollY >= 80) {
            header.classList.add('scrolled');
            menu.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            menu.classList.remove('scrolled');
        }
    });
});

// Add the following script to handle the download button click
document.addEventListener("DOMContentLoaded", function () {
    const downloadResumeButton = document.getElementById('downloadResume');

    downloadResumeButton.addEventListener('click', function () {
        // Specify the path to your PDF file
        const pdfPath = 'doc/ResumeSD.pdf';

        // Trigger the download action
        window.open(pdfPath, '_blank');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var aboutSection = document.getElementById("about");
    var leftAbout = document.querySelector(".left-about");
    var rightAbout = document.querySelector(".right-about");

    window.addEventListener('scroll', function () {
        // Get the height of the viewport
        var windowHeight = window.innerHeight;

        // Get the bottom position of the about section from the top
        var aboutBottomPosition = aboutSection.getBoundingClientRect().bottom;

        // Calculate the scroll position relative to the about section
        var scrollPosition = windowHeight - aboutBottomPosition;

        // Limit the translateX to -100% to 0 for left about
        var leftTranslateX = Math.min(0, scrollPosition + (0.4 * windowHeight));
        // Apply the translateX to the left about section
        leftAbout.style.transform = 'translateX(' + leftTranslateX + 'px)';

        // Limit the translateX to 0 to 100% for right about
        var rightTranslateX = Math.max(0, -scrollPosition - (0.4 * windowHeight));
        // Apply the translateX to the right about section
        rightAbout.style.transform = 'translateX(' + rightTranslateX + 'px)';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var educationSection = document.getElementById("education");
    var educationLeft = document.querySelector(".education-left");
    var educationRight = document.querySelector(".education-right");
    var educationMiddle = document.querySelector(".education-middle");

    window.addEventListener('scroll', function () {
        var educationSectionBottom = educationSection.getBoundingClientRect().bottom;
        var windowHeight = window.innerHeight;
        var scrollPosition = window.scrollY;
        // console.log("Scroll Position => " + scrollPosition + "  Window Height => " + windowHeight + " EduBtm " + educationSectionBottom/2 + "   Val => " + (educationSectionBottom/2 <= windowHeight));
        if(educationSectionBottom/1.2 <= windowHeight){
            educationLeft.classList.add('reached');
            educationRight.classList.add('reached');
            educationMiddle.classList.add('reached');
        }else{
            educationLeft.classList.remove('reached');
            educationRight.classList.remove('reached');
            educationMiddle.classList.remove('reached');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.getElementById('typing-text');

    const texts = [
        'Gmail: nikzdevz@gmail.com',
        'Instagram: itz_mr_nikhil',
        'Telegram: @nikzdevz'
    ];

    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[textIndex].length) {
            typingText.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 50);
        } else {
            setTimeout(changeText, 2000); // Wait for 2 seconds before changing text
        }
    }

    function changeText() {
        setTimeout(() => {
            charIndex = 0;
            textIndex = (textIndex + 1) % texts.length;
            typingText.textContent = '';
            setTimeout(type, 0);
        }, 3000); // Wait for 3 seconds before starting the typing animation for the next text
    }

    setTimeout(type, 0);
});




