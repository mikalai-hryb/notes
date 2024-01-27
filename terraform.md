### What is Terraform?
HashiCorp Terraform is an infrastructure as code tool (IaC) that lets you define both cloud and on-prem resources in human-readable configuration files that you can version, reuse, and share.

### What is IaC?
The infrastructure as code workflow lets your declaratively manage a variety of services and automate your changes to them

### What other "infrastructure as" stules exist?
???

### What deployment strateges do you know? And describe them.
blue/green, canary, ...

### What is a provider in TF?
A provider in Terraform is a Terraform plugin that enables interaction with an API.

### How many APIs TF can work with?
HashiCorp and the Terraform community have already written thousands of providers to manage many different types of resources and services.

### What does core TF workflow look like?
write -> plan -> apply
a developer defines resources -> TF create an execution plan -> TF performes the proposed operations in the correct order

refresh - TF views real word infrastructure
plan - TF figures out what it needs to do (reconciling the configuration and infrastructure)
apply - TF build the infrastructure

### What approaches exist in terms of infrastructure mutability?
There are mutable and immutable approaches.

Mutable: Take existing infrastructure and try to upgdade in place
Immutable: Take existing infrastructure, create new infrastructure running at the new versions (on distinct machines) and destroy the existing things in place

### What approach does TF take in terms of infrastructure mutability?
TF takes an immutable approach to infrastructure reducing the complexity of upgrading or modifying your services and infrastructure.

### What is the purpose of the state file in TF?
State file acts as a source of truth for your invironment.
TF uses the state file to determine the changes to make to your infrastructure so that it will match your configuration.
The Terraform state file is the only way Terraform can track which resources it manages

### What programming style do TF configuration files use? Procedural, declarative or imperative?
Terraform configuration files are declarative, meaning that they describe the end state of your infrastructure.

### How does TF provision resources efficiently?
To provision resources efficiently TF builds a resource graph to determine the resource dependencies.

### What is a TF module?
Terraform supports reusable configuration components called modules. A module is a container for multiple resources that are used together.

### Does TF support collaboration in some way?
About collaboration. Since the configuration is written in a file, the VCS can be used for collaboration.

### What is a resource identifier?
A resource type and a resource name form a resource identifier or id separated by a peried in the format `resource_type.resource_name`.
The resource identifier must be unique within a workspace.
The resouce identifier is not the same as resource id attribute.

### What is a resource argument?
Arguments configure a particular resource; because of this, many arguments are resource-specific. Arguments can be required or optional, as specified by the provider.

### What is a resource attribute?
Attributes are values exposed by an existing resource. References to resource attributes take the format `resource_type.resource_name.attribute_name`. Unlike arguments which specify an infrastructure object's configuration, a resource's attributes are often assigned to it by the underlying cloud provider or API.

### What is a resource meta-argument?
Meta-arguments are a function of Terraform itself and are not resource or provider-specific.
Meta-arguments change a resource's behavior, such as using a count meta-argument to create multiple resources.

### What is a resource block?
`resource "type" "name" {}` is all this together called resource block

### What is a resource block body?
The content between {} is called resourbe block body or block body

### What are TF input variables?
Input variables make your Terraform configuration more flexible by defining values that your end users can assign to customize the configuration.
Terraform's input variables don't change values during a Terraform run.

### Where TFC runs TF?
Terraform Cloud runs Terraform on disposable virtual machines in its own cloud infrastructure by default.

### What are collection types?
* list
* map
* set

### What are structural types?
* tuple: A fixed-length sequence of values of specified types.
* object: A lookup table, matching a fixed set of keys to values of specified types.
