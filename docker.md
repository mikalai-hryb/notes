# Docker

## Useful links

* [https://docs.docker.com/]
* [https://www.youtube.com/watch?v=t779DVjCKCs]

## Questions

<details>
<summary><b></b></summary>
</details>

<details>
<summary><b>What is Docker</b></summary>
Docker is an open-source software platform that enables to create, share, run, deploy, and manage containerized applications.

Docker is a containerization platform that allows to package an application with all its dependencies into one single entity as single container.

The docker daemon process running on the host which manages images and containers (also called Docker Engine)
</details>

<details>
<summary><b>What are responsibilities of Docker Client and Docker Server(Daemon)?</b></summary>

* Client
  * sending commands to Server (run, build, stop, etc)
  * communicate with Docker Server over REST API, UNIX socket, or network interface
  * provide a simplified and interactive way for users to manage containers, images, networks, and volumes

* Server (Daemon)
  * listens for API requests from the Client
  * handle the lifecycle of containers, including creation, start, stop, restart, and deletion
  * allocates system resources (CPU, memory, etc) to containers
  * handle the lifecycle of images, including pulling, building, tagging, removing
  * managing networking
  * managing storage
  * monitoring and logging

</details>

<details>
<summary><b>What are the Pros and Cons of Docker?</b></summary>

Pros of Docker:

* Portability: It enables consistent deployment across various environments.
* Resource Efficiency: Optimizing of resource usage with a shared kernel will be done effectively.
* Isolation: It provides security through isolation of process and file system.
* Automation: it supports automated builds and streamlining development workflow

Cons of Docker

* Learning Curve: Initial learning of the containerization concepts will bit new to understand.
* Additional Resources: Containers use some more resources compared to running applications directly on host.
* Security Concerns: Misconfigurations may lead to the security risks if not properly managed.
* Container Orchestration Complexity: Management of orchestration tools will be complex for larger-scale deployments.

</details>

<details>
<summary><b>What are basic Docker commands?</b></summary>

* `docker create` - create a docker container without starting it
* `docker run` -  create a docker container and run it
* `docker ps` - show running containers (specify extra options to see another other containers, for example, docker ps -a to see all containers)
* `docker exec` - execute a command in a running container, to get into a container you need to use `docker exec -it my_container sh`
* `docker start` - start one or more stopped containers
* `docker pause` - suspends all processes in the specified containers
* `docker stop` - stop one or more running containers
* `docker logs` - retrieve logs of a container
* `docker system prune` - remove all unused containers, networks, images (both dangling and unused), and optionally, volumes
* `docker inspect` - inspect the Metadata of a Docker Image
* `docker rmi $(docker images | grep 'imagename')` - remove docker images based on name
* `docker container rm $(docker ps | grep 'imagename')` - remove docker containers based on name
* `docker rm -f  $(docker ps -a -f status=running -q)` - remove running docker containers

</details>

<details>
<summary><b>What is Dockerfile?></b></summary>

  A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.
  A Dockerfile is a text file that contains a series of instructions used to define how a Docker image is built.
  It acts as a blueprint for creating Docker images
</details>

<details>
<summary><b>What is Docker Image?</b></summary>

A Docker image is a lightweight read-only template, containing executable packages that include the application with its dependencies, used to build containers
It's a process image.

A container image represents binary data that encapsulates an application and all its software dependencies.
Container images are executable software bundles that can run standalone and that make very well defined assumptions about their runtime environment.

Images can also include a registry hostname (defaults to Docker Hub) and optionally a tag (defaults to `latest`), for example
`fictional.registry.example:10443/image-name:1.32.0`

Image name with custom registry and digest
`registry.k8s.io/pause@sha256:1ff6c18fbef2045af6b9c16bf034cc421a29027b800e4f9b68ae9b1cb3e9ae07`
</details>

<details>
<summary><b>What is Docker Layer?</b></summary>

Basically, a layer, or image layer is a change on an image, or an intermediate image.

A layer represents a set of filesystem changes.
Every command you specify (FROM, RUN, COPY, etc.) in your Dockerfile causes the previous image to change, thus creating a new layer.
</details>

<details>
<summary><b>What is Docker Container?</b></summary>
Docker Container is a process created from a Docker Image.

Docker Container is build on top of Linux Container. Linux namespaces and Linux cgroups underlie containers.

A container image is a ready-to-run software package containing everything needed to run an application.
Containers are intended to be stateless and immutable.

States

* running
* paused ("status=paused")
* stopped ("status=exited")

</details>

<details>
<summary><b>What is the difference between paused and stopped containers?</b></summary>

The main difference between the paused and stopped states is that the memory portion of the state is cleared when a container is stopped, whereas, in the paused state, its memory portion stays intact.
</details>

<details>
<summary><b>What is Image Digest?</b></summary>

Image digests are a unique identifier for a specific version of an image.
Image digests consists of a hash algorithm and a hash value, for example
`sha256:1ff6c18fbef2045af6b9c16bf034cc421a29027b800e4f9b68ae9b1cb3e9ae07`
</details>

<details>
<summary><b>What is the difference between ENTRYPOINT and CMD?</b></summary>

ENTRYPOINT is the process that’s executed inside the container.
ENTRYPOINT defines the command that has to be executed when the container starts.

CMD is the default set of arguments that are supplied to the ENTRYPOINT process.

Default ENTRYPOINT is `/bin/sh -c`
</details>

<details>
<summary><b>What is Docker Volume?</b></summary>

A Docker volume is a mechanism for persisting and managing data generated by Docker containers, even after the container is stopped or deleted.

</details>

<details>
<summary><b>What is Docker Compose?</b></summary>

Docker Compose is a tool for defining and running multi-container applications

Docker Compose has support for both YAML (more commonly used) and JSON formats for defining the configuration of services.
</details>

<details>
<summary><b>What is Docker Swarm?</b></summary>

Docker swarm is a container orchestration tool.

</details>

<details>
<summary><b>What are multi-stage builds in Docker?</b></summary>

A multi-stage build in Docker involves with using multiple `FROM` instructions in a Dockerfile. Each `FROM` instruction will begin a new stage, allowing you to build and copy the artifacts from previous stages for reducing the final image size.

```Dockerfile
FROM builder as build
# Build stage

FROM alpine
# Final stage
COPY --from=build /app /app
```

</details>

<details>
<summary><b>What are Network drivers?</b></summary>

* bridge
  The default network driver. In terms of Docker, a bridge network uses a software bridge which lets containers connected to the same bridge network communicate, while providing isolation from containers that aren't connected to that bridge network.
* host
  Remove network isolation between the container and the Docker host, and use the host's networking directly.
* overlay
  Overlay networks connect multiple Docker daemons together and enable Swarm services and containers to communicate across nodes.
* ipvlan
  IPvlan networks give users total control over both IPv4 and IPv6 addressing.
* macvlan
  Macvlan networks allow you to assign a MAC address to a container, making it appear as a physical device on your network.
* none
  Completely isolate a container from the host and other containers

</details>

<details>
<summary><b>How to run Docker in Docker?</b></summary>

* DinD (Docker in Docker)
  * using privileged mode (`--privileged` flag)
  * using `docker:20-dind` image
* DooD (Docker outside of Docker)
  * mount the Docker host's socket (/var/run/docker.sock) into the container

</details>

<details>
<summary><b>How to run Docker in Docker?</b></summary>

* DinD (Docker in Docker)
  * using privileged mode (`--privileged` flag)
  * using `docker:20-dind` image
* DooD (Docker outside of Docker)
  * mount the Docker host's socket (`/var/run/docker.sock`) into the container

</details>

<details>
<summary><b>What is OCI</b></summary>

OCI - Open Container Initiative

The goal of OCI is to ensure compatibility and portability of containerized applications across different platforms and runtime environments.

</details>
