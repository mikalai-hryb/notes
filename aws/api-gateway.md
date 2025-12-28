# API Gateway

It's a serverless offering from AWS which allows us to create REST APIs
API Gateway proxy requests to Lambda Functions

## What are features of API Gateway?

Lambda + API Gateway  = no infrastructure to manage
Support for the WebSocket Protocol (stateful API)
Support for HTTP and REST APIs (stateless)
It handles API versioning (v1, v2 ...)
Handle different environments (dev, test, prod, ...)
Handle security (Authentication and Authorization)
Create API keys, handle request throttling (in case some clients are making too many requests)
Swagger / OpenAPI import to quickly define APIs
Transform and validate requests and responses
generate SDK and API specifications
Cache API responses

## What is the API Gateway integrate with?

* Lambda Function
  * invoke Lambda Function
  * easy way to expose REST API backed by AWS Lambda
* HTTP
  * expose HTTP endpoints in the backend
  * ex: internal HTTP API on premise, ALB
  * why? add rate limiting, caching, user authentication, API keys, etc
* AWS Service
  * expose any AWS API through the API Gateway

## What are Endpoint Types?

* Edge-Optimized (default): for global clients
  * requests are routed through the CloudFront Edge Locations (improves latency)
  * the api gateway still lives in only one region
* Regional
  * for clients within the same region
  * could manually combine with CloudFront (more control over the caching strategies and the distribution )
* Private (not public)
  * can only be accessed from your VPC using an interface VPC endpoint (ENI)
  * use a resource policy to define access

## How can you identify users on API Gateway?

* User Authentication through
  * IAM roles (useful for internal applications)
  * Cognito (identify for external users - example mobile users)
  * Custom Authorizer (your own logic) - Lambda Function
* Custom Domain Name HTTPS security through integration with AWS Certificate Manager (ACM)
  * if using Edge-Optimized endpoint, then the certificate must be in us-est-1
  * if using Regional endpoint, the certificate must be in the API Gateway region
  * must setup CNAMEor A-alias record in Route 53

## What is integration request and integration response?

## What are HTTP verbs?
## What is a resource path?

## What is API Gateway route?

Routes direct incoming API requests to backend resources. Routes consist of two parts: an HTTP method and a resource path—for example, `GET /pets`.

## What is identity source in authorizer?
