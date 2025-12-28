resource "aws_apigatewayv2_api" "example" {
  name                       = "mikalai"
  protocol_type              = var.type
  # route_selection_expression = "$request.body.action"
  description = "some API Gateway description"
}
