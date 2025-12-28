# DevOps

## Questions

### What is DevOps?

DevOps stands for Development Operations
DevOps is a set of practices, tools and philosophies used to improve communication and collaboration across different teams when delivering software

The goal of DevOps is to integrate automation and monitoring at all stages of the software development lifecycle. This improves the speed at which new systems and applications can be delivered.

### What are the main types of DevOps tools?

Version control tools - Git
Continuous integration tools - Jenkins, GitHub Actions, GitLab CI/CD, TeamCity, Circle CI, Bamboo
Configuration management tools - Terraform, Ansible

### What is the fault-tolerance in DevOps?

Fault tolerance refers to the ability of a system (computer, network, cloud cluster, etc.) to continue operating without interruption when one or more of its components fail.

the concept is to keep the system usable and, most importantly, at a reasonable level in operational mode.

### What is the high availability in DevOps?

High availability (HA) is the ability of a system or service to remain operational and accessible despite failures, errors, or disruptions.

### What is disaster recovery?

IT disaster recovery is the process of maintaining or reestablishing vital infrastructure and systems following a natural or human disaster.

### What is the difference between fault tolerance and high availability?

The difference between fault tolerance and high availability, is this: A fault tolerant environment has no service interruption but a significantly higher cost, while a highly available environment has a minimal service interruption.

A twin-engine airplane is a fault tolerant system – if one engine fails, the other one kicks in, allowing the plane to continue flying. Conversely, a car with a spare tire is highly available. A flat tire will cause the car to stop, but downtime is minimal because the tire can be easily replaced.

### What is failover?

Failover is the ability to switch automatically and seamlessly to a reliable backup system.

### What deployment strategies do yo know?

* rolling-update - Version B is slowly rolled out and replacing version A.
* Blue/Green - Version B is released alongside version A, then the traffic is switched to version B.
* canary - Version B is released to a subset of users, then proceed to a full rollout.
* A/B testing - Version B is released to a subset of users under specific condition.

### Why container are so popular compared to Virtual machines?

[https://kubernetes.io/docs/concepts/overview/#going-back-in-time]

* Agile application creation and deployment
* Continuous development, integration, and deployment
* Dev and Ops separation of concerns
* Observability
* Environmental consistency across development, testing, and production
* Cloud and OS distribution portability
* Application-centric management
* Loosely coupled, distributed, elastic, liberated micro-services
* Resource isolation
* Resource utilization

### What is IaaS

Infrastructure as a Service

Is a cloud computing model that provides on-demand access to computing resources such as servers, storage, networking, and virtualization.

### What is PaaS?

Platform as a Service

In the PaaS model, you are only responsible for managing data and the application resources, while the third-party cloud provider maintains servers, networks, storage, databases, and operating system software.

### What is SaaS?

Software as a Service

a way of licensing the use of software to others while keeping that software essentially hosted and managed.

Examples:

* Gmail for Business
* Office 365 Outlook

### IPv6

IPv6 addresses are really just 128-bit binary numbers.

IPv6 addresses are usually written out as eight groups of 16 bits each.
Each one of these groups is further made up of four hexadecimal numbers.

For example, 2001:0000:130F:0000:0000:09C0:876A:130B

Pv6 address that begins with 2001:0db8 has been reserved for documentation and education

FF00:: is used for multi-cast
FE80:: are used for link-local unicast.

The first 64 bits of any IPv6 address is the network ID, and the second 64 bits of any IPv6 address is the host ID.
