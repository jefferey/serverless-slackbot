# Configure the AWS Provider
provider "aws" {
    region = "${var.region}"
}

resource "aws_lambda_permission" "allow_api_gateway_lambda" {
    statement_id = "AllowExecutionFromApiGateway"
    action = "lambda:InvokeFunction"
    function_name = "${aws_lambda_function.test_lambda.arn}"
    principal = "apigateway.amazonaws.com"
}

resource "aws_api_gateway_rest_api" "MyChatbotAPI" {
  name = "MyChatbotAPI"
  description = "An API for lambda chatbot services"
}

resource "aws_api_gateway_resource" "MyChatbotResource" {
  rest_api_id = "${aws_api_gateway_rest_api.MyChatbotAPI.id}"
  parent_id = "${aws_api_gateway_rest_api.MyChatbotAPI.root_resource_id}"
  path_part = "mychatbotresource"
}

resource "aws_api_gateway_method" "MyChatbotMethod" {
  rest_api_id = "${aws_api_gateway_rest_api.MyChatbotAPI.id}"
  resource_id = "${aws_api_gateway_resource.MyChatbotResource.id}"
  http_method = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "MyChatbotIntegration" {
  rest_api_id = "${aws_api_gateway_rest_api.MyChatbotAPI.id}"
  resource_id = "${aws_api_gateway_resource.MyChatbotResource.id}"
  http_method = "${aws_api_gateway_method.MyChatbotMethod.http_method}"
  integration_http_method  = "POST"
  type = "AWS"
  # Correct format is
  # "uri": "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:140106038064:function:lambda_function_name/invocations"
  uri="arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.test_lambda.arn}/invocations"
}

resource "aws_api_gateway_method_response" "200" {
  rest_api_id = "${aws_api_gateway_rest_api.MyChatbotAPI.id}"
  resource_id = "${aws_api_gateway_resource.MyChatbotResource.id}"
  http_method = "${aws_api_gateway_method.MyChatbotMethod.http_method}"
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "MyChatbotIntegrationResponse" {
  depends_on = ["aws_api_gateway_integration.MyChatbotIntegration"]
  rest_api_id = "${aws_api_gateway_rest_api.MyChatbotAPI.id}"
  resource_id = "${aws_api_gateway_resource.MyChatbotResource.id}"
  http_method = "${aws_api_gateway_method.MyChatbotMethod.http_method}"
  status_code = "${aws_api_gateway_method_response.200.status_code}"
  response_templates = {
    "application/json" = ""
  }
}

resource "aws_api_gateway_deployment" "MyDemoDeployment" {
  depends_on = ["aws_api_gateway_integration.MyChatbotIntegration"]

  rest_api_id = "${aws_api_gateway_rest_api.MyChatbotAPI.id}"
  stage_name = "test"
}
