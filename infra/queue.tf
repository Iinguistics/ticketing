resource "aws_sqs_queue" "ticketing_send_order_notification" {
  name                    = "ticketing-send-order-notification"
  sqs_managed_sse_enabled = true
  message_retention_seconds = 86400
}

resource "aws_lambda_event_source_mapping" "send_order_notification_trigger" {
  event_source_arn = aws_sqs_queue.ticketing_send_order_notification.arn
  function_name    = aws_lambda_function.ticketing_send_order_notification.arn
  enabled          = true
}
