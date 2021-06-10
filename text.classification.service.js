const mockdata = require('../mocks/secondLayer.mock.json');
const request = require('request-promise');
const layer2Mock = require('../mocks/secondLayer.mock.json')
// MOCK - request mock data fro classification model
const getTextAnalysisLayer1Mock = async (params) => {
  console.log('Fetching text analysis results'); 
  const options = {
    method: 'GET',
    url: 'https://8b512c04-f4d7-49ac-879d-30e371d1fbbc.mock.pstmn.io/retro/mock',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
    body: {
      params,
    },
    json: true,
  };
  try {
    return await request(options, (err, res, body) => body);
  } catch (e) {
    return e;
  }
}

const getTextAnalysisLayer2Mock = async (params) => {
  return layer2Mock;
}

// make request to classification model
const getTextAnalysisLayer1 = async (data) => {
  console.log('Fetching text analysis results'); 
  const options = {
    method: 'POST',
    url: 'https://api.monkeylearn.com/v3/classifiers/cl_QYmt4yQz/classify/',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      Authorization: 'Token 4f670697cd5e681f7d9bf26c50b8c2c121d0c38c'
    },
    body: {
      data,
      // external_id:'ANY_ID',
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

const getTextAnalysisLayer2 = async (data) => {
  console.log('Fetching text analysis results'); 
  const options = {
    method: 'POST',
    url: 'https://api.monkeylearn.com/v3/classifiers/cl_QYmt4yQz/classify/',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      Authorization: 'Token 4f670697cd5e681f7d9bf26c50b8c2c121d0c38c'
    },
    body: {
      data,
      // external_id:'ANY_ID',
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

module.exports = { getTextAnalysisLayer1Mock, getTextAnalysisLayer2Mock, 
                  getTextAnalysisLayer1, getTextAnalysisLayer2 }