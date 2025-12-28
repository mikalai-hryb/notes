variable "type" {
  description = "API Gateway type. Supported values are HTTP for now."
  type        = string
  default     = "HTTP"
  validation {
    condition     = contains(["HTTP"], var.type)
    error_message = "Only HTTP is supported for now."
  }
}
