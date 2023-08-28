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
resource "docker_network" "eth_store_network" {
  name       = "eth_store_network"
  attachable = true
}

resource "docker_image" "eth_store_db" {
  name         = "postgres:latest"
  keep_locally = true
}

resource "docker_container" "eth_store_db" {
  image    = docker_image.eth_store_db.image_id
  name     = "eth_store_db"
  hostname = "eth_store_db"
  rm       = true
  networks_advanced {
    name    = docker_network.eth_store_network.name
    aliases = ["eth_store_db"]
  }
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
    host_path      = var.postgres_volume_host_path
    read_only      = false
  }
}

resource "docker_image" "eth_store_server" {
  name         = "eth_store_server:latest"
  keep_locally = false
}

resource "docker_container" "eth_store_server" {
  image    = docker_image.eth_store_server.image_id
  name     = "eth_store_server"
  hostname = "eth_store_server"
  networks_advanced {
    name    = docker_network.eth_store_network.name
    aliases = ["eth_store_server"]
  }
  rm         = true
  depends_on = [docker_container.eth_store_db]
  ports {
    internal = var.eth_server_port
    external = var.eth_server_port
  }
  env = [
    "NODE_ENV=${var.node_env}",
    "ALCHEMY_API_KEY=${var.alchemy_api_key}",
    "TYPEORM_MIGRATION_SCHEMA=true",
    "ETH_SERVER_PORT=${var.eth_server_port}",
    "POSTGRES_URL=${var.POSTGRES_URL}"
  ]
}
