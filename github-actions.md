# GitHub Actions

## What is GitHub Actions?

GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline.

## What is workflow?

A workflow is a configurable automated process that will run one or more jobs.

Workflows are defined by a YAML file checked in to your repository and will run when triggered by an event in your repository, or they can be triggered manually, or at a defined schedule.

Jenkins analogy: Pipeline

## What is event?

An event is a specific activity in a repository that triggers a workflow run.

For example, an activity can originate from GitHub when someone creates a pull request, opens an issue, or pushes a commit to a repository. You can also trigger a workflow to run on a schedule, by posting to a REST API, or manually.

Jenkins analogy: no built-in feature that can do the same but Jenkins pipeline can be triggered based on push commit, from another pipeline and other ways. We can achieve that with plugins

## What is job?

A job is a set of steps in a workflow that is executed on the same runner.

By default, jobs have no dependencies and run in parallel.

Jenkins analogy: Stage

## What is runner?

A runner is a server that runs your workflows when they're triggered.

Each runner can run a single job at a time. Each workflow run executes in a fresh, newly-provisioned virtual machine.
You can use either GitHub-hosted or self-hosted runners.
Each job will run inside its own virtual machine runner, or inside a container.

Jenkins analogy: Node/Executor

## What is step?

Each step is either a shell script that will be executed, or an action that will be run. Steps are executed in order and are dependent on each other.

Jenkins analogy: Step

## What is action?

An action is a custom application for the GitHub Actions platform that performs a complex but frequently repeated task.

Use an action to help reduce the amount of repetitive code that you write in your workflow files. An action can pull your Git repository from GitHub, set up the correct toolchain for your build environment, or set up the authentication to your cloud provider.

Jenkins analogy: Shared Libraries

## What can trigger a workflow?

* Events that occur in your workflow's repository
* Events that occur outside of GitHub and trigger a `repository_dispatch` event on GitHub
* Scheduled times
* Manual

## What features give you more control over deployments?

* approval for a job to proceed
* restrict which branches can trigger a workflow
* limit access to secrets
* use concurrency to limit your CD pipeline to a maximum of one in-progress deployment
* use OpenID Connect to access cloud resources
