'use strict'
// This file 
const AWS = require('aws-sdk')
const uuid = require('uuid')

const docClient = new AWS.DynamoDB.DocumentClient()
// an environment variable that is the name of the DynamoDB table 'groups'
const groupsTable = process.env.GROUPS_TABLE

exports.handler = async (event) => {
  console.log('Processing event: ', event)
  // create a new partition ID for the groups Table
  // uuid is a 3rd-party generator of UUIDs
  // A UUID is a 128-bit number used to identify info in computers.
  // Since the number has 128 hexadecimal bits, one uuid is considered 
  // a unique identifier for an object in any system where it is used. 
  // The chance of a collision is very small with such large numbers.
  // v4() is a function which generates a 'version 4 UUID'
  // which uses a random number. 
  const itemId = uuid.v4() // generate a random unique ID

  // parse the body of the request coming from Postman, because
  // it is a POST request with a new Item to be posted to the db table.
  const parsedBody = JSON.parse(event.body)
  // create a new Item for a DynamoDB table
  // Each new Item must have a partition ID
  // ...parsedBody is a way to include the whole body object 
  // as it is written
  const newItem = {
    id: itemId,
    ...parsedBody
  }
  // post the new Item in my groups table on DynamoDB
  await docClient.put({
    TableName: groupsTable,
    Item: newItem
  }).promise()

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      newItem
    })
  }
}
