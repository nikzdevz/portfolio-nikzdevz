pipeline {
  environment {
    registry = "nikzdevz/nikzdevz-portfolio"
    registryCredential = "dockerhub_creds"
    dockerImage = ''
  }
  agent any
  stages {

    stage('Clone') {
      steps {
        // Pull down your Git repository; change 'main' if needed
        git branch: 'main',
            url: 'https://github.com/nikzdevz/portfolio-nikzdevz.git'
      }
    }

    stage('Build') {
      steps {
        script {
          // Build Docker image, tagging it with build number
          dockerImage = docker.build("${registry}:${env.BUILD_NUMBER}")
        }
      }
    }

    stage('Push') {
      steps {
        script {
          // Log in to Docker Hub and push the image
          docker.withRegistry('', registryCredential) {
            // Push with BUILD_NUMBER tag
            dockerImage.push("${env.BUILD_NUMBER}")
            // Also push "latest" tag
            dockerImage.push('latest')
          }
        }
      }
    }

    stage('Cleanup') {
      steps {
        // Remove images locally to save space
        sh "docker rmi ${registry}:${env.BUILD_NUMBER}"
        sh "docker rmi ${registry}:latest"
      }
    }
  }
}
