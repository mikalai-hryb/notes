# AWS CloudFront

It's CDN (Content Delivery Network).
It improves read performance by caching the content of a website at different edge locations
Improves users experience
has more than 600 Points of Presence (edge locations)
DDoS protection (because worldwide), integration with Shield, AWS Web Application Firewall
CloudFront can be used as a way to send data into an S3 bucket

## What is Distribution?

You create a CloudFront distribution to tell CloudFront where you want content to be delivered from, and the details about how to track and manage content delivery.

## What is Origin?

An origin is the location where content is stored, and from which CloudFront gets content to serve to viewers.

## What types of Origins does CloudFront have?

* S3OriginConfig
  * S3 bucket but is not static website hosting
* CustomOriginConfig (you can have Cloudfront in front of any custom origin http backend)
  * S3 bucket but with static website hosting
  * ELB (ALB must be public and allow public IP of Edge Locations, EC2 can be private)
  * AWS Elemental MediaPackage endpoint
  * AWS Elemental MediaStore container
  * Any other HTTP server, running on an Amazon EC2 instance (EC2 must be public, and allow public IP of Edge Locations) or any other kind of host

## What is OAC?

Origin Access Control (it enhances security)

## What is the difference between CloudFront and S3 Cross Region Replication?

CloudFront

* uses global Edge Network (600+ points of presence)
* files are cached for a TTL (maybe a day)
* great for static content that must be available everywhere

S3 Cross Region Replication

* must be setup for each region you want replication to happen
* files are updated in near real-time
* read only
* great for dynamic content that needs to be available at low-latency in few regions

## How can you restrict access to the content?

Allowlist
specify a list of approved countries

Blocklist
specify a list of banned countries

The "country" is determined using 3rd party Geo-IP database

## What is a use case for Geo Restriction?

copyright laws to control access to content

## What are Price Classes?

You can reduce the number of edge locations for cost reduction

Price Class All - all regions, best performance
Price Class 200 - most regions, but excluded the most expensive regions
Price Class 100 - only the least expensive regions

## What is CloudFront invalidation?

This is when you can force an entire or partial cache refresh (thus bypassing the TTL) by performing a CloudFront Invalidation
you can invalidate all files (`*`) or a specific path (`/images/*`)
