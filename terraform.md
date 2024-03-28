# Terraform

<https://developer.hashicorp.com/terraform/docs>

## Benefits of using up to date Terraform versions

* TFC
  * remote state management
  * private registry
  * remote execution
  * structured plan output
  * workspace resource summuries
* validation
  * variables validation
  * precondition and postcondition for resources and data sources
  * checks (assertions)
* built-in testing mechanism
* handy refactoring workflow with the help of `import`, `moved` and `removed` blocks
* plugins and TF version constraints in `terraform` block
* better handling sensitive information
* provider functions

## Docs

### What is Terraform?

HashiCorp Terraform is an infrastructure as code tool (IaC) that lets you define both cloud and on-prem resources in human-readable configuration files that you can version, reuse, and share.

### What is the main purpose of the Terraform language?

The main purpose of the Terraform language is declaring resources, which represent infrastructure objects. All other language features exist only to make the definition of resources more flexible and convenient.

### What is the difference between TF language and HCL?

Terraform's configuration language is based on a more general language called HCL.

### What is Terraform configuration?

A Terraform configuration is a complete document in the Terraform language that tells Terraform how to manage a given collection of infrastructure. A configuration can consist of multiple files and directories.

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

### When we say TF apply, what exactly do we mean?

Applying a Terraform configuration is the process of creating, updating, and destroying real infrastructure objects in order to make their settings match the configuration.

### What approaches exist in terms of infrastructure mutability?

There are mutable and immutable approaches.

Mutable: Take existing infrastructure and try to upgdade in place
Immutable: Take existing infrastructure, create new infrastructure running at the new versions (on distinct machines) and destroy the existing things in place

### What approach does TF take in terms of infrastructure mutability?

TF takes an immutable approach to infrastructure reducing the complexity of upgrading or modifying your services and infrastructure.

### What is the purpose of the state file in TF?

The primary purpose of Terraform state is to store bindings between objects in a remote system and resource instances declared in your configuration.

State file acts as a source of truth for your invironment.
TF uses the state file to determine the changes to make to your infrastructure so that it will match your configuration.
The Terraform state file is the only way Terraform can track which resources it manages.

### What is `lineage` in a state file?

The "lineage" is a unique ID assigned to a state when it is created.

### What is `serial` in a state file?

Terraform uses the `serial` to keep track of the changes made in each new state file and uses it to make sure your operations run against the correct known state file

### What programming style do TF configuration files use? Procedural, declarative or imperative?

Terraform configuration files are declarative, meaning that they describe the end state of your infrastructure.

### How does TF provision resources efficiently?

To provision resources efficiently TF builds a resource graph to determine the resource dependencies.

### What is a TF module?

Terraform supports reusable configuration components called modules. A module is a container for multiple resources that are used together.

Terraform modules are self-contained pieces of infrastructure-as-code that abstract the underlying complexity of infrastructure deployments.

A module is a collection of `.tf` and/or `.tf.json` files kept together in a directory.

### Does TF support collaboration in some way?

About collaboration. Since the configuration is written in a file, the VCS can be used for collaboration.

### What is a block in TF?

A block is a container for other content.
A block has a type. Each block type defines how many labels must follow the type keyword.
The `network_interface` nested block has no labels.

Most of Terraform's features (including resources, input variables, output values, data sources, etc.) are implemented as top-level blocks.

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

It means the variable is required.

### In which order TF load variables?

* `TF_VAR_*` defined in cloud
* `TF_VAR_*` defined locally
* `terraform.tfvars`
* `terraform.tfvars.json`
* `*.auto.tfvars` or `*.auto.tfvars.json` files, processed in lexical order of their filenames
* workspace terraform variale (HCL or not)
* `-var '<variable-name>="<value>"` or
  `-var-file *.tfvars` or
  `-var-file *.tfvars.json`
  The last definded option takes precedence
* variables in `variables` block within test files
* variables in `variables` block within `run` block in test files

If no mechanism of the above is used TF will ask for the value of a required variable or the default value of an optional variable will be used.

### What happen when you reference a sensitive variable in outputs?

TF will raise an error about exposing the value.
You will need to mark the output variable sensitive as well to get rid of the error.
Keep in mind, that TF stores the state as plain text.
Marking variables as sensitive is not sufficient to secure them.
You must also keep them secure while passing them into Terraform configuration, and protect them in your state file.

### In which cases TF does not redact sensitive variables?

* query a specific output by name (`terraform output <my_variable>`)
* query all of your outputs in JSON format (`terraform output -json`)
* use outputs from a child module in your root module
* Terraform stores all output values as plain text in a state file, including sensitive variables

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

Simpe variables are variables that contain single value.

* number
* string
* bool

### What are collection types?

Collection variables contain more than one value.

* list(...): A sequence of values of the same type.
The keyword list is a shorthand for list(any).
* map(...): A lookup table, matching keys to values, all of the same type.
The keyword map is a shorthand for map(any).
* set(...): An unordered collection of unique values, all of the same type.
It does not have any secondary identifier.

### What are structural types?

Structural types have a fixed number of values that can be of different types.

* tuple(...): A fixed-length sequence of values of specified types.
* object(...): A lookup table, matching a fixed set of keys to values of specified types.

Sructural types require a schema as an argument, to specify which types are allowed for which elements.

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

The data sources are a special type of resource used only for looking up information.

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
`export TF_LOG=TRACE` - to enable all logs
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

### What can be validated with custom conditions and checks?

Terraform lets you define custom conditions and checks in your module configuration to validate resources, data sources, and outputs.

Terraform supports preconditions, which it evaluates before it provisions the enclosing block (plan step), and postconditions, which it evaluates afterward.

* `variable.<name>.validation`
* `data.<type>.<name>.lifecycle.precondition`
* `data.<type>.<name>.lifecycle.postcondition`
* `resource.<type>.<name>.lifecycle.precondition`
* `resource.<type>.<name>.lifecycle.postcondition`
* `output.<name>.precondition`
* `check.<name>.assert`

### What is the difference between `postcondition` and `check` blocks?

They can be used interchangeably. The difference in how they process failures.

If a `postcondition` block fails, it blocks Terraform from executing the current operation.

If a `check` block fails, it does not block Terraform from executing an operation. It gives a warning.

### How to make it easier for users to understand how to use a module which contains many resources?

Using objects in your modules lets you group related attributes together, making it easier for users to understand how to use your module. You can make attributes within objects optional, which make it easier for you to ship new module versions without changing the variables that module users need to define.

### What are the `check` blocks?

Terraform checks let you define assertions to validate as part of your infrastructure management workflow.

Checks let you take advantage of Terraform's abstraction of the differences between different provider APIs.

Unlike variable validation or custom conditions, check blocks are decoupled from the lifecycle of a specific resource or data source.

Unlike custom conditions or variable validation errors, failed checks do not block applies.

### How to make the check block more flexible?

You can reference data sources in `check` block assertions.
Terraform queries the data source when it evaluates your configuration's checks, at the end of each Terraform operation.

### What are tests in TF?

Terraform tests let you validate your module configuration without impacting your existing state file or resources.

Testing is a separate operation that is not part of a plan or apply workflow, but instead builds ephemeral infrastructure and tests your assertions against in-memory state for those short-lived resources.

### How TF runs the `run` blocks?

Terraform executes `run` blocks sequentially.

### What are `mocks` in TF?

Terraform also lets you mock providers, resources, and data sources for your tests. This lets you simulate any resources and their attributes that your configuration depends on without actually creating ephemeral infrastructure for testing. When you use test mocking, Terraform automatically generates values for every computed field of your resources and data sources.

### What is the difference between validation methods and tests?

validation methods are variable validation, preconditions, postconditions, and check blocks.

Validation is like error checking for your Terraform configuration. When validation fails, the module consumer is responsible for resolving the issue.

Tests let module authors verify the behavior of the configuration and ensure that updates do not introduce breaking changes.

### What does `init` step include?

TF

* configures the backend
* installs all modules and providers
* creates a version lock file

### What feateres does TFC include?

* remote state
* remote execution
* structured plan output
* workspace resource summuries

### What is `.terraform` for?

TF uses the `.terraform` directory to store the project's providers and modules.

### In which cases you need to run `terraform init`?

* have created new TF configuration and are ready to use it
* have cloned a version control repository containing Terraform configuration, and are ready to use it
* have added, removed, or changed the version of a module or provider in an existing workspace
* have added, removed, or changed the backend or cloud blocks within the terraform block of an existing workspace

### What does TF workflow consist of?

* Initialize - prepares your workspace so TF can apply your configuration.
* Plan - allows you to preview the changes TF will make before you apply them.
  TF creates the plan by comparing your TF configuration to the state of your infrastructure.
* Apply - makes the changes defined by your plan to create, update, or destroy resources.

### What TF feature is handy in automated TF pipelines?

Save an execution plan to a file with `-out` flag and apply it later.
The saved plan is not in human-readable format.

To read the plan you need to use `terraform show <plan_file_name>`.

To convert the plan to JSON you need `terraform show -json <plan_file_name> | jq > <file_name>.json`.

### What happens during apply step?

in normal workflow

1. lock workspace state (`.terraform.tfstate.lock.info`)
2. create a plan and wait for your to approve
3. execute the steps defined in the plan (it tries to do that in parallel when possible)
4. update workspace state with a snapshot of the new state of resources
5. unlock workspace state
6. report the changes it made and outputs

en error workflow

1. log the error and report it to the console
2. update the state file with any changes to your resources
3. unlock the state file

### What happens after error? Does TF make some change to infrastructure?

TF does not support automatically rolling back a partially-completed apply.

### Name common resons for apply errors?

* change to a resource outside of TF
* networking or other transient errors
* unexpected error from upstream API (duplicate resource name, reaching a resource limit, etc)
* a bug in TF provider or TF itself

### What is the difference between TF input variables and variables in programming languages?

* TF variables don't change values during a Terraform run
* TF variables allow users to more safely customize thier infrastructure

### What does the `~>` mean?

The `~>` allows to update the only the last identifier but requires all identifiers except the last one to match the specified identifiers.

### When TF updates state file `version` key?

TF updates state file `version` when a new version of TF requires a change to the state file's format.

### Does `-target` option update only one resource?

Not always, resource targeting updates the target resource and resources that the target depends on, but not resources that depend on it.

Targeting resources can introduce inconsistencies.

### How to review resources in the state file?

The Terraform CLI allows you to review resources in the state file with `terraform show`.

### Does TF provide a way to recreate a resource?

Yes, you can recreate a resource with `terraform apply -replace="aws_instance.example"`
The `plan` command support `-replace` as well.

The `terraform taint` command is DEPRECATED now in favor of `-replace` flag.

### How to rename a resource adress in a state file?

The `terraform mv` command can help.

* the `terraform state mv -state-out=<another-state-file> <resource_address> <resource_address>` moves the resource to another state file without changing the resource address
  * `-state-out` flag is DEPRECATED. To move a resource to another state file
    1. remove the resorce from the first state file with `removed` block in old configuration
    2. remove the resorce from old configuration
    3. add `import` block to new configuration
    4. define the resource in new configuration
* the `terraform state mv <old_resource_address> <new_resource_address>` renames the resource within the state file
* a resource can be moved to another state file and renamed at the same time

### How to remove a resource from a state file?

Use a `removed` block to remove specific resources from your state.

### What blocks can help you to refactor a TF configuration?

* import
* moved - can move a rename a resource
* removed

### HashiCorp promissed to add feature that generates configuration based on existing infrastructure. Is TF supporting this feature now?

Yes, but this feature is still experimental (v1.7.3)

### How to generate TF configuration for a resource?

1. Import the resource into state file with the help of `terraform import` or `import` block (configuration-driven import)
2. Use `terraform plan -generate-config-out=generated.tf` to generate configuration
3. Prune the generated configuration to contain only the necessary arguments you identified (TF uses the provider to generate all arguments)
4. Apply configuration with `terraform apply`

### Can you reference the imported resource right away?

No, the resource must exist in the state before you can reference it in configuration otherwise TF will try to recreate a referencing resource.
Since Terraform has not loaded the resource into state yet, it does not have an attribute in the state to compare with the hardcoded one. That's why it tries to recreate the referencing resource.

### Imagine, you have a configuration-driven import. At what step will TF really import the resource?

At `apply` step. Importing manipulates the Terraform state file during the apply.

### How `refresh` is working?

Terraform `plan` and `apply` operations run an implicit in-memory refresh as part of their functionality, reconciling any drift from your state file before suggesting infrastructure changes.

TF locates resources with the resource IDs.

NOTE: now TF does not overwrite the state file as part of `plan` or `apply`! It kind of uses `-refresh-only` flag.

### What is the difference between `refresh` subcommand and `-refresh-only` flag?

* `terraform refresh` automatically overwrites a state file without giving the option to review the modifications first. As a result, it could lead to a situation, when TF can drop all resources from the state file.

* `-refresh-only` mode for `plan` and `apply` operations makes it safer to check Terraform state against real infrastructure by letting you review proposed changes to the state file.

### What is the difference between a refresh-only `plan` and `apply`?

* `terraform plan -refresh-only` only checks the diff between current infrastructure and state file, it does not compare state with the configuration
* `terraform apply -refresh-only` checks the diff between current infrastructure and state file, it does not compare state with the configuration, it also check the diff in outputs

### How to migrate local TF file to the TFC?

1) Configure `terraform.cloud` block
2) Run `terraform login`
3) Run `terraform init` -> prompt `yes`
4) Add Terraform variable if needed
5) Run `rm terraform.tfstate` locally

### What information can be shown in `terraform console`

1) a resource data `aws_s3_bucket.data`
2) a data block data `data.aws_s3_objects.data`
3) a local variable value `local.bucket_name`
4) function manupulations

The console holds a lock on the state, and you will not be able to use the console while performing other actions that modify state.

### How to pass a command to TF to run?

```bash
 echo 'jsondecode(file("bucket_policy.json"))' | terraform console
```

### What is TF module?

A Terraform module is a set of Terraform configuration files in a single directory.
Terraform modules are similar to the concepts of libraries, packages, or modules found in most programming languages, and provide many of the same benefits.

### What is a root module?

It's a directory where you run TF commands directly.
Terraform always runs in the context of a single root module.

### What is the child module?

A module that is called by another configuration is referred to as a "child module" of that configuration.

### What the difference between local and remote modules?

Local modules are loaded from local filesystem.
Remote modules are loadede from a remote source.

* Terrafrom Registry
* most VCS
* HTTP URLs
* TFC
* TFE

### What problems can modules solve?

* Organize configuration (make it easier to navigate, understand, and update your configuration)
* Encapsulate configuration (encapsulate configuration into distinct logical components)
* Re-use configuration
* Provide consistency and ensure best practices (for example, consistent names and best practices are applied across all of your configuration)
* Self service (make your configuration easier for other teams to use)

### What are module best practices?

* Name your provider `terraform-<PROVIDER>-<NAME>`
* Start writing your configuration with modules in mind
* Use local modules to organize and encapsulate your code
* Use the public Terraform Registry to find useful modules
* Publish and share modules with your team

### How to install a TF module?

You need to run `terraform init` or `terraform get` to install the module. TF installs the module into `.terraform/modules` within configuration's working directory.

For local modules, Terraform will create a symlink to the module's directory.

### What is the difference between a child module and submodule?

Externally located modules are called child modules
Embedded inside the current workspace are called submodules.

### What is the cloud-init?

Cloud-init is the industry standard multi-distribution method for cross-platform cloud instance initialisation. It is supported across all major public cloud providers, provisioning systems for private cloud infrastructure, and bare-metal installations.

### How cloud-init config looks like?

It's a YAML config that starts with `#cloud-config` comment.

### What is a block header?

The block header is the block type and any quoted labels that follow it.

### Is it possible to override TF blocks (variable, output, data, resource, terraform blocks)?

Yes, blocks in `*_override.tf` or `override.tf` (.json extentions as well) files override blocks in normal configuration files.

Keep in mind that the merging behavior is slightly different for each block type.

### What aproach does TF use for checksum verifiation?

This checksum verification is intended to represent a `trust on first use` approach.

### How an argument looks in TF?

`image_id = "abc123"`
Where `image_id` is argument name and `"abc123"` is the argument value

### How to access information about a resource?

Use the `<RESOURCE_TYPE>.<NAME>.<ATTRIBUTE>` syntax to reference a resource attribute in an expression.

### What do you know about implicit and explicit dependencies?

The implicit means "internal".
When resource identifier is used in another resource it's called the implicit dependency.

The explicit means "external".
When we use the `depends_on` attribute it's called explicit dependency.

### Can `depends_on` include arbitrary expressions?

The `depends_on` include arbitrary expressions because its value must be known before Terraform knows resource relationships and thus before it can safely evaluate expressions.

### When to use `for_each` instead of `count`?

If your instances are almost identical, `count` is appropriate.

If some of their arguments need distinct values that can't be directly derived from an integer, it's safer to use `for_each`.

### What does chaining `for_each` between resources mean?

Because a resource using `for_each` appears as a map of objects when used in expressions elsewhere, you can directly use one resource as the `for_each` of another in situations where there is a one-to-one relationship between two sets of objects.

```hcl
resource "random_pet" "a" {
  for_each = var.pets
  length = 2
}

resource "random_pet" "b" {
  for_each = random_pet.a
  prefix = each.value.id
  length = 2
}
```

### What is the syntax for sets?

The Terraform language doesn't have a literal syntax for set values.

### When does TF read the data resources?

Terraform reads data resources during the planning phase when possible.

### How do data sources work?

The data resources cause Terraform only to read objects.
Terraform reads data resources during the planning phase when possible.

TF defers reading data resources:

* a managed resource attribute or other value that Terraform cannot predict is used as an argument
* data resource depends directly on a managed resource
* data resource has custom conditions and it depends directly or indirectly on a managed resource that itself has planned changes in the current plan

#### Example

There is "d" data resource and "r" managed resource. The d depends on r.attribute

1) changes in r.b
   1) using r.attribute directly in d.attribute deffers the reading
   2) using local variable (r.attribute) in d.attribute prevents deferring reading (reading happens during refresh)
   3) using r.attribute in d.precondition or d.postcondition deffers the reading
   4) using local variable (r.attribute) in d.precondition or d.postcondition deffers the reading
2) no changes in r
   1) using r.attribute directly in d (reading happens during refresh)
   2) using local variable in d.attribute (reading happens during refresh)

### Is it allowed to use expressions in provider block?

Yes, but can only reference values that are known before the configuration is applied, for example, input variables.

### Can you create resources in different AWS regions within one TF configuration?

Yes, to do that we need to define a few provider blocks. The first one is a default one, other must have `alias` meta-argument.

### How to declare a configuration alias within a module?

To declare a configuration alias within a module in order to receive an alternate provider configuration from the parent module, add the `configuration_aliases` argument to that provider's `required_providers` entry.

```hcl
terraform {
  required_providers {
    mycloud = {
      source  = "mycorp/mycloud"
      version = "~> 1.0"
      configuration_aliases = [ mycloud.alternate ]
    }
  }
}
```

### How to reference an alternate provider in a resource?

```hcl
resource "aws_instance" "foo" {
  provider = aws.west

  # ...
}

module "example" {
  source    = "./example"
  providers = {
    aws = aws.west
  }
}

module "tunnel" {
  source    = "./tunnel"
  providers = {
    aws.src = aws.usw1
    aws.dst = aws.usw2
  }
}
```

### What does provider `source` address consist of?

It consists of `[<HOSTNAME>/]<NAMESPACE>/<TYPE>`, for example, hashicorm/aws

* HOSTNAME is the hostname of the Terraform registry that distributes the provider "registry.
Defaults to "registry.terraform.io"
* NAMESPACE is an organizational namespace within the specified registry
* TYPE is a short name for the platform or system the provider manages

### Do provider repositories have a naming convention?

I would say yes, it's better to follow `terraform-provider-<TYPE>` naming convertion.

For example,

* https://github.com/hashicorp/terraform-provider-aws
* https://github.com/hashicorp/terraform-provider-google
* https://github.com/oracle/terraform-provider-oci

### What does module `source` address consist of?

* `<NAMESPACE>/<NAME>/<PROVIDER>` for public Terraform registry.
For example, `"hashicorp/consul/aws"`

* `<HOSTNAME>/<NAMESPACE>/<NAME>/<PROVIDER>` for private regirstry.
For example, `"app.terraform.io/example_corp/vpc/aws"`

* HOSTNAME is the hostname of the Terraform registry that distributes the module "registry.
Defaults to "registry.terraform.io"
* NAMESPACE on the public Terraform Registry the "namespace" represents the organization that is packaging and distributing the module.

For example,

* https://registry.terraform.io/modules/hashicorp/consul/aws/latest
* https://registry.terraform.io/modules/terraform-aws-modules/iam/aws/latest

### Do module repositories have a naming convention?

Yes, they have to follow `terraform-<PROVIDER>-<NAME>`.

For example,

* https://github.com/hashicorp/terraform-aws-consul
* https://github.com/terraform-aws-modules/terraform-aws-iam
* https://github.com/terraform-aws-modules/terraform-aws-ec2-instance

### How many arguments can be specified in `variable` block?

* description - This specifies the input variable's documentation
* type - This argument specifies what value types are accepted for the variable
* default - A default value which then makes the variable optional
* sensitive - Limits Terraform UI output when the variable is used in configuration (defalts to false)
* nullable - Specify if the variable can be null within the module (defaults to true)
* validation - A block to define validation rules, usually in addition to type constraints

### When TF can disclose a sensitive variable?

TF sent a value to providers without any obfuscation.
A provider error could disclose a value if that value is included in the error message.

### What uses do `outputs` have?

* a child module can use outputs to expose a subset of its resource attributes to a parent module
* a root module can use outputs to print certain values in the CLI output after running `terraform apply`
* when using remote state, root module outputs can be accessed by other configurations via a `terraform_remote_state` data source

### What arguments do modules require?

`source` argument is mandatory for all modules

### Should shared modules contain provider version constraints?

Yes, it's better to constrain only the minimum required provider version using a `>=` constraint

### Does a child module inherit all the parent module providers?

No, only the default providers (without `alias` meta-argument) are inherited

### How does `moved` block work?

```tf
moved {
  from = aws_instance.a
  to   = aws_instance.b
}
```

Before creating a new plan for `aws_instance.b`, Terraform first checks whether there is an existing object for `aws_instance.a` recorded in the state. If there is an existing object, Terraform renames that object to `aws_instance.b` and then proceeds with creating a plan.

### When TF processes the `import` block?

Terraform processes the import block during the plan stage. Once a plan is approved, Terraform imports the resource into its state during the subsequent apply stage.

### Is `import` block idempotent?

Yes, the `import` block is idempotent, meaning that applying an import action and running another plan will not generate another import action as long as that resource remains in your state.

### Is literal value an expression?

Yes, both "some_stinrg" and 5 are the simplest expressions.

### What is the result of an expression?

The result of an expression is a value. All values have a type (except null value), which dictates where that value can be used and what transformations can be applied to it.

### What is going on when you set a resource argument to `null` value?

If you set an argument of a resource to `null`, Terraform behaves as though you had completely omitted it — it will use the argument's default value if it has one, or raise an error if the argument is mandatory.

### How to access elements in complex types, structural types, or collection types?

Elements of list/tuple and map/object values can be accessed using the square-bracket index notation, like local.list[3], local.map["key"]

### What is the interpolation in TF?

A `${ ... }` sequence is an interpolation

### What is the directive in TF?

A `%{ ... }` sequence is a directive, which allows for conditional results and iteration over collections, similar to conditional and for expressions.

* `%{if <BOOL>}/%{else}/%{endif}`
* `%{for <NAME> in <COLLECTION>} / %{endfor}`
* `"Hello, %{ if var.name != "" }${var.name}%{ else }unnamed%{ endif }!"`
* <<EOT
  %{ for ip in aws_instance.example[*].private_ip }
  server ${ip}
  %{ endfor }
  EOT

### What is an operator?

An operator is a type of expression that transforms or combines one or more other expressions.

Operators that work on two values place an operator symbol between the two values, similar to mathematical notation: `1 + 2`.

Operators that work on only one value place an operator symbol before that value, like `!true`.

### How to expand function arguments?

Provide the list value as an argument and follow it with the `...` symbol

```tf
min([55, 2453, 2]...)
```

### What is a version constraint?

The `version constraint` is a specially formatted string.

### What version constraint operators do you know?

* `=` (or no operator): Allows only one exact version number

* `!=`: Excludes an exact version number

* `>, >=, <, <=`: Comparisons against a specified version

* The `~>` is called "pessimistic constraint operator".
Allows only the rightmost version component to increment.
`~> 1.0.4`: Allows Terraform to install `1.0.5` and `1.0.10` but not `1.1.0`.

The `,`(commas) can be used in version constraint

```tf
version = ">= 3.0.0, !=3.0.2, < 4.0.0"
```

Prerelease versions do not match inexact operators such as `>=`, `~>`, etc.
To pick a prerelease version (with suffix, for example, `1.2.0-beta`) the constraint has to use the `=` operator or no operator.

### What is the type constrainsts?

Type constraints are expressed using a mixture of type keywords and function-like constructs called type constructors.

Type constraints look like other kinds of Terraform expressions, but are a special syntax. They are valid only in `type` argument of an input variable.

### What do you know about the `any`?

The keyword `any` is a special construct that serves as a placeholder for a type yet to be decided. The `any` is not itself a type: when interpreting a value against a type constraint containing `any`, Terraform will attempt to find a single actual type that could replace the `any` keyword to produce a valid result.

### Is the `tfe_outputs` data source able to read sensitive outputs?

Yes, however, the whole map of `data.tfe_outputs.values` will be marked sensitve if at least one output is marked sensitive.

The `nonsensitive` function can help to expose the sensitive values.
You can filter state JSON data in TFC.

### What does the terraform plan command do? (16)

Creates an execution plan and then determines what actions are necessary to achieve the desired state by evaluating the difference between the configuration file and the state file.

### Does terraform taint command modify infrastructure as soon as you run it?

No, this command will not modify infrastructure, but it will modify the state file in order to mark a resource as tainted, and the next apply will implement this change.

### Can we make sure that S3 bucket are encrypted with Sentinel Police?

Yes.

Sentinel is a policy as code framework that’s integrated into Hashicorp enterprise products. Sentinel allows users to define policies that are enforced against infrastructure between the plan and apply phases of a Terraform run.

Compared to many tools that scan existing infrastructure for policy infractions, Sentinel proactively prevents provisioning of out-of-policy infrastructure.

Sentinel can enforce compliance policies and policies are checked when a run is performed, after the `terraform plan` but before it can be confirmed or the `terraform apply` is executed.

### Check all TF environemnt variables?

Does `TF_CLI_ARGS`, `TF_IN_AUTOMATION` exist?

`TF_CLI_ARGS_plan` is valid

The value of `TF_CLI_ARGS` will specify additional arguments to the command-line. This allows easier automation in CI environments as well as modifying the default behavior of Terraform on your own system.

The flag `TF_CLI_ARGS` affects all Terraform commands. If you specify a named command in the form of `TF_CLI_ARGS_name` then it will only affect that command.

These arguments are inserted directly after the subcommand (such as plan) and before any flags specified directly on the command-line. This behavior ensures that flags on the command-line take precedence over environment variables.

### What is the difference beetween `terraform show` and `terraform state show`?

`terraform show` is used to provide human-readable output from a state or plan file. It outputs the result similar to plan - data, resource and output blocks with attributes and data, resource identifiers. The `-json` option can be used.
It also can be used to read the information from a plan file.

`terraform state show <ADDRESS>` shows the attributes of one resource in the Terraform state. The output is human-readable. The `-json` option can not be used.

### What is `idempotence` in the context of IaC?

The idempotent characteristic provided by IaC tools ensures that, even if the same code is applied multiple times, the result remains the same.

### How complex the TF workspaces are?

Terraform workspaces are technically equivalent to renaming your state file. Terraform wraps this simple notion with a set of protections and support for remote state.

For local state, Terraform stores the workspace states in a directory called `terraform.tfstate.d`. This directory should be treated similarly to local-only `terraform.tfstate`.

### Is it mandatory to provide a version constraint string to pull modules from the Terraform registry?

* `source` - Require meta-argument
* `version` - Optional meta-arguments

### What files TF directory can potentially contain?

* `*.tf` files (TF configuration files)
* `*.tfvars`, `*.auto.tfvars`, `*.tfvars.json`, `*.auto.tfvars.json` variable files
* `terraform.tfstate` state file if backend is local and only one workspace
  * this file always for `default` worksapce even if extra workspaces exist
* `terraform.tfstate.backup` backup state file. Terraform forces every state modification command to write a backup file
* `terraform.tfstate.d/<WORKSPACE NAME>/terraform.tfstate` state files if backend is local and a few extra workspaces are used
* `tests/*.tftest.hcl` test files
* `terraform.log` log file (the name can be anything)
* `.terraform/plugins/` directory with provider plugins
* `.terraform/modules/` directory with modules used in the configuration
* `.terraform/environment` file which tracks active workspace
* `.terraform/terraform.tfstate` files stores remote backend configuration (for local backend this files does not exist)
* `.terraform.lock.hcl` file with locked providers' versions
* `.terraformrc` configuration file. It configures per-user settings for CLI behaviors. The `rc` stands for `runtime configuration`
* `~/.terraform.d/credentials.tfrc.json` TFC API token

### What does `terraform init` command do?

Initialization performs several tasks to prepare a directory, including

* accessing state in the configured backend
* downloading and installing provider plugins
* downloading modules

### When reinitialization can be needed?

The reinitialization is required when there are changes to

* provider requirements
* module sources
* version constraints
* backend configurations

### What planning modes do you know?

* normal (terraform plan)
  1) reads the current state of any already-existing remote objects and saves this info in memory
     * when the `-refresh=false` option is provided there is no refresing (reading) remote objects, hence this step is skipped
  2) compares the in-memory state to the current configuration (not to the state file) and noting differences
     * when the `-refresh=false` option is provided the `comparison` is made against the state file
  3) generates a detailed execution plan that outlines the actions it will take to achieve the desired state (resources and outputs)
* refresh-only (terraform plan -refresh-only)
  1) reads the current state of any already-existing remote objects and saves this info in memory
  2) compares the in-memory state to the state file (not the current configuration) and noting differences
  3) generates a detailed execution plan that outlines the changes it will make to the state file (resources and outputs)
* destroy (terraform plan -destroy)

### What does the `-lock=false` do?

Don't hold a state lock during the operation.

This is dangerous if others might concurrently run commands against the same workspace.

### Where TF stores an API token?

By default, Terraform will obtain an API token and save it in plain text in a local CLI configuration file called `credentials.tfrc.json` in `~/.terraform.d` directory in linux

### How can you quickly test some TF expressions?

The `terraform console` command provides an interactive console for evaluating expressions.

You can use the `-plan` option to instead generate an execution plan first, as if running terraform plan, and then evaluate against the planned state.

### How does Terraform determine the backend configuration when you apply a plan that you have already saved to a file?

When applying a plan that you previously saved to a file, Terraform uses the backend configuration stored in that file instead of the current backend settings.

### What important limitations apply to backend configuration?

1) A configuration can only provide one backend block
2) A backend block cannot refer to named values (like input variables, locals, or data source attributes)
3) You cannot reference values declared within backend blocks elsewhere in the configuration

### What potential issues could arise if the `-backend-config` (partial configuration) option is used during initialization to supply the remaining configuration?

The `-backend-config` option takes either PATH or "KEY=VALUE" value

* `-backend-config=config.consul.tfbackend`
* `-backend-config="address=demo.consul.io"`
* `-backend-config="scheme=https"`

1) most shells retain command-line flags in a history file, so it's not recommended for secrets
2) this can leak sensitive credentials, as Terraform will include these in the `.terraform/terraform.tfstate` file
3) this can leak sensitive credentials, as Terraform will include backend configuration (plan files capture the information in `.terraform/terraform.tfstate` at the time the plan was created) in plan files

### Does the `terraform validate` hold a lock?

No

The `terraform validate` command validates the configuration files in a directory, referring only to the configuration and not accessing any remote services such as remote state, provider APIs, etc.

Validate runs checks that verify whether a configuration is syntactically valid and internally consistent, regardless of any provided variables or existing state. It is thus primarily useful for general verification of reusable modules, including correctness of attribute names and value types.

Validation requires an initialized working directory with any referenced plugins and modules installed. As I understand it uses providers shemas to verify types of resource attributes.

### How does the `create_before_destroy` work?

Terraform propagates and applies the `lifecycle.create_before_destroy` meta-attribute behaviour to all resource dependencies. For example, if `create_before_destroy` is enabled on resource `A` but not on resource `B`, but resource `A` is dependent on resource `B`, then Terraform enables `create_before_destroy` for resource B implicitly by default and stores it to the state file. You cannot override `create_before_destroy` to `false` on resource `B` because that would imply dependency cycles in the graph.

### What actions are allowed only to organization owners?

Every organization has a team named owners, and members of the owners team are sometimes called organization owners.

Only organization owners can perform the following tasks:

* Creating and deleting teams
* Managing organization-level permissions granted to teams
* Viewing the full list of teams, both visible and secret
* Managing organization settings

### Does terraform reject a resource replacement/removal with `lifecycle.prevent_destroy` if resource is needed to be replaced/destroed?

Yes, terraform will provide a plan and throw the `Instance cannot be destroyed` error
