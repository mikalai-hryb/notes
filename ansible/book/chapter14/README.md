# Chapter 14


Molecule depends on Python version 3.6 or greater and Ansible version 2.8 or
greater. Depending on your operating system, you might need to install additional
packages. Ansible is not a direct dependency, but is called as a command-line tool.

- For Red Hat, the command is:

```
yum install -y gcc python3-pip python3-devel openssl-devel python3-libselinux
```

- For Ubuntu, use:

```
apt install -y python3-pip libssl-dev
```

We recommend you install it in a Python virtual environment. It is important to isolate
Molecule and its Python dependencies from the system Python packages. This can
save time and energy when managing Python packaging issues.


## Create a virtualenv

This installs python dependencies listed in the `requirements.txt` file into a Python 3 virtualenv:

```
source chapter14.rc
```
