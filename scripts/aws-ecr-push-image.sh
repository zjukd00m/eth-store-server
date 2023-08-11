#!/bin/bash

docker_image=$1
repository_tag=$2

# Make sure the user has provided a docker image's name or hash as argument
[ -z "$docker_image" ] && echo "Provide an docker image name to be pushed into the registry" && exit 1

# Make sure the user has provided a repository tag
[ -z "$repository_tag" ] && echo "Provide a repository tag" && exit 1

# Parse and sort the existing AWS ECR registries (to push the docker image to)
repositories=$(aws ecr describe-repositories | jq -S ".repositories[0]")

[ -z "$repositories" ] && echo "There are no exiting repositories" && exit 1

repository_uri=$(echo "$repositories" | jq ".repositoryUri" | sed 's/"//g')
repository_name=$(echo "$repositories" | jq ".repositoryName" | sed 's/"//g')

# Validate the repository uri and name are not an empty string
[ -z "$repository_uri" ] && echo "Couldn't parse the aws repository url" && exit 1
[ -z "$repository_name" ] && echo "Couldn't parse the aws repository name" && exit 1

echo "$repository_uri"
echo "$repository_name"

# Use the AWS credentials to login into docker
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $(echo "$repository_uri" | cut -d '/' -f 1)

# Build the docker image if it's not already built
image_exists=$(docker images --format "{{.Repository}}" | grep "^$docker_image$")

if [ -z "$image_exists" ]; then
    echo "\nBuilding the image $docker_image"
    docker build -t "$docker_image" .
fi

# Tag the image
docker_image_tagged="$repository_uri:$repository_tag"

docker image tag "$docker_image" "$docker_image_tagged"

# Push the image into the AWS ECR registry
docker push "$docker_image_tagged"
