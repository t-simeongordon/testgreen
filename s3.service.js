const { s3Client } = require('../utils/awsConfig');

module.exports.getFile = async (callback) =>{
  const params = {Bucket: 'delivery-improvement-bucket', Key: 'retro.json'};
  // const s3Promise = await s3Client.getObject(params).promise();
  // console.log(`s3 main return: ${JSON.stringify(s3Promise)}`);

//   s3Client.getObject({ Bucket: 'delivery-improvement-bucket', Key: 'retro.json' }, function(err, data)
// {
//     if (!err)
//         console.log(`S3 dta return: ${data.Body.toString()}`);
//         return data.Body.toString();
// });


const data = (await (s3Client.getObject(params).promise())).Body.toString('utf-8')

return data;

}