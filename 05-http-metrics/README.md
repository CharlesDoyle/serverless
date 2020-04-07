http-metric is an AWS Lambda function we are writing for:
* Udacity Cloud Developer Nanodegree
* Course 05 Develop and Deploy a Serverless App
* Exercise 1: 05-HTTP-Metrics
    • Write a Lambda that does 'uptime monitoring'
        ◦ a Lambda that sends an HTTP request every minute and records the metrics for this request
        ◦ Metrics to record:
            ▪ if a request was successful or not
            ▪ time taken to execute the request


This function is pushed to AWS Lambda as a zip file
Two environment variables have to be set on the AWS site.
CloudWatch then has to be set up to send an event to http-metric every minute.
Each event fires the Lambda, which uses axios.get(url) to ping the url. 
The Lambda creates two CloudWatch MetricData metrics: "Success" and "Latency"
With each event, Success is either 1 or 0, with a 1 being if the url returns a 
fulfilled promise, or sends err to the catch{}.  Latency is a measurement of how long it
took in ms from an initial timestamp until the promise comes back and we make another timestamp.
To set up an event that reaches the http-metric Lambda every minute:
* AWS CloudWatch / Events / Get Started
    * Step 1: Create rule
        * Schedule, Fixed rate of 1 Minutes
        * Targets: Lambda function / http-metric
        click: Configure details
    * Step 2: Configure rule details
        * Name: http-metric-rule
          State: Enabled
        click: Create rule
    
To upload the zip file to AWS:
* create the zip file with 'npm run package'
* upload on Firefox browser, because Chrome blocks my uploads to AWS
     


