# minikube tutorial (for mac osx)

## requirements
* [minikube](https://github.com/kubernetes/minikube/releases) - `brew install $(brew search minikube)`
* [kubectl](https://kubernetes.io/docs/user-guide/prereqs/) - `brew install kubernetes-cli`
* [jq](https://stedolan.github.io/jq/) - `brew install jq`

## general instructions
* git clone this tutorial and cd into it
* do not change the console tab, because some commands depend on local environment variables.

## install xhyve
`brew install docker-machine-driver-xhyve` - pay attention to instructions at the end of installation! (execute two sudo commands)

## check if minikube machine is started
`minikube status`

## delete old virtual minikube if not created with --insecure-registry option
`minikube stop ; minikube delete`

## start minikube virtual machine
`minikube start --cpus 4 --memory 4096 --vm-driver=xhyve`

## ping minikube VM to see if it is live
`ping $(minikube ip)`

## see if kubectl works correctly (repeat command untill all are READY x/x)
`kubectl get pods --all-namespaces`

## install docker registry on minikube
`minikube ssh 'docker run -d -p 5000:5000 --name registry registry:2'`

## setup environment variables
* `eval $(minikube docker-env)`
* `export KUBECONFIG=$(pwd)/kubeconfig`
* `env | grep -E 'DOCKER|KUBE'`

_____________________________________________________________________________________

## build and push docker image
* `docker build -t localhost:5000/tutorial/hellonode .`
* `docker push localhost:5000/tutorial/hellonode`

## create deployment and service
* `kubectl run hello --image=localhost:5000/tutorial/hellonode --port=8080` # port 8080 is from Dockerfile
* `kubectl expose deploy hello --port=80 --target-port=8080 --type=NodePort`

## check dashboard to make sure everything is ok
`minikube dashboard`

## get hellonode node port (load balancer services are not supported in minikube)
* `kubectl get services -o wide`
* `HELLO_PORT=$(kubectl get service/hello -o json | jq '.spec.ports[0].nodePort')`

## open service in your browser
* `open http://$(minikube ip):$HELLO_PORT`

