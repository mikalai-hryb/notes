
# Ansible

## Commands

```bash
# from ansible folder
docker build -t test-ansible -f docker/Dockerfile .
docker run --rm --name test-ansible -p 3022:22 test-ansible

docker inspect \
  -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' test-ansible
```

```bash
ansible-playbook -i inventory/inventory.ini playbooks/test1.yaml
```
