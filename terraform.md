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
Terraform providers manage resources by communicating between Terraform and target APIs.

### How to manage provider versions in TF?

There are 2 options

* Specify provider version constraints in the configuration's `terraform.required_providers` block
* Use dependency lock file (`.terraform.lock.hcl`)

### How does TF select a provider version to download?

If there is a lock file then TF will donwload the provider versions specifed in the lock file.

If Terraform does not find a lock file, it will download the latest versions of the providers that fulfill the version constraints defined in the `required_providers` block. If there is no the `required_providers` block TF will download the latest version.

### What is the dependency lock file and what is this file for?

Dependency lock file or `.terraform.lock.hcl` has pinned provider versions and instructs Terraform to always install the same provider version, ensuring that consistent runs across your team or remote sessions.

### How to upgrade a provider version?

1. run `terraform init -upgrade`
2. run `terraform apply` to make sure there are no side effects
3. fix side effects if needed
4. commit changes to configuration and the dependency lock file

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
Terraform loads variables in the following order, with later sources taking precedence over earlier ones:

* omit providing the value if variable is `optional`
* provide a variable value when you will be asked during a TF run if variable is `required`

* `TF_VAR_<variable_name>=<variable_value>` environment variable
* variables in `terraform.tfvars`
* variables in `terraform.tfvars.json`
* `<variable_name>=<variable_value>` in `*.auto.tfvars` or `*.auto.tfvars.json` files (lexical order )
* `-var <variable_name>=<variable_value>` or `-var-file` options on command line

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

### what is the `count` argument for?

The `count` argument replicates the given resource or module a specific number of times with an incrementing counter.
To use it within the block body you need `count.index` - starting with zero.

### what is the `for_each` argument for?

Terraform's for_each meta-argument allows you to configure a set of similar resources by iterating over a data structure to configure a resource or module for each item in the data structure.

### How to define a function in TF?

HCL does not provide a posibility to define a function because it's a configuration language but not a programming language. However, you can use several built-in functions to perform operations dynamically.

### What is the `templatefile` function for?

Terraform will interpolate these values using the `templatefile` function.

### What does the syntax of a conditional expression look like?

The syntax of a conditional expression first defines the condition, then the outcomes for true and false evaluations.
`var.enable_ha ? 3 : 1`

### What is the splat expression?

The splat expression captures all objects in a list that share an attribute.
`aws_instance.ubuntu[*].id` --> this will produce a list of ids.

### What potintial errors you can face when you are working with TF?

There are four potential types of issues that you can face

1. Language errors: When Terraform encounters a syntax error in your configuration, it prints out the line numbers and an explanation of the error.
2. State errors: If state is out of sync, Terraform may destroy or change your existing resources.
3. Core errors: Errors produced at this level may be a bug in TF.
4. Provider errors: Errors produced at this level may be a bug in a Proveder.

### How to reduce the number of simple errors?

* `terraform fmt` only parses your HCL for interpolation errors or malformed resource definitions
* `terraform validate` checks the configuration in the context of the providers' expectations.

### What is a cycle error?

For example, when resources reference one another in their attributes.

### Write a spat expressing to get a list of "a" keys

```hcl
locals {
  this_variable = {
    key_1 = {
      a = 1
      b = 2
    }
    key_2 = {
      a = 3
      b = 4
    }
  }
}
```

It's not possible. The splat expression patterns (`[*]`) apply only to lists, sets, and tuples.
To get a similar result with maps/objects you must use `for` expression.

### Does TF allow to generate logs separatelly?

Terraform 0.15+ allows you to generate logs from the Terraform provider and the core application separately.

`terraform version` - to confirm your provider and Terraform versions
`export TF_LOG_CORE=TRACE` - to enable core logging
`export TF_LOG_PROVIDER=TRACE` -to generate provider logs
`export TF_LOG_PATH=logs.txt` - to create the specified file and append logs generated by Terraform
`terraform refresh` - can be used to generate an example

### What version format does HashiCorp use for TF versions?

HashiCorp uses the format `major.minor.patch` for Terraform versions.

### What is the `version` key in the state file?

Terraform will only update the state file `version` when a new version of Terraform requires a change to the state file's format.

### What is the `terraform_version` key in the state file?

Terraform will update the terraform_version whenever you apply a change to your configuration using a newer Terraform version.

### What best practises you know/want to follow?

* Using Terraform in production, the team should have plans and procedures in place to determine how they will manage Terraform versions and handle upgrades.
* using objects in modules to group related attributes together

### How to move resources between modules in TF?

The `moved` configuration block lets you track your resource moves in the configuration itself.

### What happens when you move resources?

When you move existing resources from a parent to a child module, your Terraform resource IDs will change.

### What can be validated with custom conditions?

Terraform lets you define custom conditions in your module configuration to validate resources, data sources, and outputs.

Terraform supports preconditions, which it evaluates before it provisions the enclosing block (plan step), and postconditions, which it evaluates afterward.

* `variable.<name>.validation`
* `data.<type>.<name>.lifecycle.precondition`
* `data.<type>.<name>.lifecycle.postcondition`
* `resource.<type>.<name>.lifecycle.precondition`
* `resource.<type>.<name>.lifecycle.postcondition`
* `output.<name>.precondition`

### HOw to make it easier for users to understand how to use a module which contains many resources?

Using objects in your modules lets you group related attributes together, making it easier for users to understand how to use your module. You can make attributes within objects optional, which make it easier for you to ship new module versions without changing the variables that module users need to define.

### What are the `check` blocks?

Terraform checks let you define assertions to validate as part of your infrastructure management workflow.

Checks let you take advantage of Terraform's abstraction of the differences between different provider APIs.

Unlike variable validation or custom conditions, check blocks are decoupled from the lifecycle of a specific resource or data source.

Unlike custom conditions or variable validation errors, failed checks do not block applies.

### How to make the check block more flexible?

You can reference data sources in `check` block assertions.
Terraform queries the data source when it evaluates your configuration's checks, at the end of each Terraform operation.
