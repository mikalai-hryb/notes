# Jenkins

Jenkins is a self-contained, open source automation server which can be used to automate all sorts of tasks related to building, testing, and delivering or deploying software.

## Glossary

* [https://www.jenkins.io/doc/book/glossary/] - general
* [https://www.jenkins.io/doc/book/glossary/#build-status] - build statuses

## Example

```groovy
/* Jenkinsfile (Declarative Pipeline) */
/* Requires the Docker Pipeline plugin */
pipeline {
    agent { docker { image 'python:3.13.0-alpine3.20' } }

    environment {
        DISABLE_AUTH = 'true'
        DB_ENGINE    = 'sqlite'
    }

    stages {
        stage('build') {
            steps {
                sh 'python --version'
            }
        }

        stage('Sanity check') {
            steps {
                input "Does the staging environment look ok?"
            }
        }
        stage('Deploy') {
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    retry(5) {
                        sh './flakey-deploy.sh'
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'This will always run'
            junit 'build/reports/**/*.xml'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
```

## Questions

### What does UNSTABLE status mean?

The Build had some errors but they were not fatal. A Build is unstable if it was built successfully and one or more publishers report it unstable.

For example,

1) JUnit publisher can set pipeline to UNSTABLE if tests fail
2) we can set UNSTABLE status with `unstable` step
3) we can set UNSTABLE status with `catchError` step

### Scripted vs Declarative Pipelines

#### Scripted

Scripted Pipeline is the original pipeline syntax for Jenkins, and it is based on Groovy scripting language.
In Scripted Pipeline, the entire workflow is defined in a single file called a Jenkinsfile.

Scripted Pipeline drawbacks:

1) Not all plugins are compatible with Declarative Pipelines.
2) Declarative syntax is stricter, so using declarative pipelines steals a bit of the developer’s freedom.

#### Declarative

Declarative Pipeline is a more recent addition to Jenkins and provides a more structured and simpler syntax for defining pipelines.
Declarative Pipeline is based on the Groovy programming language, but it uses a Groovy-based DSL (Domain-Specific Language) for pipeline configuration.
The main benefit of Declarative Pipeline is its readability and ease of use.

Declarative Pipeline drawbacks:

1) Java and Groovy engineers try to write custom code instead of using functionality available through Jenkins DSL
2) No established formal structure or flow for pipelines, which can lead to the creation of unstable pipeline code that is difficult to maintain or interpret

#### Conclusion

Scripted Pipeline is more flexible
Declarative Pipeline is more readable (stages section, post section in declarative pipeline and set of try/catch in scripted pipelines)

### What is DSL

Pipelines are defined using a domain-specific language (DSL) based on Groovy.

Groovy is a dynamic language which runs on the Java Platform and has huge support for building up your own Domain Specific Languages (DSLs) by its concise, natural syntax, integrated meta-programming features and excellent interoperability with java.

Apache Groovy is a Java-syntax-compatible object-oriented programming language for the Java platform.

### Pipeline vs Job?

It's really about Freestyle vs Pipeline
In Freestyle you can define the same steps and connect a few Freestyle jobs with Upstream/Downstream trigger.
The main diff is what happens after Jenkins restart: Pipeline continue working from the stop point, Freestyle does not (the downstream jobs will not be triggered)

### What are Jenkins items?

* Freestyle job
* Pipeline
* Multibranch Pipeline
