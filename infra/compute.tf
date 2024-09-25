# Create Lambda Function (code is deployed separately via GitHub Actions, using placeholder zip)
resource "aws_lambda_function" "ticketing_send_order_notification" {
  function_name = "ticketing-send-order-notification"
  role          = aws_iam_role.lambda_execution_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  filename         = "${path.module}/place-holders/lambda_placeholder.zip"
  source_code_hash = filebase64sha256("${path.module}/place-holders/lambda_placeholder.zip")
}
