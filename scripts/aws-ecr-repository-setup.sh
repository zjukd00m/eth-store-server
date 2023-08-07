#!/bin/bash

REPOSITORY_NAME=$1

[ -z "$REPOSITORY_NAME" ] && echo "Missing repository name" && exit 1

aws ecr create-repository --repository-name "$REPOSITORY_NAME" --image-scanning-configuration scanOnPush=false --encryption-configuration encryptionType=AES256