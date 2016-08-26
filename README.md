# api-gateway-starter
This repo is a starter project for using Terraform to boot-strap a serverless
endpoint backed by AWS Lambda and API Gateway.

## Before You Started
You'll need an AWS account. You can do a lot of cool stuff with AWS. Go get one.

[Homebrew](https://brew.sh) is a great way to install all the necessary
dependencies. I recommend installing it, and I'll use that as the tool for
installing the necessary dependencies. Once you've installed Homebrew,

1. `brew install terraform`
2. `brew install awscli`
3. Run `aws configure` and enter your access key, secret access key, default
region and default output (you can just go with the defaults for the last two)

## Deploying
1. `cd terraform`
2. `terraform plan -out myPlanFile`
3. `terraform apply myPlanFile`
4. `aws apigateway get-rest-apis --query "items[?name == 'MyChatbotAPI'].id"`
5. `curl -XPOST https://<ID_FROM_PREVIOUS_STEP>.execute-api.us-east-1.amazonaws.com/test/mychatbotresource`

## Notes
You **WILL** be billed for Lambda execution (although, in this example, it's
really not much). Pay attention to your billing. I can't be responsible if you
rack up a billion dollars in charges by executing your lambda continuously for
a year across 3000 instances.

## Reference
Many thanks to the following snippets for helping me figure this shiz out:
* [Terraform API Gateway Bug: JefState](https://gist.github.com/JefStat/7db907e52566ce59c575881a7c7c3467)
* [Writing a Facebook Messenger chatbot with AWS Lambda and Terraform by Matt Kimber](http://www.mattkimber.co.uk/writing-a-facebook-messenger-chatbot-with-aws-lambda-and-terraform/)
