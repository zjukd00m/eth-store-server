terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

// Plugin to create and manage resources
provider "docker" {}

// Resources:
// - physical or virtual component: gcp vps server
// - logical: gpc cloud run app
resource "docker_image" "eth_store_db" {
  name         = "postgres:latest"
  keep_locally = false
}

resource "docker_container" "eth_store_db" {
  image = docker_image.eth_store_db.image_id
  name  = "eth_store_db"
  ports {
    internal = 5432
    external = var.postgres_port
  }
  env = [
    "POSTGRES_USER=${var.postgres_user}",
    "POSTGRES_PASSWORD=${var.postgres_password}",
    "POSTGRES_DB=${var.postgres_db}"
  ]
  volumes {
    volume_name    = "postgres_data"
    container_path = "/var/lib/postgresql/data"
    host_path      = var.pg_volume_host_path
    read_only      = false
  }
}

# TODO: Verify if this works and add the necessary environment variable values
# resource "docker_image" "eth_store_server" {
#   name         = "node:16-buster"
#   keep_locally = false
# }

# resource "docker_container" "eth_store_server" {
#   image = docker_image.node.image_id
#   name  = "eth_store_service"
#   ports {
#     internal = 8080
#     external = 8090
#   }
#   env = [
#     "NODE_ENV=dev",
#   ]
# }
