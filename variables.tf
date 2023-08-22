# Postgresql variables
variable "postgres_user" {
  type        = string
  description = "The postgresql user for the database"
  default     = "postgres"
  sensitive   = true
}

variable "postgres_password" {
  type        = string
  description = "The postgresql user's password"
  sensitive   = true
}

variable "postgres_db" {
  type        = string
  description = "The postgresql database to connect to"
}

variable "postgres_port" {
  type        = number
  description = "The postgresql database port"
  default     = 5432
}

variable "postgres_host" {
  type        = string
  description = "The postgresql's host"
  default     = "localhost"
}

variable "postgres_volume_host_path" {
  type        = string
  description = "Path to the local directory for the volume to be mounted"
}

# Nest server variables 
variable "node_env" {
  type        = string
  description = "The server's environment"
  default     = "test"
}

variable "eth_server_port" {
  type        = number
  description = "The server's port where it will run"
  default     = 8080
}

variable "alchemy_api_key" {
  type        = string
  description = "Alchemy API key for sending requests to an ethereum node"
  sensitive   = true
}

variable "postgres_url" {
  type        = string
  description = "The postgresql URI connection to the database"
  sensitive   = true
}
