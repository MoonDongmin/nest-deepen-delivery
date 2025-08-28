#!/bin/bash

docker buildx build --platform linux/amd64,linux/arm64 -t moondongmin/dm-nestjs-gateway:latest -f ./apps/gateway/Dockerfile --target production --push .
docker buildx build --platform linux/amd64,linux/arm64 -t moondongmin/dm-nestjs-notification:latest -f ./apps/notification/Dockerfile --target production --push .
docker buildx build --platform linux/amd64,linux/arm64 -t moondongmin/dm-nestjs-order:latest -f ./apps/order/Dockerfile --target production --push .
docker buildx build --platform linux/amd64,linux/arm64 -t moondongmin/dm-nestjs-payment:latest -f ./apps/payment/Dockerfile --target production --push .
docker buildx build --platform linux/amd64,linux/arm64 -t moondongmin/dm-nestjs-product:latest -f ./apps/product/Dockerfile --target production --push .
docker buildx build --platform linux/amd64,linux/arm64 -t moondongmin/dm-nestjs-user:latest -f ./apps/user/Dockerfile --target production --push .
