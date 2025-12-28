${ip2}

[webservers]
${ip3}

[dbservers]
${ip4}

[testserver]
${ip5}

[all:vars]
ansible_ssh_user=root
ansible_ssh_pass=redhat
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o ForwardAgent=yes'

# [servers:children]
# webservers
# dbservers

# [ranges]
# 172.17.0.[2:6]

# first ansible_host=192.0.2.50
