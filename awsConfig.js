const AWS = require('aws-sdk');
const dotEnv = require('dotenv');
dotEnv.config();
// const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env;
// let ACCESS_KEY_ID = '';
// let SECRET_ACCESS_KEY = ''
const getAwsService = (accessKey, secretAccessKey) =>{
  ACCESS_KEY_ID = 'AKIATKVYBZ2IXPEJCC6Q';
  SECRET_ACCESS_KEY = '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';
  return costExplorer
}

AWS.config.update({
  region: 'eu-west-2',
  credentials: {
    accessKeyId: 'AKIATKVYBZ2IXPEJCC6Q',
    secretAccessKey: '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',
  }
});
const docClient = new AWS.DynamoDB.DocumentClient({endpoint: 'https://dynamodb.eu-west-2.amazonaws.com'});
// const costExplorer = new AWS.CostExplorer({endpoint: 'https://ce.us-east-1.amazonaws.com'});
const costExplorer = new AWS.CostExplorer({region: 'us-east-1'});
var s3Client = new AWS.S3();

module.exports = { docClient, costExplorer, getAwsService, s3Client };