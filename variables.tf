variable "postgres_user" {
  type        = string
  description = "The postgresql user for the database"
  default     = "postgres"
}

variable "postgres_password" {
  type        = string
  description = "The postgresql user's password"
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
