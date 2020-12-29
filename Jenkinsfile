pipeline {
    agent { label 'nodejs' }
    post {
      failure {
        sh 'printenv | sort'
        updateGitlabCommitStatus name: "${env.LAST_STAGE}", state: 'failed'
      }
    }
    options {
      gitLabConnection('gitlab.zhayanmao.com')
      gitlabBuilds(builds: ['prepare', 'checkout', 'install', 'build', 'release'])
    }
    triggers {
      gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All', secretToken: 'cdfc8aaf18104bed4afe1c1694c24fac')
    }
    stages {
      stage('prepare') {
        steps {
          script {
            env.LAST_STAGE = 'prepare'
          }
          updateGitlabCommitStatus name: 'prepare', state: 'running'
          script {
            // parse TAG_NAME
            if (env.TAG_NAME == null && env.gitlabSourceBranch != null) {
              if (env.gitlabSourceBranch.startsWith('refs/tags/')) {
                env.TAG_NAME = env.gitlabSourceBranch.substring('refs/tags/'.length());
              }
            }
            sh 'printenv | sort'
          }
          updateGitlabCommitStatus name: 'prepare', state: 'success'
        }
      }
      stage('checkout') {
        steps {
          script {
            env.LAST_STAGE = 'checkout'
          }
          updateGitlabCommitStatus name: 'checkout', state: 'running'
          checkout scm
          // merge before build for MERGE request
          script {
            if (env.gitlabActionType != null && gitlabActionType == 'MERGE') {
              sh 'git checkout -f $gitlabTargetBranch'
              sh 'git merge --ff $gitlabMergeRequestLastCommit'
            }
          }
          updateGitlabCommitStatus name: 'checkout', state: 'success'
        }
      }
      stage('install') {
        steps {
          script {
            env.LAST_STAGE = 'install'
          }
          updateGitlabCommitStatus name: 'install', state: 'running'
          sh 'git clean -fdx'
          sh 'yarn install'
          updateGitlabCommitStatus name: 'install', state: 'success'
        }
      }
      stage('build') {
        steps {
          script {
            env.LAST_STAGE = 'build'
          }
          updateGitlabCommitStatus name: 'build', state: 'running'
          // build
          sh 'yarn build'
          updateGitlabCommitStatus name: 'build', state: 'success'
        }
      }
      stage('release') {
        steps {
          script {
            env.LAST_STAGE = 'release'
          }
          updateGitlabCommitStatus name: 'release', state: 'running'
          // npm publish
          script {
            if (env.TAG_NAME != null && env.TAG_NAME.startsWith('release-')) {
              sh 'npm publish'
            } else {
              echo 'skip release'
            }
          }
          updateGitlabCommitStatus name: 'release', state: 'success'
        }
      }
    }
}
