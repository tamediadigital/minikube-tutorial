#!/bin/bash

rm kubeconfig
export KUBECONFIG=kubeconfig
minikube stop
minikube delete

minikube start --cpus 4 --memory 4096 --vm-driver=xhyve
minikube ssh 'docker run -d -p 5000:5000 --name registry registry:2'

echo "# Run this command to configure your shell:"
echo 'eval $(minikube docker-env) && export KUBECONFIG=$(pwd)/kubeconfig && env | grep -E "DOCKER|KUBE"'

