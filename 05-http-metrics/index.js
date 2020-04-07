const AWS = require('aws-sdk')
const axios = require('axios')

// Define these environment variables on the AWS Lambda page for http-metric
// SERVICE_NAME is 'udacity-ping'
const serviceName = process.env.SERVICE_NAME
// URL of a service to ping, such as udacity.com
const url = process.env.URL

// CloudWatch client
const cloudwatch = new AWS.CloudWatch();

// This is the Lambda function
// We call it handler because that's the default name of a Lambda on AWS
exports.handler = async (event) => {
  let endTime
  let requestWasSuccessful

  const startTime = timeInMs()
  // Make the GET request to url using axios, and compute the values
  // of the Success (a boolean) and Latency (an int in ms)
  try {
    // make a request to this url
    // record whether the promise comes back fulfilled or not
    // and record the time in ms 
    await axios.get(url)
    requestWasSuccessful = true // if this line runs, get() didn't return an err
  } catch (e) {
    // if axios.get() throws an error, we end up in catch {}
    requestWasSuccessful = false
  } finally {
    endTime = timeInMs()
  }

  const totalTime = endTime - startTime

  // Define two metric data points, add the value of each, and push them to CloudWatch
  // Creates a putMetricData with 
  await cloudwatch.putMetricData({
    // define up to 20 data points for each call.  Here there are 2: Success, Latency
    MetricData: [
      {
        MetricName: 'Success',
        // A 'Dimension' further clarifies the data that the metric collects
        // It's like a tag to find the metric on CloudWatch
        // Both metrics will have 'ServiceName':'http-metrics'
        // Each Dimension is a name:value pair; Each Metric can have up to 10 Dimensions
        Dimensions: [
          {
            // Value will be 'http-metrics'
            Name: 'ServiceName',
            Value: serviceName
          }
        ],
        Unit: 'Count',
        Value: requestWasSuccessful ? 1 : 0 // set the value to 1 if requestWasSuccessful is true
      }
    ],
    Namespace: 'Udacity/Serverless'
  }).promise()

  await cloudwatch.putMetricData({
    // define up to 20 data points for each call.  Here there are 2: Success, Latency
    MetricData: [
      {
        MetricName: 'Latency',
        Dimensions: [
          {
            Name: 'ServiceName',
            Value: serviceName
          }
        ],
        Unit: 'Milliseconds',
        Value: totalTime
      }
    ],
    Namespace: 'Udacity/Serverless'
  }).promise()

}

function timeInMs() {
  return new Date().getTime()
}
