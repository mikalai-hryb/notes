# Service Discovery

## Links

* https://edgedelta.com/company/blog/what-is-service-discovery
* https://systemdesign.one/what-is-service-discovery/

## What is Service Discovery?

Service discovery is a technology that enables services within a microservices architecture to discover and talk to each other.

It serves as a registry that tracks all the service instances and facilitates communication between services.

Service discovery is the automatic detection and identification of available computing resources and services within a network. Service discovery simplifies the management of dynamic environments by allowing services to locate and connect dynamically, regardless of changes in network topology or underlying infrastructure.

There are two main implementations of service discovery — client-side and server-side.

## Client-side service discovery

The client service is responsible for locating where service instances are available on the network. It distributes load among service instances that are online. In this case, every client will have to possess its service registry, which it will query while in pursuit of discovering services.

## Server-side service discovery

Server-side discovery offloads the responsibility for service instance discovery. This process means that the registry doesn’t need to find instances. The service discovery abstracts the location away from the client and allows them to communicate with a known load balancer.

## Service Registry

The service registry is one of service discovery's most essential building blocks. It contains every available instance's location, so it must be modified and adequately maintained.

## What’s the Difference Between DNS and Service Discovery?

The primary difference between service discovery and DNS is that service discovery handles a dynamic number of service instances while DNS handles only a static number of service instances.

The quick answer is service discovery (SD) is for internal use, so one of your internal applications can find another within your system.

DNS is for external use, so someone on the other side of your load balancer can talk to your application.
