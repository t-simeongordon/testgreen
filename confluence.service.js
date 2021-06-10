const request = require('request-promise');
const baseUrl = 'https://atcgreenhouse.co.uk/staging/delivery-improvement-web-scraper';
const confluenceEndpoint = '/v1/deliveryimprovements/confluence/page';

// make request to classification model
const getRetrospectivesData = async () => {
  console.log('Fetching text analysis results'); 
  const options = {
    method: 'GET',
    url: `${baseUrl}${confluenceEndpoint}`,
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
    json: true,
  };
  console.log(options)
  try {
    return await request(options, (err, res, body) => body);
  } catch (e) {
    return e;
  }
}

module.exports = { getRetrospectivesData }

// const request = require('request-promise');
// // const baseUrl = 'http://localhost:3002';
// const baseUrl = 'https://atcgreenhouse.co.uk/staging/delivery-improvement-web-scraper';
// const confluenceEndpoint = '/v1/deliveryimprovements/confluence/page';

// const getRetrospectivesData = async () =>{
//   console.log('Fetching retrospectives from confluence');
//   const options = {
//     method:'GET',
//     url: `${baseUrl}${confluenceEndpoint}`,
//     headers:{
//       'cache-control':'no-cacshe',
//       'content-type':'application/json',
//     },
//     body:{},
//     timeout: 15000,
//     json: true,
//   }
//   try{
//     console.log(`options: \n ${JSON.stringify(options)}`);
//     return await request(options, (err, res, body) => body);
//   }catch(e){
//     console.log(`Error: request to conflence service failed ${e}`);
//     return e
//   }
// }

// // use its "timeout" event to abort the request
// request.on('timeout', () => {
//   request.abort();
// });

// module.exports = { getRetrospectivesData };