# Ansible

## Commands

```bash
ansible-inventory --graph  # list the hosts in the inventory
ansible-inventory --host webservers  # show connection variables for webservers hosts

ansible all -m ping  # establish a connection to all hosts
ansible all -m setup  # ansible get the facts about the hosts, this modules is used in 'Gathering Facts' task
ansible all -m setup -a 'filter=ansible_env'  # filter the output by top keys
ansible all -m command -a uptime  # check uptime on hosts
ansible all -a "tail -10 /var/log/bootstrap.log"  # '-m command' is omitted because is used by default
ansible all -b -a "tail /var/log/syslog"  # run command with root privileges
ansible all -b -m package -a name=nginx  # install nginx
ansible all -b -m package -a "name=nginx update_cache=yes"  # update packages before installing nginx
ansible all -b -m service -a "name=nginx state=restarted"  # restart nginx service

ansible-doc service  # show documentation about service module
ansible-doc -l | grep aws  # list aws-related modules
ansible-doc -t inventory -l  # get list of inventory type plugins
ansible-doc -t inventory amazon.aws.aws_ec2  # show documentation about amazon.aws.aws_ec2 plugin

ansible-playbook --list-tasks playbook.yaml  # list the tasks
ansible-playbook --list-hosts playbook.yaml  # list the hosts
ansible-playbook --list-tasks playbook.yaml  # list the tasks
ansible-playbook --check playbook.yml  # dry run, no changes are applied, not all modules support 'check' feature
ansible-playbook --diff --check playbook.yml  # show the diff, not all modules support 'diff' feature
ansible-playbook --step playbook.yml  # ansible asks a confirm to run every task (y - yes, n - skip, c - continue without asking)
ansible-playbook --start-at-task="Install packages" playbook.yml  # runs the playbook from the specific task

ansible-galaxy init --init-path playbooks/roles web  # generate files for a new role 'web'

# checking
ansible-playbook --syntax-check playbook.yaml
ansible-lint playbook.yaml
yamllint playbook.yaml
ansible-inventory --host webservers  # show information about a specific host

```

## Common issues

* does not cover a string with quotes when string starts with the variable interpolation

```yaml
msg: {{ my var }} is my var  # YAML parser will think it's a abbreviated dictionary
msg: "{{ my var }} is my var"  # the right approach
```

* be careful with handlers

```txt
It can be skipped when
1. I run playbook
2. A task changes
3. The next task fails
4. I fix the issue
6. Run Ansible again
7. No task notifies about the status change hence no handlers are run
```

* check changed and unchanged module registered variable because the dictionaries could be different

## Best practices

* debug failed module with

```yaml
- name: Run myprog
  command: /opt/myprog
  register: result
  ignore_errors: true

- debug: var=result
```

## What is Ansible?

Ansible is an open source, command-line IT automation software application written in Python. It can configure systems, deploy software, and orchestrate advanced workflows to support application deployment, system updates, and more.

Ansible’s main strengths are simplicity and ease of use. It also has a strong focus on security and reliability, featuring minimal moving parts. It uses OpenSSH for transport (with other transports and pull modes as alternatives), and uses a human-readable language that is designed for getting started quickly without a lot of training.

## What are design principals of Ansible?

* Agent-less architecture

    Low maintenance overhead by avoiding the installation of additional software across IT infrastructure.

* Simplicity

    Automation playbooks use straightforward YAML syntax for code that reads like documentation. Ansible is also decentralized, using SSH with existing OS credentials to access to remote machines.

* Scalability and flexibility

    Easily and quickly scale the systems you automate through a modular design that supports a large range of operating systems, cloud platforms, and network devices.

* Idempotence and predictability

    When the system is in the state your playbook describes Ansible does not change anything, even if the playbook runs multiple times.

## What is Control node?

A system on which Ansible is installed. You run Ansible commands such as ansible or ansible-inventory on a control node.

The machine from which you run the Ansible CLI tools (`ansible-playbook` , `ansible`, `ansible-vault` and others).

## What is Managed node?

A remote system, or host, that Ansible controls.

Also referred to as "hosts", these are the target devices (servers, network appliances or any computer) you aim to manage with Ansible.

## What is Inventory?

A list or group of lists of managed nodes that are logically organized.
You create an inventory on the control node to describe host deployments to Ansible.

Sometimes an inventory source file is also referred to as a "hostfile".

## What is Playbook?

They contain Plays (which are the basic unit of Ansible execution).
This is both an "execution concept" and how we describe the files on which ansible-playbook operates.

Playbooks are written in YAML and are easy to read, write, share and understand.
An Ansible Playbook is a YAML file used to define a set of automation tasks in Ansible.
Playbooks describe how a system should be configured, what tasks should be performed, and in what order.

## What is Play?

The main context for Ansible execution, this playbook object maps managed nodes (hosts) to tasks. The Play contains variables, roles and an ordered lists of tasks and can be run repeatedly. It basically consists of an implicit loop over the mapped hosts and tasks and defines how to iterate over them.

A play is responsible for targeting a set of hosts and running a series of tasks on them.

## What is Role?

A role is a way to organize and reuse automation tasks in a modular and structured manner.
A role allows you to group related tasks, variables, handlers, and files into a single unit that can be easily included and reused across multiple playbooks. This helps improve maintainability, scalability, and clarity in your Ansible automation.

When we execute a Playbook with roles

1) run tasks in `pre_tasks` section
2) run roles
3) run tasks in `post_tasks` section

Roles can depend on other roles.

## What is Task?

The definition of an "action" to be applied to the managed host.

A task is a single unit of work that defines an action to be executed on a target host.

You can execute a single task once with an ad hoc command using `ansible` or `ansible-console`.

## What is Handler?

A special form of a Task, that only executes when notified by a previous task which resulted in a "changed" status.

## What is Module?

Modules are scripts that come packaged with Ansible and perform some kind of action on a host

```yaml
- name: install something
  ansible.builtin.package:
    name: nginx
```

The `ansible.builtin.package` is module

## What is Plugin?

Pieces of code that expand Ansible's core capabilities.

Plugins can control how you

* connect to a managed node (connection plugins)
* manipulate data (filter plugins)
* and even control what is displayed in the console (callback plugins)

## What is Collection?

A format in which Ansible content is distributed that can contain playbooks, roles, modules, and plugins. You can install and use collections through Ansible Galaxy.

## Files

 ./ansible.cfg
 ~/.ansible.cfg
/etc/ansible/ansible.cfg - default location for an inventory file on Linux
/usr/local/etc/ansible/ansible.cfg - default location for an inventory file on BSD

/etc/ansible/hosts

## How to make your inventory flexible and customizable?

* you can create a directory with multiple inventory files
* you can pull inventory dynamically
* you can use multiple sources for inventory, including both dynamic inventory and static files

## What are valid variable names?

* a variable name can only include letters, numbers, and underscores
* a variable name cannot begin with a number
* Python keywords or playbook keywords are not valid variable names

## What are host default groups?

Even if you do not define any groups in your inventory file, Ansible creates two default groups: `all` and `ungrouped`.

The `all` group contains every host. The `ungrouped` group contains all hosts that don't have another group aside from `all`. Every host will always belong to at least 2 groups (`all` and `ungrouped` or `all` and some other group).

You can put each host in more than one group.

You can create parent/child relationships among groups. Parent groups are also known as nested groups or groups of groups.

## In which order Ansible load inventory sources?

Ansible loads inventory sources in ASCII order according to the file names.

If you define parent groups in one file or directory and child groups in other files or directories, the files that define the child groups must be loaded first.

## What are behavioral inventory parameters?

[https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html#connecting-to-hosts-behavioral-inventory-parameters]

## How to define a host alias in inventory?

```ini
first ansible_host=192.0.2.50
```

## How to force a handler to run?

You need to use the following task

```yaml
    - name: Restart nginx
      meta: flush_handlers
```

## How Ansible does resolve the hostnames?

Ansible resolves hostnames using

* the inventory
* your SSH config file
* /etc/hosts
* and DNS

## What are pets and cattle?

We give pets distinctive names and treat and care for them as individuals

With cattle, though, we refer to them by identification number and treat them as livestock

```ini
[web]
web[1:20].example.com
another-web[01:20].example.com
web-[a:t].example.com
```

## Why inventory file is a bad place to store variables?

Because in the inventory files it's only allowed to store booleans and strings (lists and dictionaries are not allowed)
Even in YAML inventory file???

## Where can variables be defined?

What is the right order???

1. In inventory file, as host params

    ```ini
    127.0.0.1 ansible_ssh_user=root color=red
    ```

2. In inventory file, in `vars` section

    ```ini
    [ungrouped:vars]
    color=red
    ```

3. In playbook file, in a play, in `vars` section

    ```yaml
    - name: Configure something
      vars:
        abc: some-text
    ```

4. In a file that is specified in `vars_files` section of a play

    ```yaml
    - name: Configure something
      vars_files:
        - my_vars.yaml
    ```

5. In playbook file, in a specific task

    ```yaml
      tasks:
        - name: Check variables
          ansible.builtin.debug:
            var: abc
          vars:
            abc: 1
    ```

6. In `host_vars` directory

    1. In `inventory` folder

        ```path
        /home/user/inventory/host_vars/amsterdam.example.com
        or
        /home/user/inventory/host_vars/amsterdam.example.com/db
        /home/user/inventory/host_vars/amsterdam.example.com/web
        ```

    2. In `playbooks` folder

        ```path
        /home/user/playbooks/host_vars/amsterdam.example.com
        or
        /home/user/playbooks/host_vars/amsterdam.example.com/db
        /home/user/playbooks/host_vars/amsterdam.example.com/web
        ```

7. In `group_vars` directory

    1. In `inventory` folder

        ```path
        /home/user/inventory/group_vars/production
        or
        /home/user/inventory/group_vars/production/db
        /home/user/inventory/group_vars/production/web
        ```

    2. In `playbooks` folder

        ```path
        /home/user/playbooks/group_vars/amsterdam.example.com
        or
        /home/user/playbooks/group_vars/amsterdam.example.com/db
        /home/user/playbooks/group_vars/amsterdam.example.com/web
        ```

8. Register a variable within a task

    ```yaml
        - ansible.builtin.command: date
          register: datetime
        - ansible.builtin.debug: var=datetime
    ```

9. Pass variables in CLI command with `-e` or `--extra-vars` option

    ```bash
    ansible-playbook playbook.yaml -e 'abc=1'
    ansible-playbook playbook.yaml -e @vars.yml
    ```

10. Put files (.ini, .json, executable with JSON return) into `/etc/ansible/facts.d` directory **on a host**

    The facts will be available within `ansible_local` variable

    ```ini (/etc/ansible/facts.d/example.fact)
    [book]
    title=Ansible: Up and Running
    authors=Meijer, Hochstein, Moser
    publisher=O'Reilly
    ```

    ```yaml
    - name: Print book title
      debug: msg="The title of the book is {{ ansible_local.example.book.title }}"
    ```

11. With the help of `ansible.builtin.service_facts` module

12. With the help of `ansible.builtin.set_fact` module

    We, for example, can "convert" service facts into regular facts

    ```yaml
    - name: Set nginx_state
      when: ansible_facts.services.nginx.state is defined
      set_fact:
        nginx_state: "{{ ansible_facts.services.nginx.state }}"
    ```

## What is interface for dynamic inventory?

* it must be executable file
* it must return JSON information that Ansible is able to understand
* it must support `--host=<hostname>` option to show information about a specific host
* it must support `--list` option to show information about all hosts/groups

## add_host module and dynamic inventory script

If a new host comes online while a playbook is executing, the dynamic inventory script will not pick up this new host.
This is because the dynamic inventory script is executed at the beginning of the playbook: if any new hosts are added while the playbook is executing, Ansible won't see them.

## is it possible to concatenate variables?

Yes

```yaml
- ansible.builtin.debug:
    msg: "The URL is https://{{ server_name }}.{{ domain_name }}/"
    msg: "The URL is https://{{ server_name ~'.'~ domain_name }}/"
```

## What are facts?

Facts are system information that Ansible automatically gathers about the managed hosts (or target machines) before executing tasks.

They are available within `ansible_facts` variable. The Play must have `gather_facts: true` (it's by default)

## What is hostvars variable? Why is it impotent?

This is how we can calculate all the variables associated with the current host.

The `hostvars` is a dictionary-like structure that contains the variables associated with each individual host in your inventory.

```yaml
- debug: var=hostvars[inventory_hostname]
```

## How can we make sure a task is successful?

We can use assert module

```yaml
- name: Stat /boot/grub
  stat:
    path: /boot/grub
  register: st

- name: Assert that /boot/grub is a directory
  assert:
  that: st.stat.isdir
```

## What are `changed_when` and `failed_when`?

`failed_when: false` is used when you want to continue the script even an error occurred in a task
`changed_when: '"Creating tables" in result.out'` - is used when a particular task has "changed" a remote node

## What is `default` filter?

```yaml
host: "{{ database_host | default('localhost') }}"
```

## What are lookups?

Lookup plugins are an Ansible-specific extension to the Jinja2 templating language.

You can use lookup plugins to access data from outside sources (files, databases, key/value stores, APIs, and other services) within your playbooks.

```yaml
- name: Add my public key for SSH
  authorized_key:
    key: "{{ lookup('ansible.builtin.file', '~/.ssh/id_ed25519.pub') }}"

- name: url lookup splits lines by default
  ansible.builtin.debug: msg="{{ item }}"
  loop: "{{ lookup('ansible.builtin.url', 'https://github.com/gremlin.keys') }}"
```

## How to iterate through the loop?

You can use `with_*` or `loop` plugins

```yaml
- name: Add users
  become: true
  user:
    name: "{{ user.name }}"
  with_items:
    - { name: gil }
    - { name: leanne }
  loop_control:
    loop_var: user


- name: Iterate with loop
  debug:
  msg: "KPI: {{ item.kpi }} priority: {{ i + 1 }} goto: {{ item.dept }}"
  loop:
    - kpi: availability
      dept: operations
    - kpi: performance
      dept: development
  loop_control:
    index_var: i
    pause: 3
```

## What we can import?

* `include_tasks`
* `include_vars`
* `include_role`

```yaml
- include_tasks: nginx_include.yml
  become: yes
  when: ansible_os_family == 'RedHat'
  tags: nginx
```

Note:  `ansible-playbook --list-tasks` can not to display task that were imported dynamically (`include_tasks: "{{ ansible_os_family }}.yml"`)

## How can we group the tasks?

We can group the tasks with `block` expression

```yaml
- block:
  - name: Install nginx
    package:
    name: nginx

  - name: Ensure nginx is running
    service:
      name: nginx
      state: started
      enabled: yes

  rescue:
    - name: Print when errors
      ansible.builtin.debug:
        msg: 'I caught an error'

  always:
    - name: Always do this
      ansible.builtin.debug:
        msg: "This always executes"

  become: yes
  when: "ansible_os_family == 'RedHat'
```

## How to run a specific task on the control node?

you need to use `delegate_to` keyword

```yaml
- name: Download goss binary
  delegate_to: localhost
  connection: local
  run_once: true  # it can be handy with delegate_to
  become: false
  get_url:
    url: "https://oreil.ly/RuRsL"
    dest: "~/Downloads/goss"
    mode: '0755'
```

## What are execution strategies?

* linear (default) - run a task on all hosts and only after that go to another task
* free - run a task after task for all hosts

## What is connection keyword and how does it work? What is the difference between connection and delegate_to?

## How to force handlers to run?

we need to use meta module

```yaml
- name: Install home page
  template:
    src: index.html.j2
    dest: /usr/share/nginx/html/index.html
    mode: '0644'
  notify: Restart nginx

- name: Restart nginx
  meta: flush_handlers
```

## How to make Ansible to work faster?

* enable SSH multiplexing (reuse SSH sessions instead of creating a new one for each task)
* enable pipelining (if supported by the connection plugin, reduces the number of network operations required to execute a module on the remote server)
* start cashing facts
* set up asynchronous tasks
