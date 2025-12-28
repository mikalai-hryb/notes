# ELB - Elastic Load Balancing

## What is Load Balancer?

Load Balancer a server (or set of servers) that forward traffic to multiple servers (e.g., EC2 instances) downstream

## Why do we use Load Balancer?

* Spread load across multiple downstream instances
* Expose a single point of access (DNS) to your application
* Seamlessly handle failures of downstream instances
* Do regular health checks to your instances
* Provide SSL Termination (HTTPS) for your websites
* Enforce stickiness with cookies
* High availability across zones
* Separate public traffic from private

## What is SSL Termination?

SSL termination (or TLS termination) is the process of decrypting SSL/TLS-encrypted traffic at a specific point, such as a load balancer, reverse proxy, or other dedicated device, before passing the unencrypted traffic to backend servers.

* Improved Performance: Offloads the computational overhead of SSL/TLS encryption and decryption from backend servers
* Centralized Certificate Management: Simplifies managing SSL/TLS certificates by centralizing them at the termination point
* Compatibility: Helps in cases where backend applications or services may not natively support SSL/TLS

## What are the pros of ELB compared to other LB solutions?

* AWS guarantees that it will be working
* AWS takes care of upgrades, maintenance, high availability
* AWS provides only a few configuration knobs to tweak the behaviour
* It's integrated with many AWS offerings/services
  * EC2, EC2 AutoScaling Groups, ECS
  * ACM, CloudWatch
  * Route 53, WAF, Global Accelerator

## What are Health Checks?

HealthChecks is a way for your ELB to verify whether or not an EC2 instance(target) is properly working
Whether instances are available to reply to requests.

The Health Check is done on a `protocol`, `port` and a `route` (/health is common)
If the response is not 200 (OK), then the instance is unhealthy

## What are types of load balancers on AWS?

* Classic Load Balancer (v1, old version, from 2009) - CLB
  * HTTP, HTTPS, TCP, SSL (secure TCP)
* Application Load Balancer (v2, new generation, from 2016) - ALB
  * HTTP, HTTPS, WebSocket
  * static DNS name but it does NOT provide a static IP
* Network Load Balancer (v2, new generation, from 2017) - NLB
  * TCP, TLS (secure TCP), UDP
  * both static DNS name and static IP
* Gateway Load Balancer (from 2020) - GWLB
  * operates at layer 3 (Network layer) - IP Protocol

Some load balancers can be setup as internal (private) or external (public) ELBs

## How security groups look for Load Balancer?

Load Balancer security groups most likely allow traffic from 80, 443 ports for all IP addresses (0.0.0.0/0)
Application security group most likely allow traffic only from the 80 port of LB (in the Source you need to specify a SG of LB)

## What is Listener?

A Listener is a process that checks for connection requests using the port and protocol you configure.

## What are Listener Rules?

The rules determine how the load balancer routes requests to its registered targets.

## What are Target Groups?

A Target Group is essentially a collection of targets that are organized for routing traffic as defined by a load balancer.

## What is ALB (v2)?

* It works at Layer 7 (HTTP).
* It allows you to route traffic to multiple HTTP applications across machines (machines are grouped into Target Groups)
* allows Load balancing to multiple applications on the same machine (ex: containers)
* supports for  HTTP/2 and WebSocket
* supports redirects (from HTTP to HTTPS for example)
* support root routing
  * routing based on path in URL (example.com/users & example.com/posts)
  * routing based on hostname in URL (one.example.com & other.example.com)
  * routing based on Query String, Headers (example.com/users?id=123&order=false)
* ALB are great fit for micro services & container-based application (example: Docker & Amazon ECS)
* Has a port mapping feature to redirect to a dynamic port in ECS
* In Comparison, we need one CLB for an application, with ALB we can use it for many applications

* You get a fixed hostname (XXX.region.elb.amazonaws.com)
* Application servers don't see the IP of the client directly
  * the true IP of the client is inserted in the header `X-Forwarded-For`
  * the true Port is in the header `X-Forwarded-Port`
  * the true Protocol is in the header `X-Forwarded-Proto`

## How target groups look for ALB?

Targets:

* EC2 instances (can be managed by Auto Scaling Group) - HTTP
* ECS tasks (managed by ECS itself) - HTTP
* Lambda Functions - HTTP request is translated into a JSON event
* private IP Addresses - must be private IPs

ALB can route to multiple target groups.
Health Checks are at the Target Group Level.

## What conditions are Listener Rules based on in ALB?

* Host Header (HOST: *.example.com)
* Path
* HTTP Request method (GET, POST, HEAD, PUT, DELETE, OPTIONS, ...)
* Source IP

* HTTP Headers (Authorization, User-Agent, X-Forwarded-For, ...)
* Query Strings

## What are action Types for Listener Rules in ALB?

* Forward to target groups
* Redirect to URL
* Return fixed response

## What is NLB (v2)?

* it's really high performance
* It works at Layer 4
  * forward TCP & UDP traffic to your instances
  * handles millions of requests per second
  * ultra-low latency
* NLB has one static IP for AZ, and supporting Elastic IP (helpful for whitelisting specific IP)
* NLB are used for extreme performance, TCP or UDP traffic
* not included in AWS Free Tier

## How target groups look for NLB?

Targets:

* EC2 instances
* private IP Addresses - must be private IPs and must be hardcoded
* Application Load Balancer
  * Thanks NLB you, for example, get the fixed IP addresses, and then, thanks to ALB you get all the rules regarding HTTP traffic

Health Checks support TCP, HTTP and HTTPS Protocols

## What is GWLB?

* deploy, scale and manage a fleet of 3rd party network virtual appliances in AWS
* Examples:
  * Firewalls
  * Intrusion Detection and Prevention Systems
  * Deep Packet Inspection Systems
  * Payload manipulation
  * etc
* Operates at Layer 3 (Network Layer) - IP Packets
* Combines the following functions
  * Transparent Network Gateway - single entry/exit for all traffic
  * Load Balancer - distributes traffic to your virtual appliances
* Uses GENEVE protocol on port 6081

## How target groups look for GWLB?

Targets:

* EC2 instances
* IP Addresses - must be private IPs

## What are Sticky Sessions?

Stickiness means that the same client is always redirected to the same instance behind a load balancer.

* They also called Session Affinity.
* This works for CLB, ALB, NLB
* There is a cookie used for stickiness. It has an expiration data you control
* Use case is to make sure the user does not lose his session data (the login of the user for example)
* Enabling Stickiness may bring imbalance to the load over the backend EC2 instances
* It's a feature of Target Groups

## What are types of Cookie Names?

* Application-based Cookies
  * Custom cookie
    * generated by the target (by your application itself)
    * can include any custom attributes required by the application
    * cookie name must be specified individually for each target group
    * don't use `AWSALB`, `AWSALBAPP`, `AWSALBTG` (reserved by the ELB)
  * Application cookie
    * Generated by the load balancer
    * Cookie name is `AWSALBAPP`
* Duration-based Cookies
  * Cookie generated by the load balancer
  * Cookie name is `AWSALB` for ALB, `AWSELB` for CLB

## What is Cross Zone Load Balancing?

It's a feature of ELB that helps evenly distribute incoming traffic across all registered instances in all AZ.
This feature provides better utilization of resources and ensures consistent application performance.

* ALB
  * enabled by default (can be disabled at the Target Group Level, at LB level this option is on and cannot be disabled)
  * No charges for inter/cross AZ data
* NLB
  * disabled by default
  * you pay charges for cross AZ data if enabled
* GWLB
  * disabled by default
  * no charges for cross AZ data if enabled

## df

An SSL Certificate allows traffic between your client and your load balancer to be encrypted in transit (in-flight encryption)
SSL refers to Secure Socket Layer, used to encrypt connections.
TLS refers to Transport Layer Security, which is newer version.
Nowadays, TLS certificates are mainly used, but people still refer as SSL.

Public TLS certificates are issued by Certificate Authorities (CA)
Comodo, Symantec, GoDaddy, GlobalSign, Digicert, etc
TLS certificates have an expiration date (you set) and must be renewed
In cryptography, X.509 is an International Telecommunication Union (ITU) standard defining the format of public key certificates.
X.509 certificates are used in many Internet protocols, including TLS/SSL, which is the basis for HTTPS, the secure protocol for browsing the web.
The load balancer uses an X.509 certificate (TLS server certificate)
You can manage certificates using ACM (Amazon Certificate Manager)
You can create and upload your own certificate (self-signed) alternatively
HTTPS Listener:

* you must specify a default certificate
* you can add an optional list of certificates to support multiple domains
* clients can use SNI (Server Name Indication) to specify the hostname they reach
* ability to specify a security policy to support older versions of SSL/TLS (legacy clients)

## What is SNI?

Server Name Indication - SNI.

SNI solves the problem of loading multiple SSL certificates onto one web server (to serve multiple websites)
It's a "newer" protocol, and requires the client to indicate the hostname of the target server in the initial TLS handshake.
The server will then find the correct certificate, or return the default one.

It only works for ALB, NLB and CloudFront.

## What is Deregistration Delay/Connection Draining?

Deregistration Delay term is for ALB & NLB.
Connection Draining term is for CLB.

Time to complete "in-flight requests" while the instance is de-registering or unhealthy.
Stops sending new requests to the EC2 instance which is de-registering.

Amount time for Elastic Load Balancing to wait before changing the state of a de-registering target from draining to unused.

## What balancing algorithms does ELB support?

Balancing algorithms are part of Target Groups.
Routing algorithm configures for the target group.

* ALB
  * Round robin
    * A client request is forwarded to each server in turn.
    * Routes requests evenly across healthy targets in the target group, in a sequential order.
  * Least Outstanding Requests
    * routes requests to the targets with the lowest number of in progress requests
  * Weighted Random
    * The weighted random routing algorithm routes requests evenly across healthy targets in the target group, in a random order.
* NLB
  * [Flow Hash Algorithm](https://www.linkedin.com/pulse/hash-flow-algorithm-aws-network-load-balancer-nlb-in-depth-mishra/)
* CLB
  * Round Robin routing algorithm for TCP listeners
  * Least Outstanding Requests routing algorithm for HTTP and HTTPS listeners
