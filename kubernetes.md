# Kubernetes

## Terms

[Glossary](https://kubernetes.io/docs/reference/glossary/?all=true)

CRI - Container Runtime Interface
CDI - Contexts and Dependency Injection
distroless images - enable you to deploy minimal container images that reduce attack surface and exposure to bugs and vulnerabilities.
VIP - virtual IP address - is IP address that does not correspond to a physical network interface
SSL/TLS termination - refers to the process of decrypting encrypted traffic (HTTPS) at a network endpoint, such as a load balancer or reverse proxy, and forwarding the decrypted traffic to the destination server/application.

## Commands

[https://kubernetes.io/docs/reference/kubectl/quick-reference/](quick-reference)

```bash
kubectl config current-context  # or cat ~/.kube/config | yq .current-context
kubectl config get-contexts -o name

kubectl run busybox-pod --image=busybox:1.28 --command sleep 3600 --dry-run=client -o yaml > spec.yaml  # create a PodSpec
kubectl run web-nginx --image=nginx:1.18 --port 80 --namespace custom --labels="env=test,tier=backend"  # create a Pod with the name web-nginx
kubectl run busybox --image=busybox:1.28 --restart=Never --rm -it -- nslookup web-nginx  # create a pod to test if a service is accessible
kubectl run busybox --image=busybox:1.28 --restart=Never --rm=true -it -- nslookup web-nginx > output.txt

kubectl exec busybox -- nslookup web-nginx > output.txt  # put test output in a file

kubectl create deployment nginx-deployment --image=nginx --replicas=1
kubectl create namespace custom

kubectl expose pod web-nginx --name web-nginx-service --port=80 --target-port=80

kubectl describe pod busybox-pod

kubectl get all -A --show-labels
kubectl get pods -o wide --show-labels
kubectl get pod web-nginx -n custom -o yaml
kubectl get pods -A --sort-by=metadata.creationTimestamp
kubectl get nodes
kubectl get nodes -o wide --show-labels
kubectl get nodes –show-labels
kubectl get nodes -o=jsonpath='{.items[*].status.nodeInfo.osImage}'

kubectl scale --replicas=3 deployment/nginx-deployment

kubectl set image deployment/nginx-deployment nginx=nginx:1.17 --record

kubectl edit pod web-nginx

kubectl apply -f spec.yaml

kubectl replace -f spec.yaml --force  # replace on object, useful after editing the object

kubectl rollout history deployment/nginx-deployment

kubectl drain node01 --ignore-daemonsets=true
```

## Questions

### What is Kubernetes?

Kubernetes, also known as K8s, is an open source system for automating deployment, scaling, and management of containerized applications.

Kubernetes believes in automated, API-driven infrastructure without tight coupling between components.

### What are best Kubernetes practices?

* Backing up etcd cluster
* Separating the control plane from the worker nodes.
* Replicating the control plane components on multiple nodes.
* Load balancing traffic to the cluster’s API server.
* Having enough worker nodes available, or able to quickly become available, as changing workloads warrant it.
* Scale: plan how to scale to relieve increased pressure from more requests to the control plane and worker nodes or scale down to reduce unused resources.
* define limits for resources
set rules for access management
* [prevent creating namespaces with the same name as public top-level domains](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
* use [Kubelet credential provider](https://kubernetes.io/docs/concepts/containers/images/#kubelet-credential-provider) to pull Container Images
* use Linux distributions with cgroup v2
* use Mixed Version Proxy for future smooth upgrades
* specify `.spec.os.name` for Pods (linux or windows) and it's better to set `kubernetes.io/os`  label for Nodes
* use ["Distroless" Container Images](https://github.com/GoogleContainerTools/distroless)
* use Pod Disruption Budgets
* set `.spec.startingDeadlineSeconds` for CronJob to avoid missing its scheduled time
* use short-lived tokens for ServiceAccount
* set up kubernetes Dashboard

### What are Quality of Service Classes?

Quality of Service (QoS) classes are used to manage and prioritize resource allocation for Pods.

Kubernetes relies on this classification to make decisions about which Pods to evict when there are not enough available resources on a Node (the Node experiencing Node Pressure).

These classes are determined based on the resource requests and limits specified for the Pods.
The Guaranteed will be the last to be evicted.

* Guaranteed (requests and limits are defined and the same)
* Burstable (pod does not meet the criteria for Guaranteed, and at least one container has a memory or CPU request set)
* BestEffort

### What features does k8s have as an orchestration system?

* Service discovery and load balancing
* Storage orchestration
* Automated rollouts and rollbacks
* Automatic bin packing
* Self-healing
* Secret and configuration management
* Batch execution
* Horizontal scaling
* IPv4/IPv6 dual-stack
* Designed for extensibility

### What are Objects in k8s?

Kubernetes objects are persistent entities in the Kubernetes system.
Kubernetes uses these entities to represent the state of your cluster.

* What containerized applications are running
* The resources available to those applications
* The policies around how those applications behave

A Kubernetes object (cluster's desired state) is a "record of intent" -- once you create the object, the Kubernetes system will constantly work to ensure that the object exists.

### How many layers in k8s?

K8s concepts can be divided into 6 layers:

1. control plane
2. data plane
3. application layer
4. networking layer
5. storage layer
6. security layer

### What is Control Plane?

The container orchestration layer that exposes the API and interfaces to define, deploy and manage the lifecycle of containers.

The control plane manages the worker nodes and the Pods in the cluster.
The control plane concepts include things like pods, services and deployments.
The control plane is responsible for managing the cluster.
The control plane's components make global decisions about the cluster.

### What is Data Plane?

The data plane concepts include things like volumes and secrets.

### What is application layer?

The application layer concepts include things like ingress and egress.

### What is networking layer?

The networking layer concepts include things like network policies and load balancers.

### What is storage layer?

The storage layer concepts include things like persistent volumes and PVCs.

### What is security layer?

The security layer concepts include things like RBAC and TLS certificates.

### What are components of a control plane?

* kube-apiserver
* etcd
* kube-scheduler
* kube-controller-manager
* cloud-controller-manager (optional)

### What is the kube-apiserver?

The API server is a component of the Kubernetes control plane that exposes the Kubernetes API.
The API server is the front end for the Kubernetes control plane.

The kube-apiserver is designed to scale horizontally—that is, it scales by deploying more instances. You can run several instances of kube-apiserver and balance traffic between those instances.

### What is the etcd?

The etcd is an open source reliable distributed key-value store used to hold and manage the critical information that distributed systems need to keep running. Most notably, it manages the configuration data, state data, and metadata for Kubernetes.

etcd is a consistent and highly-available key value store used as Kubernetes' backing store for all cluster data.

Kubernetes stores the serialized state of objects by writing them into etcd.

etcd is a leader-based distributed system. Ensure that the leader periodically send heartbeats on time to all followers to keep the cluster stable.

### What is kube-scheduler?

The Kubernetes scheduler is a control plane process which assigns Pods to Nodes.

The scheduler determines which Nodes are valid placements for each Pod in the scheduling queue according to constraints and available resources.

### What is kube-controller-manager?

Control plane component that runs controller processes.

### What is cloud-controller-manager?

A Kubernetes control plane component that embeds cloud-specific control logic.
The cloud controller manager lets you link your cluster into your cloud provider's API, and separates out the components that interact with that cloud platform from components that only interact with your cluster.

### What are components of a Node?

Node components run on every node, maintaining running pods and providing the Kubernetes runtime environment.

* kubelet
* kube-proxy
* Container runtime

### How to add a Node to the API server?

There are two main ways to have Nodes added to the API server:

* The kubelet on a node self-registers to the control plane
* You (or another human user) manually add a Node object

### What is kubelet?

An agent that runs on each node in the cluster. It makes sure that containers are running in a Pod.
It can register the node with the apiserver.

The kubelet takes a set of PodSpecs and ensures that the containers described in those PodSpecs are running and healthy.

The kubelet performs garbage collection.

The kubelet connects to container runtime via CRI with the help of gRPC

Pods are only scheduled once in their lifetime. Once a Pod is scheduled (assigned) to a Node, the Pod runs on that Node until it stops or is terminated.

Pods are relatively ephemeral/disposable (rather than durable) entities.

#### What is PodSpec?

A PodSpec is a YAML or JSON object that describes a pod.

#### What Pod phases do you know?

A pod has a field `status` which is PodStatus object, this object has a phase field, which can be one of:

* Pending
* Running
* Succeeded
* Failed
* Unknown

The Terminating status is not one of the Pod phases.
A Pod is granted a term to terminate gracefully, which defaults to 30 seconds.

#### What are the container states?

* Waiting
* Running
* Terminated

### What container ignore restartPolicy?

The Sidecar containers ignore the Pod-level restartPolicy field.

The app containers and init containers does not ignore it.

A Pod Template in a DaemonSet must have a RestartPolicy equal to Always, or be unspecified, which defaults to Always.

### What values can restartPolicy accept?

* Always: Automatically restarts the container after any termination.
* OnFailure: Only restarts the container if it exits with an error (non-zero exit status).
* Never: Does not automatically restart the terminated container.

### What is kube-proxy?

kube-proxy is a network proxy that runs on each node in your cluster, implementing part of the Kubernetes Service concept.

kube-proxy maintains network rules on nodes.

### What is Container runtime?

A fundamental component that empowers Kubernetes to run containers effectively.
It is responsible for managing the execution and lifecycle of containers within the Kubernetes environment.

### What is kubectl

The kubectl command-line tool that supports several different ways to create and manage Kubernetes objects.

The common format of a kubectl command is:

```sh
kubectl <action> <resource>
```

### What is k8s cluster?

A Kubernetes cluster consists of two types of resources:

* The Control Plane coordinates the cluster
* Nodes are the workers that run applications, workers are connected to work as a single unit

Cluster: A set of Nodes that run containerized applications managed by Kubernetes. For this example, and in most common Kubernetes deployments, nodes in the cluster are not part of the public internet.

### What is a Node?

A Node is a VM or a physical computer that serves as a worker machine in a Kubernetes cluster.

Every Node runs at least:

* kubelet (a process responsible for communication between the Kubernetes control plane and the Node; it manages the Pods and the containers running on a machine)
* A container runtime (responsible for pulling the container image from a registry, unpacking the container, and running the application.)
* kube-proxy

### What is a Deployment?

Deployment is an object that manages a replicated application by running pods with no local state.

Once the application instances are created, a Kubernetes Deployment controller continuously monitors those instances. This provides a self-healing mechanism to address machine failure or maintenance.

The `pod-template-hash` label is added by the Deployment controller to every ReplicaSet that a Deployment creates or adopts.

Deployments can be rollout, rollback, pause and resume

Deployment statuses:

Progressing (type: Progressing, status: True, reason: \<DIFFERENT-REASONS>)
Complete    (type: Progressing, status: True, reason: NewReplicaSetAvailable)
Failed      (type: Progressing, status: False, reason: \<DIFFERENT-REASONS>)

#### What are Deployment strategy types?

* Recreate
* RollingUpdate (default)

#### What Deployment strategies can be implemented in k8s?

* Recreate
  * The Recreate strategy involves shutting down all existing Pods and then creating new Pods. This method is simple but causes downtime, as there will be a period when no Pods are running.
* RollingUpdate
  * The RollingUpdate strategy updates Pods incrementally, ensuring that some Pods remain available during the update process. It gradually replaces old Pods with new ones.
* Blue-Green Deployment
  * Blue-Green deployment is not a built-in Kubernetes strategy but can be implemented using Kubernetes resources. It involves running two identical environments, Blue and Green. Traffic is initially directed to the Blue environment. When deploying a new version, the Green environment is updated, tested, and then traffic is switched to Green.
* Canary Deployment
  * Canary deployment involves gradually rolling out the new version to a small subset of users before rolling it out to the entire user base. This allows monitoring and verifying the new version's performance on a small scale before full deployment.
  * Use multiple Deployments and Services to control traffic to different versions.
* A/B Testing
  * A/B testing is a method where different versions of the application (A and B) are deployed simultaneously, and traffic is split between them to compare performance and user experience.
  * Use Ingress or Service configurations to route traffic based on specified rules or conditions.

### What is StatefulSets?

StatefulSet is the workload API object used to manage stateful applications. It manages the deployment and scaling of a set of Pods, and provides guarantees about the ordering and uniqueness of these Pods.

Unlike a Deployment, a StatefulSet maintains a sticky identity for each of its Pods. These pods are created from the same spec, but are not interchangeable: each has a persistent identifier that it maintains across any rescheduling.

The StatefulSets are used when it's required one of the following:

* Stable, unique network identifiers.
* Stable, persistent storage.
* Ordered, graceful deployment and scaling.
* Ordered, automated rolling updates.

How it looks:

* Ordinal Index: pods are suffixed with `-number` (it starts from 0 up through N-1 but the start can be configured)
* Stable Network ID:
  * Pod name / Pod hostname:
    `$(statefulset name)-$(ordinal)`, for example,
    `web-0`
  * Service domain name / StatefulSet domain name:
    `$(service name).$(namespace).svc.cluster.local`, where "cluster.local" is the cluster domain, for example,
    `nginx.default.svc.cluster.local`
  * Pod subdomain:
    `$(podname).$(governing service domain)`, for example,
    `web-0.nginx`
  * Pod domain:
    `web-0.nginx.default.svc.cluster.local`
* Stable Storage: each Pod receives one PersistentVolumeClaim
Note that, the PersistentVolumes associated with the Pods' PersistentVolume Claims are not deleted when the Pods, or StatefulSet are deleted. You can configure PersistentVolumeClaim retention.
* Pods have `apps.kubernetes.io/pod-index` label

Some limitations:

* uses persistent volumes or pre-provisioned by an admin
* StatefulSets currently require a Headless Service to be responsible for the network identity of the Pods
* StatefulSets do not provide any guarantees on the termination of pods when a StatefulSet is deleted. To get around that you can scale down to 0 prior to deletion.
* when you use Rolling Updates with `OrderedReady` (Pod Management Policy) and want to update to a configuration that never becomes running, the StatefulSet will stop the rollout and wait but when you revert the changes nothing happens until you remove old broken pods (it's a known issue)

### What is a DaemonSet?

A DaemonSet ensures that all (or some) Nodes run a copy of a Pod.

Typical uses of a DaemonSet are:

* running a cluster storage daemon on every node
* running a logs collection daemon on every node
* running a node monitoring daemon on every node

### What is a Job?

A Job creates one or more Pods and will continue to retry execution of the Pods until a specified number of them successfully terminate.

#### What are types of Job?

* fixed completion count Job
  you need to set `.spec.completions` (default to 1)
* work queue Job
  you need to set `.spec.parallelism` (default to 1)

### What is a Pod?

A Pod is a group of one or more application containers (such as Docker) and includes

* shared storage (volumes)
* network resources (IP address and other)
* information about how to run them (specification).

The containers in a Pod share an IP Address and port space, are always co-located and co-scheduled, and run in a shared context on the same Node.
The shared context of a Pod is a set of Linux namespaces, cgroups, and potentially other facets of isolation - the same things that isolate a container.
Each Pod is meant to run a single instance of a given application.
Pods are designed as relatively ephemeral, disposable entities.
A Pod is not a process, but an environment for running container(s).
The name of a Pod should follow [DNS label](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names).

Pods are designed to support multiple cooperating processes (as containers) that form a cohesive unit of service.

Pods have some environment variables:

* HOSTNAME - the name of a Pod

### What are PodTemplates?

PodTemplates are specifications for creating Pods, and are included in workload resources such as Deployments, Jobs, and DaemonSets.

Each workload resource implements its own rules for handling changes to the Pod template.

### What is securityContext?

The `securityContext` is a field in the Pod specification that sets security constraints on Pods and containers.

### What is Static Pod?

Static Pods are managed directly by the kubelet daemon on a specific node, without the API server observing them.

The main use for static Pods is to run a self-hosted control plane: in other words, using the kubelet to supervise the individual control plane components.

The kubelet automatically tries to create a mirror Pod (a pod object that a kubelet uses to represent a static pod) on the Kubernetes API server for each static Pod.
Static Pods do not depend on the apiserver, making them useful in cluster bootstrapping cases.

### What are init containers?

The init containers are containers, which are run before the app containers are started.

Init containers do not support lifecycle, livenessProbe, readinessProbe, or startupProbe fields.

Example use cases:

* using a shell one-line command, for example, wait for a Service to be created
* copy git repository into a Volume
* generate configuration files for the main container

### What are Sidecar containers?

Sidecar containers are the secondary containers that run along with the main application container within the same Pod.

These containers are used to enhance or to extend the functionality of the primary app container by providing additional services, or functionality such as logging, monitoring, security, or data synchronization, without directly altering the primary application code.

Sidecar containers can be defined as `spec.initContainers with` `spec.initContainers.restartPolicy: Always` or `spec.SidecarContainers` (the feature is active by default since Kubernetes v1.29)

### What are Ephemeral containers?

Ephemeral containers differ from other containers in that they lack guarantees for resources or execution, and they will never be automatically restarted, so they are not appropriate for building applications.

### What are Pod Disruption Budgets?

Pod Disruption Budgets (PDBs) are a Kubernetes feature designed to ensure the stability and availability of your applications during voluntary (expected) disruptions, such as node maintenance, scaling events, or updates. They define the minimum number of replicas of a Pod that must be up and running at any given time, thereby preventing too many Pods from being disrupted simultaneously. This helps maintain the application's required level of availability and performance.

### What is a probe?

A probe is a diagnostic performed periodically by the kubelet on a container.

#### What are probe check mechanisms?

* exec
* grpc
* httpGet
* tcpSocket

Each probe has one of three results:

* Success
* Failure
* Unknown

#### What are types of probe?

* livenessProbe
  Indicates whether the container is running.
  If a liveness probe fails, Kubernetes will restart the container.
  * if you'd like your container to be killed and restarted if a probe fails
  * it can be used for long-running processes that may occasionally fail
* readinessProbe
  Indicates whether the container is ready to respond to requests.
  If a readiness probe fails, the endpoints controller will remove the pod from the list of endpoints for the service, thus stopping traffic from being sent to it.
  * if this probe is present it means that the Pod will start without receiving any traffic and only start receiving traffic after the probe starts succeeding
  * can be configured with livenessProbe (livenessProbe will check if app is running) to make sure the backend is responding as well
  * Graceful Rollouts: Ensures that traffic is only sent to pods that are fully initialized and ready to handle requests, which is useful during rolling updates.
* startupProbe
  Indicates whether the application within the container is started.
  All other probes are disabled if a startup probe is provided, until it succeeds
  * in case loading large data, configuration files, or migrations during startup

### What is going on when Pod termination happen?

1. The Pod in the API server is updated with the time beyond which the Pod is considered "dead" along with the grace period. Terminating status will be seen.

2. kubelet starts local terminating
    1. kubelet runs preStop hook if `terminationGracePeriodSeconds` is not set to 0
    If hook runs more then `terminationGracePeriodSeconds` the kubelet request 2 seconds one-off grace period
    2. The kubelet triggers the container runtime to send a TERM signal to process 1 inside each container
3. control plane evaluates whether to remove that shutting-down Pod from EndpointSlice (and Endpoints) objects

### What is a Workload?

A workload is an application running on Kubernetes. Whether your workload is a single component or several that work together, on Kubernetes you run it inside a set of pods.

Kubernetes runs your workload by placing containers into Pods to run on Nodes.
Each node is managed by the control plane and contains the services necessary to run Pods.

### What are workload resources and what of them do you know?

Workload resources manage a set of pods on your behalf.
These resources configure controllers that make sure the right number of the right kind of pod are running, to match the state you specified.

* ReplicationController
* ReplicaSet (the next-generation ReplicationController that supports the new set-based label selector)
* Deployment
* StatefulSet
* DaemonSet
* Job
* CronJob

### What is Deployment?

Deployment is a good fit for managing a stateless application workload on your cluster, where any Pod in the Deployment is interchangeable and can be replaced if needed.

You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate.

### What is ReplicaSet?

A ReplicaSet ensures that a specified number of pod replicas are running at any given time.
ReplicaSets do not support a rolling update directly.

To isolating Pods from a ReplicaSet you can change their labels. This technique may be used to remove Pods from service for debugging, data recovery, etc.

### What are Controllers?

A control loop is a non-terminating loop that regulates the state of a system.

Controllers make sure the right number of the right kind of pod are running, to match the state you specified.

In Kubernetes, controllers are control loops that watch the state of your cluster, then make or request changes where needed. Each controller tries to move the current cluster state closer to the desired state.

For example, the Job controller does not run any Pods or containers itself. Instead, the Job controller tells the API server to create or remove Pods

### What does `kubectl cordon <NODE>` do?

It marks a node as unschedulable

### What does `Draining` mean in k8s?

Draining in Kubernetes refers to the process of gracefully evicting pods from a node to prepare it for maintenance, node scaling, or decommissioning.

### What handy commands do you have on your list?

```sh
kubectl auth whoami  # check self subject attributes
kubectl auth can-i get pods  # am I allowed to do an action or not
kubectl api-resources  # a list of the API resources that are available
kubectl explain pod  # get documentation of a resource type
kubectl exec -it "$POD_NAME" -- bash  # start a bash session in the Pod’s container
kubectl get pod -o wide
kubectl rollout status deployments/"$DEPLOYMENT_NAME"
kubectl rollout status deployments/"$DEPLOYMENT_NAME" --watch=true
```

### What are Labels?

Labels are key/value pairs attached to objects and can be used in any number of ways:

* Designate objects for development, test, and production
* Embed version tags
* Classify an object using tags

#### Syntax

[optional prefix]/name

The `optional prefix` must be a DNS subdomain using:

* `[a-z0-9A-Z]`
* `-`, `_`, `.`
* not longer than `253` characters in total

The `name`

* `[a-z0-9A-Z]`
* `-`, `_`, `.`
* `63` characters or less (can be empty)

### What are Selectors?

A Selector is a String expression that can be used to filter objects based on the value of specific fields. It is also called label query.

The command options are `-l` and `--selector`.

There are 2 types of Selectors:

* equality-based
  * environment=production
  * environment==production
  * tier!=frontend
* set-based
  * environment in (production, qa)
  * tier notin (frontend, backend)
  * partition
  * !partition

A label selector can be made of multiple requirements which are comma-separated.
The comma separator acts as a logical AND (&&) operator. There is no logical OR (||) operator.

### What are Annotations?

Kubernetes annotations are used to attach arbitrary non-identifying metadata to objects.
Annotations, like labels, are key/value maps. The keys and the values in the map must be strings.

Annotations can include:

* Fields managed by a declarative configuration layer
* Build, release, or image information (timestamps, release IDs, git branch, PR numbers, hashes...)

* Pointers to logging, monitoring, analytics
* Lightweight rollout tool metadata: for example, config or checkpoints
* Phone or pager numbers of persons responsible

#### Annotations Syntax

The syntax rules are the same as for Labels.

### What are Field selectors?

Field selectors let you select Kubernetes objects based on the value of one or more resource fields.

[There is a list of supported fields](https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/#list-of-supported-fields)

#### Field selectors syntax

Field selectors support equality-based type/conditions
Set-based operators are not supported

```sh
kubectl get services  --all-namespaces --field-selector metadata.namespace!=default
```

### What are Namespaces?

Namespaces provide a mechanism for isolating groups of resources within a single cluster.
Names of resources need to be unique within a namespace, but not across namespaces.

### How does ExternalName Service work?

[https://www.kubecost.com/kubernetes-best-practices/kubernetes-external-service/]
???

### What is rolling update?

it's about incrementally replacing the current Pods/replicas/app-instances with new ones.
???

### How to use previous deployment versions?

???

### What types of updates does k8s support?

???

### What exactly ImagePullBackOff mean?

The status `ImagePullBackOff` means that a container could not start because Kubernetes could not pull a container image (for reasons such as invalid image name, or pulling from a private registry without imagePullSecret).

### What ways of setting environment variables for a Docker container do you know?

* Dockerfile
* kubernetes.yml
* Kubernetes ConfigMaps
* Kubernetes Secrets

### What are Kubernetes ConfigMaps?

ConfigMaps are API Objects that store non-confidential key-value pairs.

A ConfigMap provides a way to inject configuration data into pods. The data stored in a ConfigMap can be referenced in a volume of type configMap and then consumed by containerized applications running in a pod. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.

A ConfigMap is always mounted as `readOnly`.

A container using a ConfigMap as a `subPath` volume mount will not receive ConfigMap updates.

### What are Kubernetes Secrets?

[https://kubernetes.io/docs/concepts/configuration/secret/]

Secrets are also used to store key-value pairs, they differ from ConfigMaps in that they're intended for confidential/sensitive information and are stored using Base64 encoding.

### What is the difference between configMap volume or a projected volume?

???

### What is port forwarding?

```sh
kubectl port-forward service/configmap-service 8080:8080 & # this stays running in the background
```

### NAMEs

Each object in your cluster has a Name that is unique for that type of resource.
Every Kubernetes object also has a UID that is unique across your whole cluster.

### What are Finalizers

Finalizers are namespaced keys that tell Kubernetes to wait until specific conditions are met before it fully deletes resources marked for deletion.

The target object remains in a terminating state while the control plane, or other components, take the actions defined by the finalizers.

`.metadata.deletionTimestamp` - time you started the deletion
`.metadata.finalizers` - list of Finalizers

#### Owner references

In some situations, finalizers can block the deletion of dependent objects, which can cause the targeted owner object to remain for longer than expected without being fully deleted.

### What are orphan objects?

When Kubernetes deletes an owner object, the dependents left behind are called orphan objects.

### What is Garbage Collection?

It's a mechanism that is used to clean up cluster resources
The kubelet performs garbage collection

* Terminated pods
* Completed Jobs
* Objects without owner references
* Unused containers and container images
* Node Lease objects
* etc

### What are Foreground cascading deletion and Background cascading deletion (default) and Orphan?

The GC deletes dependents first and then the owner (it enters a deletion in progress state) with help of `metadata.deletionTimestamp` and `foregroundDeletion` finalizer.

In background cascading deletion, the Kubernetes API server deletes the owner object immediately and the controller cleans up the dependent objects in the background.

### What are Addons?

Addons use Kubernetes resources (DaemonSet, Deployment, etc) to implement cluster features.

### Tell what you know about the `ImagePullSecrets`?

`ImagePullSecrets` is a Kubernetes concept used to authenticate and pull private container images from a container registry.

### What is k8s ServiceAccount?

???

### What is downwardAPI?

It's a way to expose Pod or/and container fields to a running container.
It can be done via Environment Variables (`spec.containers[n].env[n].valueFrom.fieldRef.fieldPath`) or files in a downwardAPI volume (`spec.volumes[n].downwardAPI...`)

### What is RuntimeClass resource?

RuntimeClass is a feature for selecting the container runtime configuration.
The container runtime configuration is used to run a Pod's containers.

The pod should have `runtimeClassName` field pointing to RuntimeClass object.
If no runtimeClassName is specified, the default RuntimeHandler will be used, which is equivalent to the behavior when the RuntimeClass feature is disabled.

### What are Container Lifecycle Hooks?

There are two hooks that are exposed to Containers:

* PostStart - This hook is executed immediately after a container is created.
* PreStop - This hook is called immediately before a container is terminated due to an API request or management event such as a liveness/startup probe failure, preemption, resource contention and others. A call to the PreStop hook fails if the container is already in a terminated or completed state

### What is `Node affinity`?

Affinity - a liking or sympathy for someone or something, especially because of shared characteristics.

Node affinity is a property of Pods that attracts them to a set of nodes (either as a preference or a hard requirement).

### What are Taints?

taint - the act or result of spoiling something or giving it an unpleasant quality.

Taints allow a node to repel a set of pods.
A taint is a characteristic of a Node.

`.spec.nodeName` for a Pod bypasses scheduler/taints

### What are Tolerations?

Tolerations are applied to pods. Tolerations allow the scheduler to schedule pods with matching taints.

Tolerations allow scheduling but don't guarantee scheduling: the scheduler also evaluates other parameters as part of its function.

### What is going on when a Node is not ready or unreachable?

`node.kubernetes.io/not-ready`   taint corresponds to the NodeCondition Ready=False
`node.kubernetes.io/unreachable` taint corresponds to the NodeCondition Ready=Unknown

When node is drained the `node.kubernetes.io/not-ready` and `node.kubernetes.io/unreachable` taints are added with `NoExecute` effect.

Kubernetes adds `node.kubernetes.io/not-ready` and `node.kubernetes.io/unreachable` tolerations with `tolerationSeconds=300` for node Pods that Pods remain bound to Nodes for 5 minutes after one of these problems is detected.

DaemonSet pods are created with `NoExecute` tolerations for the following taints with no `tolerationSeconds`:

* `node.kubernetes.io/unreachable`
* `node.kubernetes.io/not-ready`

This ensures that DaemonSet pods are never evicted due to these problems.

### What is Job?

Job is a Kubernetes resource that runs a Pod, or perhaps several Pods, to carry out a task and then stop.

### What is CronJob?

A CronJob creates Jobs on a repeating schedule.

CronJob is meant for performing regular scheduled actions such as backups, report generation, and so on.

The Jobs should be idempotent (applied multiple times without changing the result)

To suspend the job set `.spec.suspend: true`

#### How does CronJob syntax look like?

┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │                                   OR sun, mon, tue, wed, thu, fri, sat
│ │ │ │ │
│ │ │ │ │
* * * * *

### What are Leases?

Distributed systems often have a need for leases, which provide a mechanism to lock shared resources and coordinate activity between members of a set. In Kubernetes, the lease concept is represented by Lease objects in the `coordination.k8s.io` API Group.

Use cases:

* Node heartbeats
* Leader election
to discover how kube-apiserver instances are operating

#### What do you know about Node heartbeats?

For every Node , there is a Lease object with a matching name in the `kube-node-lease` namespace.
The kubelet heartbeat is an update request (every 10 sec) to this Lease object, updating the `spec.renewTime` field for the Lease object, via Kubernetes API server.

The Kubernetes control plane uses the time stamp of this field to determine the availability of this Node.

#### What do you know about Leader election?

Kubernetes also uses Leases to ensure only one instance of a component is running at any given time. This is used by control plane components like `kube-controller-manager` and `kube-scheduler` in HA configurations, where only one instance of the component should be actively running while the other instances are on stand-by.

### What is CRI?

CRI - Container Runtime Interface - is the main protocol for the communication between the kubelet and Container Runtime

### What is Service Mesh?

A service mesh is an infrastructure layer that enables managed, observable, and secure communication between microservices within a distributed application. It handles the complexity of service-to-service communication, including aspects like load balancing, traffic management, failure recovery, metrics collection, and security.

Most likely it uses `sidecar proxy` pattern.
Open-source project Istio implements it.

### What is HPA?

a Horizontal Pod Autoscaler/HorizontalPodAutoscaler (HPA) automatically updates a workload resource (such as a Deployment or StatefulSet), with the aim of automatically scaling the workload to match demand.

It is implemented as a Kubernetes API resource and a controller and periodically adjusts the number of replicas in a workload to match observed resource utilization such as CPU or memory usage.

### Service

nslookup web-0.nginx

### What is Headless Service?

It's used when when you don't need load-balancing and a single Service IP (for example, StatefulSet)

To get a Headless Service you need to set `.spec.clusterIP: None` and the `.spec.type` to `ClusterIP`.

The CNAME of the headless service points to SRV records (one for each Pod that is Running and Ready). The SRV records point to A record entries that contain the Pods' IP addresses.

_web._tcp.nginx.default.svc.cluster.local
          nginx.default.svc.cluster.local
          nginx.default
    web-1.nginx.default.svc.cluster.local

_web. - port name, you can get it from k8s service spec (spec.ports[*].port)
_tcp. - port protocol, you can get it from k8s service spec (spec.ports[*].protocol)
nginx. - service name, you can get it from k8s service spec (metadata.name)
default. - namespace, you can get it from k8s service spec (metadata.namespace)
svc.cluster.local. - svc seems permanent, cluster.local is cluster domain name

### What is Volume?

At its core, a volume is a directory, possibly with some data in it, which is accessible to the containers in a pod.

Ephemeral volume types have a lifetime of a pod
Persistent volumes exist beyond the lifetime of a pod

Volumes cannot mount within other volumes (but see Using subPath for a related mechanism). Also, a volume cannot contain a hard link to anything in a different volume.

### What is Persistent Volumes?

A PersistentVolume (PV) is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes.

PVs are volume plugins like Volumes, but have a lifecycle independent of any individual Pod that uses the PV.

### What is PersistentVolumeClaim?

A PersistentVolumeClaim (PVC) is a request for storage by a user.

### What is the difference between PV and PVC?

PVs are resources in the cluster. PVCs are requests for those resources and also act as claim checks to the resource.

A control loop in the control plane watches for new PVCs, finds a matching PV (if possible), and binds them together.
A PVC to PV binding is a one-to-one mapping, using a ClaimRef which is a bi-directional binding between the PersistentVolume and the PersistentVolumeClaim.

Pods use claims as volumes.

### What do you know about reclaim policy?

The reclaim policy for a PersistentVolume tells the cluster what to do with the volume after it has been released of its claim.

* Retain - manual reclamation
* Recycle (deprecated, use dynamic provisioning) - basic scrub (rm -rf /thevolume/*)
* Delete - delete the volume

### What are types of Persistent Volumes?

PersistentVolume types are implemented as plugins.

* csi - Container Storage Interface (CSI)
* fc - Fibre Channel (FC) storage
* hostPath - HostPath volume (for single node testing only; WILL NOT WORK in a multi-node cluster; consider using local volume instead)
* iscsi - iSCSI (SCSI over IP) storage. Internet Small Computer System Interface
* local - local storage devices mounted on nodes.
* nfs - Network File System (NFS) storage

### What are Per PersistentVolume accessModes?

ReadWriteOncePod - the volume can be mounted as read-write by a single Pod.
ReadWriteOnce    - the volume can be mounted as read-write by a single Node.
ReadWriteMany    - the volume can be mounted as read-write by many Nodes.
ReadOnlyMany     - the volume can be mounted as read-only by many Nodes.

### What is projected volume?

A projected volume maps several existing volume sources into the same directory.
a projected volume is a type of ephemeral volume that allows you to combine several other volume types into a single volume.

Currently, the following types of volume sources can be projected:

* secret
* downwardAPI
* configMap
* serviceAccountToken
* clusterTrustBundle

### What is ephemeral volume?

An ephemeral volume is a type of storage that exists only for the lifetime of the pod that uses it.

#### What are types of ephemeral volume?

* emptyDir
* configMap, downwardAPI, secret (are provided as local ephemeral storage) - inject different kinds of Kubernetes data into a Pod
* CSI ephemeral volumes (provided by third-party CSI storage drivers)
* generic ephemeral volumes

### What is Storage Class?

A StorageClass is a resource that provides a way to define different types of storage available in a cluster.

It allows administrators to describe the "classes" of storage they offer and gives users the ability to request different storage characteristics based on their needs, such as performance, availability, or cost.

Kubernetes itself is unopinionated about what classes represent.

### What is VolumeSnapshot?

A VolumeSnapshot represents a snapshot of a volume on a storage system.

A VolumeSnapshot is a request for snapshot of a volume by a user. It is similar to a PersistentVolumeClaim.

### What is VolumeSnapshotContent?

A VolumeSnapshotContent is a snapshot taken from a volume in the cluster that has been provisioned by an administrator.

It is a resource in the cluster just like a PersistentVolume is a cluster resource.

### What is VolumeSnapshotClass?

VolumeSnapshotClass provides a way to describe the "classes" of storage when provisioning a volume snapshot.

### Are VolumeSnapshot and VolumeSnapshotContent available by default in a cluster?

No.

API Objects VolumeSnapshot, VolumeSnapshotContent, and VolumeSnapshotClass are CRDs, not part of the core API.

### Networking

Containers within a Pod share their network namespaces - including their IP address and MAC address. This means that containers within a Pod can all reach each other's ports on `localhost`.

There is the "IP-per-pod" model - containers within a Pod must coordinate port usage - this is no different from processes in a VM.

### What is Service?

A Service is a method for exposing a network application that is running as one or more Pods in your cluster.
The Service API, part of Kubernetes, is an abstraction to help you expose groups of Pods over a network. It defines a logical set of Pods and a policy by which to access them.
A Kubernetes Service that identifies a set of Pods using label selectors.

You use a Service to make set of Pods available on the network so that clients can interact with it.
Each Pod gets its own IP address (Kubernetes expects network plugins to ensure this).
The set of Pods targeted by a Service is usually determined by a selector that you define.

Services allow your applications to receive traffic.
Services are responsible for discovery and routing among dependent Pods (they match a set of Pods using labels and selectors)

The Service controller continuously scans for Pods that match its selector, and then makes any necessary updates to the set of EndpointSlices for the Service.

Services can be without selectors (you most likely should provide custom EndpointSlices object referencing this Service):

* You want to point your Service to a Service in a different Namespace or on another cluster.
* You are migrating a workload to Kubernetes. While evaluating the approach, you run only a portion of your backends in Kubernetes.

If you want to make sure that connections from a particular client are passed to the same Pod each time, you can configure session affinity based on the client's IP address.

### What are types of a Service?

`spec.type`

* ClusterIP (default) - it makes the Service reachable only from within the cluster
* NodePort - it exposes the Service on the same port of each selected Node in the cluster using NAT. It's a superset of ClusterIP. Default range is 30000-32767. Each node proxies that port (the same port number on every Node) into your Service.
* LoadBalancer - Creates an external load balancer in the current cloud (if supported) and assigns a fixed, external IP to the Service. Superset of NodePort.
* ExternalName - it maps the Service to a DNS name by setting `externalName` field
  Accessing ExternalName record works in the same way as other Services but with the crucial difference that redirection happens at the DNS level rather than via proxying or forwarding

### What is EndpointSlices

EndpointSlices are objects that represent a subset (a slice) of the backing network endpoints for a Service.

An Endpoints (the resource kind is plural) defines a list of network endpoints, typically referenced by a Service to define which Pods the traffic can be sent to.

EndpointSlice is a recommended replacement for Endpoints.

Endpoints object supports 1000 endpoints (Kubernetes truncates the data in the Endpoints object). The EndpointSlice does not have such a problem because a Service can be linked with more than one EndpointSlice

### What is Ingress?

Ingress exposes HTTP and HTTPS routes from outside the cluster to services within the cluster.
Traffic routing is controlled by rules defined on the Ingress resource.

An API object that manages external access to the services in a cluster, typically HTTP.
Ingress may provide load balancing, SSL termination and name-based virtual hosting.
Ingress typically serves HTTP/HTTPS traffic at the L7 layer.

Ingress is not a Service type, but it acts as the entry point for your cluster.
An Ingress lets you consolidate your routing rules into a single resource, so that you can expose multiple components of your workload, running separately in your cluster, behind a single listener.

### What is Ingress Controller?

An Ingress Controller in Kubernetes is a specialized load balancer for managing external access to the services within a Kubernetes cluster.

An Ingress Controller is typically deployed as a set of pods within the Kubernetes cluster, often with a LoadBalancer service type to expose it externally.

### What is NetworkPolicy?

NetworkPolicy controls traffic flow at the IP address or port level for TCP, UDP, and SCTP protocols.
NetworkPolicies apply to a connection with a pod on one or both ends, and are not relevant to other connections.

The entities that a Pod can communicate with:

* Other pods that are allowed (exception: a pod cannot block access to itself) (selectors are used)
* Namespaces that are allowed (selectors are used)
* IP blocks (exception: traffic to and from the node where a Pod is running is always allowed, regardless of the IP address of the Pod or the node) (IP blocks/CIDR ranges are used)

By default, a pod is non-isolated for egress; all outbound connections are allowed.
By default, a pod is non-isolated for ingress; all inbound connections are allowed.
Reply traffic for those allowed connections will also be implicitly allowed.

Policies are additive, Network policies do not conflict. Thus, order of evaluation does not affect the policy result.

Source pod should have egress policy and destination pod should have ingress policy.

NetworkPolicy is defined for layer 4 connections (TCP, UDP, and optionally SCTP).

When a deny all network policy is defined, it is only guaranteed to deny TCP, UDP and SCTP connections. It means ICMP protocol is allowed.

### DNS

Each pod has /etc/resolv.conf

data DNS query is expanded to data.<namesapce>.svc.cluster.local (check /etc/resolv.conf)

### What objects get DNS records?

* Services
  * A/AAAA records in form
  `my-svc.my-namespace.svc.cluster-domain.example`
  * SRV Records for named ports of normal or headless services in form
  `_port-name._port-protocol.my-svc.my-namespace.svc.cluster-domain.example`
* Pods
  * A/AAAA records

### What is IPv4/IPv6 dual-stack?

IPv4/IPv6 dual-stack networking enables the allocation of both IPv4 and IPv6 addresses to Pods and Services.

### What is Topology Aware Routing?

Topology Aware Routing adjusts routing behavior to prefer keeping traffic in the zone it originated from. In some cases this can help reduce costs or improve network performance.

When calculating the endpoints for a Service, the EndpointSlice controller considers the topology (region and zone) of each endpoint and populates the hints field to allocate it to a zone.

Topology Aware Routing provides a mechanism to help keep traffic within the zone it originated from.

The EndpointSlice controller is responsible for setting hints on EndpointSlices.

### What is Affinity?

Affinity specifies rules for pod placement that encourage certain behaviors.

There are:

* Node Affinity
  It functions like the `nodeSelector` field but is more expressive and allows you to specify soft rules.
* Pod Affinity
  It allows you to constrain Pods against labels on other Pods.

### What is ServiceAccount?

A service account is a type of non-human account that, in Kubernetes, provides a distinct identity in a Kubernetes cluster.

Application Pods, system components, and entities inside and outside the cluster can use a specific ServiceAccount's credentials to identify as that ServiceAccount.

The `default` service accounts in each namespace get no permissions by default other than the default API discovery permissions that Kubernetes grants to all authenticated principals if role-based access control (RBAC) is enabled.

You create a role, which grants access, and then bind the role to your ServiceAccount.
ServiceAccount uses authorization mechanism such as RBAC.

### What is the difference between Service Account and User Account?

Service accounts are different from user accounts, which are authenticated human users in the cluster. By default, user accounts don't exist in the Kubernetes API server (at least one `default` Service Account exists).
