pipeline {
  environment {
    registry = "nikzdevz/nikzdevz-portfolio"
    registryCredential = "dockerhub_creds"
    dockerImage = ''
    SERVER_IP = credentials('droidlabzServerIP')
    SSH_CREDS = credentials('droidlabzServerSecret')
    DEPLOYMENT_NAME = credentials('nikzdevzPorfolioDeploymentName')
  }
  agent any
  stages {
    stage('Clone') {
      steps {
        git branch: 'main', url: 'https://github.com/nikzdevz/portfolio-nikzdevz.git'
      }
    }

    stage('Build') {
      steps {
        script {
          dockerImage = docker.build("${registry}:${env.BUILD_NUMBER}")
        }
      }
    }

    stage('Push') {
      steps {
        script {
          docker.withRegistry('', registryCredential) {
            dockerImage.push("${env.BUILD_NUMBER}")
            dockerImage.push('latest')
          }
        }
      }
    }

    stage('Deploy to Minikube') {
      steps {
        script {
          sshagent(credentials: ['droidlabzServerSecret']) {
            sh """
              ssh -o StrictHostKeyChecking=no ${SSH_CREDS_USR}@${SERVER_IP} '
                minikube image pull ${registry}:${env.BUILD_NUMBER}
                kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${registry}:${env.BUILD_NUMBER}
                kubectl rollout status deployment/${DEPLOYMENT_NAME}
              '
            """
          }
        }
      }
    }

    stage('Cleanup') {
      steps {
        sh "docker rmi ${registry}:${env.BUILD_NUMBER}"
        sh "docker rmi ${registry}:latest"
      }
    }
  }
}
