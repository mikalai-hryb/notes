# [systemd](https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units)

`systemd` is an init system and system manager.

`systemctl` is the central management tool/command for controlling the init system.

An `init system` in Linux refers to the first process started by the kernel during the booting process. This process has the responsibility of initializing the user space and setting up the environment for the user and system services. It remains running as long as the system is up, managing various system and user processes. The init system plays a crucial role in the overall management and operation of the Linux system.

Services are defined with unit files in `/etc/systemd/system/` or `/lib/systemd/system/`.

```bash
systemctl status kubelet.service  # checks the status
systemctl daemon-reload  # reloads the system services config files after update
systemctl restart kubelet.service  # restarts service after updating its config files or because of another reason

systemctl list-units --type=service  # lists only services but not all units
systemctl start kubelet.service
systemctl stop kubelet.service
systemctl reload kubelet.service  # reloads service configuration in case if the service has such functionality
systemctl cat kubelet.service
```
