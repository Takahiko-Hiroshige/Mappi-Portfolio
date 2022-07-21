# Laravel docker sample

## Introduction

Build laravel development environment with docker-compose and vscode remote-containers.

## Requirements

* [Docker](https://docs.docker.com/get-docker/)
* Docker-compose
* [Visual Studio Code](https://code.visualstudio.com/download)
* [Visual Studio Code Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Usage

1. Clone repository
1. Open Visual Studio Code
1. Remote-Containers: Reopen in container
1. Access `http://localhost:8000`

## Containers

### app container

* php:7-fpm
    * composer:latest
    * node:latest

### db container

* mysql:8

### web container

* nginx:alpine
