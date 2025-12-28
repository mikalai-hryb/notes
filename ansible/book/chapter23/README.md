# Ansible Automation Platform 2

This project creates 3 RHEL8 VMs with Vagrant/Virtualbox. The ansible provisioner will install Ansible Automation Platform 2 from your local ~/Downloads/.

## Prerequisites

This example needs login credentials for a developer account at Red Hat.
```
export RH_USER=<some-id>
export RH_PASS=<a-password>
```

## Usage:
- If you have a Mac with Homebrew, then you can install what's in the Brewfile with `brew bundle`
- Open the web page [https://www.ansible.com/zero-to-100](https://www.ansible.com/zero-to-100)
- Click 'Start the trial' of Red Hat Ansible Automation Platform
- Download the tar gzipped file in your ~/Downloads directory.
- Request a trial license at http://ansible.com/license
- In roles/tower/defaults/main.yml check the version of
```yaml
tower_name: ansible-automation-platform-setup-2.0.1-1-early-access.tar.gz`
```
- Create a virtualenv with: `source init.rc`
- Update the passwords and encrypt `group_vars/vagrant/vars.yml`
- Provision Ansible Tower: `vagrant up`
- open http://server03 for Tower
- open http://server02 for Automationhub, and load `community/requirements.yml`

@bbaassssiiee
