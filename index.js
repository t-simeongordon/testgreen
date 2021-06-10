const { getAllTopics } = require('./controllers/categorization.controller')

exports.handler = async (event, context) =>{
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(event.body));
  let result = null;
  try {
    console.log('index get all topics');
    result = await getAllTopics(event);

    // TODO error handling
    if(result){
      console.log(`result: ${JSON.stringify(result)}`);
      return result
    }else{
      return 'message: nothing was recieved'
    }
  }catch(e){
    console.log(`error: ${e}`)
    return e
  }
}