# Serverless Slackbot
[![Build Status](https://travis-ci.org/rhussmann/serverless-slackbot.svg?branch=master)](https://travis-ci.org/rhussmann/serverless-slackbot)

## Before You Get Started
You'll need an AWS account. You can do a lot of cool stuff with AWS. Go get one.

[Homebrew](https://brew.sh) is a great way to install all the necessary
dependencies. I recommend installing it, and I'll use that as the tool for
installing the necessary dependencies. Once you've installed Homebrew,

1. `brew install terraform`
2. `brew install awscli`
3. Run `aws configure` and enter your access key, secret access key, default
region and default output (you can just go with the defaults for the last two)

You'll need to setup a [Weather Underground](https://www.wunderground.com)
developer account and get an API key. I've created this project using the free
Cumulus developer level. This project currently fetches satellite imagery.

Copy the file `src/config.sample.json` to `src/config.json` and enter your API
key in the `weatherApiKey` field.

## Initial Infrastructure Deployment
1. `cd terraform`
2. `terraform plan -out myPlanFile`
3. `terraform apply myPlanFile`
4. `aws apigateway get-rest-apis --query "items[?name == 'MyChatbotAPI'].id"`
5. `curl -d "trigger_word=chatbot" -d "text=chatbot show services" https://<ID_FROM_PREVIOUS_STEP>.execute-api.us-east-1.amazonaws.com/test/mychatbotresource`

## Testing
1. `cd src`
2. `npm install`
3. `npm test`

Logging is disabled during testing. To enable logging,
run `SILENCE_BUNYAN=false npm test` instead of `npm test`.

## Deploying New Lambda Versions
1. `cd src`
2. `gulp`

## Notes
You **WILL** be billed for Lambda execution (although, in this example, it's
really not much). Pay attention to your billing. I can't be responsible if you
rack up a billion dollars in charges by executing your lambda continuously for
a year across 3000 instances.

## Reference
Many thanks to the following snippets for helping me figure this shiz out:
* [Terraform API Gateway Bug: JefState](https://gist.github.com/JefStat/7db907e52566ce59c575881a7c7c3467)
* [Writing a Facebook Messenger chatbot with AWS Lambda and Terraform by Matt Kimber](http://www.mattkimber.co.uk/writing-a-facebook-messenger-chatbot-with-aws-lambda-and-terraform/)
