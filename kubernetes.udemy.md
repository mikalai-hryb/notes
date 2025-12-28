# Udemy

## Questions


### 3

Create a new deployment called my-deployment. Scale the deployment to 3 replicas. Make sure the desired number of pods is always running.

```bash
kubectl create deployment my-deployment --image=busybox:1.28
kubectl scale --replicas=3 deployment/my-deployment
```

### 4

Deploy a web-nginx pod using the nginx:1.17 image with the labels set to tier=web-app.

```bash
kubectl run web-nginx --image=nginx:1.17 --labels="tier=web-app"
```

### 5

Create a static pod on node01 called static-pod with image nginx, and ensure it is recreated/restarted automatically in case of any failure.

```bash
kubectl get nodes
ssh node01
ps aux | grep kubelet  # search for --config
cat /var/lib/kubelet/config.yaml  # check the file and find staticPodPath field

kubectl run static-pod --image=nginx --dry-run=client -o=yaml

cat >/etc/kubernetes/manifests/static-pod.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: static-pod
  name: static-pod
spec:
  containers:
  - image: nginx
    name: static-pod
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
EOF
```

### 6

Create a pod called pod-multi with two containers:

* Container 1 - name: container1, image: nginx
* Container 2 - name: container2, image: busybox, command: sleep 4800

```bash
cat >6.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
    name: pod-multi
spec:
    containers:
    - name: container1
      image: nginx
    - name: container2
      image: busybox
      command:
      - sleep
      - "4800"
EOF
kubectl apply -f 6.yaml
```

### 7

Create a pod called test-pod in the "custom" namespace belonging to the test environment (env=test) and backend tier (tier=backend). Image: nginx:1.17

```bash
kubectl run test-pod --namespace custom --labels="env=test,tier=backend" --image=nginx:1.17
kubectl get pod test-pod -n custom -o yaml
```

### 8

Get the node node01 in JSON format and store it in a file at ​./node-info.json.

```bash
kubectl get node node01 -o json > ​./node-info.json
```

### 9

Use JSON PATH query to retrieve the osImages of all the nodes and store it in a file "all-nodes-os-info.txt" at the root location. Note: The osImages are under the nodeInfo section under the status of each node.

```bash
kubectl get nodes -o=jsonpath='{.items[*].status.nodeInfo.osImage}' > /all-nodes-os-info.txt
```

### 10

Create a Persistent Volume with the given specification:

* Volume Name: pv-demo
* Storage: 100Mi
* Access modes: ReadWriteMany
* Host Path: /pv/host-data

```bash
cat >./10.yaml <<EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-demo
spec:
  capacity:
    storage: 100Mi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteMany
  hostPath:
    path: /pv/host-data
EOF
kubectl apply -f 10.yaml
```

### 11

Worker Node "node01" is not responding. Debug the issue and fix it.

```bash
kubectl get nodes  # check the status of the Node
ssh node01
ps aux | grep -i kubelet
journalctl -xe
vim /etc/kubernetes/kubelet.conf  # and update a cert path
journalctl restart kubelet
ps aux | grep -i kubelet
```

### 12

Upgrade the Cluster (Master and worker Node) from 1.18.0 to 1.19.0. Make sure to first drain both nodes and make them available after the upgrade.

```bash
kubectl drain controlplane --ignore-daemonsets=true
ssh controlplane
apt update
apt install kubeadm='1.30.2-*'
kubeadm upgrade apply v1.30.2
apt install kubelet='1.30.2-00'
systemctl restart kubelet
exit
kubectl get nodes
kubectl uncordon controlplane

kubectl drain node01 --ignore-daemonsets=true
...
```

### 13

Take a backup of the ETCD database and save it to "/opt/etcd-backup.db". Also, restore the ETCD database from the backup.

```bash
ps aux | grep kubelet | grep \\--config
cat /var/lib/kubelet/config.yaml
cat /etc/kubernetes/manifests/etcd.yaml

ETCDCTL_API=3 etcdctl --write-out=table snapshot status /opt/cluster_backup.db
ETCDCTL_API=3 etcdctl \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  snapshot save /opt/cluster_backup.db

ETCDCTL_API=3 etcdctl --write-out=table snapshot status /opt/cluster_backup.db
ETCDCTL_API=3 etcdctl \
  --data-dir /root/default.etcd \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  snapshot restore /opt/cluster_backup.db > restore.txt 2>&1

vim /etc/kubernetes/manifests/etcd.yaml  # update etcd-data hostPath with /root/default.etcd
```

### 14

Create a new user "ajeet". Grant him access to the cluster. User "ajeet" should have permission to create, list, get, update, and delete pods. The private key exists at location: /root/ajeet/.key, and the CSR is at /root/ajeet.csr.

[https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/#normal-user]

### 15

Create a Nginx pod named dns-resolver using the image nginx, expose it internally with a service called dns-resolver-service. Check if the service name is resolvable from within the cluster. Use the image busybox:1.28 for DNS lookup and save the result in /root/nginx.svc.

```bash
kubectl run dns-resolver --image nginx --port 80
kubectl expose pod dns-resolver --name dns-resolver-service --port=80 --target-port=80
kubectl run busybox --image=busybox:1.28 --restart=Never --rm -it -- nslookup dns-resolver-service
kubectl exec busybox  -- nslookup dns-resolver > /root/nginx.svc
```

### 16

A pod "appychip" (image=nginx) in the default namespace is not running. Find the problem and fix it to make it running.

```bash
kubectl describe pod appychip
kubectl get pods
kubectl get pod appychip -o yaml > appychip.yaml
# fix tolerations
kubectl apply -f appychip.yaml
```

### 17

Create a ReplicaSet (Name: appychip, Image: nginx:1.18, Replica: 4). There is already a Pod running in a cluster. Make sure that the total count of pods running in the cluster is not more than 4.

### 18

Create a Network Policy named "appychip" in the default namespace. There should be two types, ingress and egress. The ingress should block traffic from an IP range of your choice except for some other IP range. It should also have namespace and pod selectors. Ports for the ingress policy should be 6379. For egress, it should allow traffic to an IP range of your choice on port 5978.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: appychip
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - ipBlock:
        cidr: 172.17.0.0/16
        except:
        - 172.17.1.0/24
    ports:
    - protocol: TCP
      port: 6379
  egress:
  - to:
    - ipBlock:
        cidr: 10.0.0.0/24
    ports:
    - protocol: TCP
      port: 5978
```

### 19

You have access to multiple clusters from your main terminal through kubectl contexts.
Write all those context names into /opt/course/1/contexts

```bash
kubectl config get-contexts -o name
kubectl config current-context
cat ~/.kube/config | yq .current-context
```

### 20

There are various Pods in all namespaces. Write a command into a file which lists all Pods sorted by their AGE metadata.creationTimestamp

```bash
kubectl get pods -A --sort-by=metadata.creationTimestamp
kubectl get pods -A --sort-by=metadata.uid
```

### 21

Control Plane components.

```bash
find /etc/systemd/system/ | grep kube
find /etc/systemd/system/ | grep etcd
find /etc/kubernetes/manifests/
kubectl -n kube-system get pods -o wide  # to see different components
kubectl -n kube-system get deploy  # to see CoreDNS
```

### 22

Create a namespace and a network policy.

```bash
kubectl create namespace appychip
```

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: my-policy
  namespace: appychip
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          project: appychip
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          project: appychip
    ports:
    - protocol: TCP
      port: 80
```

### 23

kubectl run output-pod --image=busybox:1.28 --restart=Never --rm=true -it -- echo 'asdf' > file.txt

# Upgrade

sudo apt-cache madison kubeadm

sudo apt-mark unhold kubeadm && sudo apt-get update && sudo apt-get install -y kubeadm='1.30.1-1.1' && sudo apt-mark hold kubeadm

killall -s SIGTERM kube-apiserver
sleep 20

sudo kubeadm upgrade plan --ignore-preflight-errors='CreateJob'
sudo kubeadm upgrade apply v1.30.1

kubectl drain <node-to-drain> --ignore-daemonsets
sudo apt-mark unhold kubelet kubectl && \
sudo apt-get update && sudo apt-get install -y kubelet="1.30.1-*" kubectl='1.30.1-*' && \
sudo apt-mark hold kubelet kubectl

sudo systemctl daemon-reload
sudo systemctl restart kubelet
