# Terraform

<https://developer.hashicorp.com/terraform/docs>

## Docs

### What is Terraform?

HashiCorp Terraform is an infrastructure as code tool (IaC) that lets you define both cloud and on-prem resources in human-readable configuration files that you can version, reuse, and share.

### What is IaC?

The infrastructure as code workflow lets your declaratively manage a variety of services and automate your changes to them

### What other "infrastructure as" stules exist?

???

### What deployment strateges do you know? And describe them

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

### What is a resource block?

`resource "type" "name" {}` is all this together called resource block.

### What is a resource block body?

The content between {} is called resourbe block body or block body.

### What is a resource identifier?

A resource type and a resource name form a resource identifier(ID) separated by a peried in the format `resource_type.resource_name`.
The resource identifier must be unique within a workspace.
The resouce identifier is not the same as resource id attribute.

### What types of properties does a resource have?

* arguments
* attributes
* meta-arguments

### What is a resource argument?

Arguments configure a particular resource; because of this, many arguments are resource-specific. Arguments can be `required` or `optional`, as specified by the provider.

### What is a resource attribute?

Attributes are values exposed by an existing resource. References to resource attributes take the format `resource_type.resource_name.attribute_name`. Unlike arguments which specify an infrastructure object's configuration, a resource's attributes are often assigned to it by the underlying cloud provider or API.

### What is a resource meta-argument?

Meta-arguments are a function of Terraform itself and are not resource or provider-specific.
Meta-arguments change a resource's behavior, such as using a `count` meta-argument to create multiple resources.

### What are TF input variables?

Input variables make your Terraform configuration more flexible by defining values that your end users can assign to customize the configuration.
Unlike variables found in programming languages, Terraform's input variables don't change values during a Terraform run such as plan, apply, or destroy.

### What arguments can an input variable have?

* description: A short description to document the purpose of the variable.
* type: The type of data contained in the variable.
* default: The default value.
* validation blocks
* sensitive

### If an input variable does not have the `default` argument what does it mean?

### And what options do you have to provide the value of an input variable?

It means the variable is required.
You have a few options to pass the value of an input variable to TF

* omit providing the value if variable is `optional`
* provide a variable value when you will be asked during a TF run if variable is `required`
* `-var <variable_name>=<variable_value>` command line flag
* `TF_VAR_<variable_name>=<variable_value>` environment variable
* `<variable_name>=<variable_value>` in *.tfvars file

### What happen when you reference a sensitive variable in outputs?

TF will raise an error about exposing the value.
You will need to mark the output variable sensitive as well to get rid of the error.
Keep in mind, that TF stores the state as plain text.
Marking variables as sensitive is not sufficient to secure them.
You must also keep them secure while passing them into Terraform configuration, and protect them in your state file.

### What files does TF load automatically?

Terraform automatically loads all files in the current directory with the exact name `terraform.tfvars` or matching `*.auto.tfvars`. You can also use the `-var-file` flag to specify other files by name.

### What could be the value of the input variable?

Variable values must be literal values, and cannot use computed values like resource attributes, expressions, or other variables.

### What varialbe types does TF support?

* string
* number
* bool
* map
* list
* set
* object
* tuple
* any

### Does TF do variable conversion?

Yes, it will convert input variable values into the correct type if possible.
For example, "2" -> 2, if `type = number`.
But it's better to use appropriate types.

### How you can refer to an input variable in your configuration?

To refer to an input variable you need to use the following syntax `var.variable_name`

### Where TFC runs TF?

Terraform Cloud runs Terraform on disposable virtual machines in its own cloud infrastructure by default.

### What are simple (single-values) types?

* number
* string
* bool

### What are collection types?

* list: A sequence of values of the same type.
* map: A lookup table, matching keys to values, all of the same type.
* set: An unordered collection of unique values, all of the same type.

### What are structural types?

* tuple: A fixed-length sequence of values of specified types.
* object: A lookup table, matching a fixed set of keys to values of specified types.

### What are complex types?

???

### What is string interpolation?

String interpolation is the inserting the output of an expression into a string.

### Can a provider make an argument sensitive?

Yes, for instance, AWS provider marks `aws_db_instance.this.password` as `sensitive value`.
When an argument is marked as `sensitive` by a developer it will be marked `sensitive` in the plan.

### What are benifits of using locals?

* simplification TF configuration since you can reference the local multiple times (reduce repetition in the configuration)
* writing more readable configuration by using meaningful names rather than hard-coding values

### What data can be used in locals?

* literals
* input variables
* other local variables
* dynamic expressions
* functions
* resource attributes

??? Respond to the confirmation prompt with yes.

### What are outputs?

TF outputs let you export structured data about your resources.
This data can be used in configurations of other parts of your infrastructure.
Outputs are also about exposing data from a child module to a root module.

### How to query an individual output?

`terraform output <output_name>` --> if it's a string it will be covered with `""`
`terraform output -raw <output_name>` --> no covering

### In which cases TF does not redact sensitive outputs?

* quering a specific output by name
* quering all of your outputs in JSON format
* using outputs from a child module in your root module
* storing outputs in state file

### What are data sources?

Terraform data sources let you dynamically fetch data from APIs or other Terraform state backends.

### What pattern is used to reference data source attributes?

The pattern is `data.<type>.<name>.<attribute>`

### How to share data between TFC workspaces?

* you can use outputs of `terraform_remote_state` data source
* you can use outputs of `tfe_outputs` data source

### What types of dependencies can be between resources?

* implicit dependency (attribute usage in other resources)
* explicit dependency (`depends_on` argument)

### How TF understands dependencies between resources?

Terraform infers dependencies between resources based on the configuration given (studying the resouorce attributes), so that resources are created and destroyed in the correct order.
There are cases when TF cannot infer dependencies between different parts of your resources. And you will need to create an explicit dependency with the help of `depends_on` argument.
