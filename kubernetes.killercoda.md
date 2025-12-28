# killercoda

## 10

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-account
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: app-role-cka
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: app-role-binding-cka
subjects:
- kind: ServiceAccount
  name: app-account
  apiGroup: ""
  namespace: default
roleRef:
  kind: ClusterRole
  name: app-role-cka
  apiGroup: rbac.authorization.k8s.io
```

## [https://killercoda.com/sachin/course/CKA/rollback]

Due to a missing feature in the current version. To resolve this issue, perform a rollback of the deployment redis-deployment to the previous version. After rolling back the deployment, save the image currently in use to the rolling-back-image.txt file, and finally increase the replica count to 3 ."

```bash
kubectl rollout history deploy
kubectl rollout undo deploy redis-deployment
kubectl get deploy redis-deployment -o jsonpath='{.spec.template.spec.containers[0].image}' > rollie.txtck-image
kubectl scale --replicas=3 deploy/redis-deployment
```

## [https://killercoda.com/sachin/course/CKA/deployment-secret]

Currently, the webapp-deployment is running with sensitive database environment variables directly embedded in the deployment YAML. To enhance security and protect the sensitive data, perform the following steps:

Create a Kubernetes Secret named db-secret with the below sensitive database environment variable values:
Key: DB_Host , Value: mysql-host
Key: DB_User , Value: root
Key: DB_Password , Value: dbpassword
Update the webapp-deployment to load the sensitive database environment variables from the newly created db-secret Secret.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  DB_Host: bXlzcWwtaG9zdA==
  DB_User: cm9vdA==
  DB_Password: ZGJwYXNzd29yZA==
```

kubectl get nodes –show-labels
kubectl edit pod redis-pod
kubectl replace -f /tmp/kubectl-edit-2018407739.yaml --force

systemctl status kubelet
systemctl restart kubelet
journalctl -u kubelet.service
