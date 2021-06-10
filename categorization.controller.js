const uuid4 = require('uuid4');

const { getFile } = require('../services/s3.service');
const { getRetrospectivesData } = require('../services/confluence.service');
const { getTextAnalysisLayer1, getTextAnalysisLayer1Mock, getTextAnalysisLayer2Mock } = require('../services/text.classification.service');

const prepareConfluenceData = async(retroPayload) =>{
  const tmpArr = []
  const retro = retroPayload.map((data)=>{
    data.retroList
    return data.retroList
  })

  for(const[i,value] of retroPayload.entries()){
    tmpArr.push(...retro[i])
  }

  console.log(`prepare data for classification model: ${tmpArr}`);
return tmpArr;
}

const prepareConfluenceDates = (retroContent) =>{
  const tmpArr = []
  for(let[i,value] of retroContent.entries()){
    if(value.retroDate){
     for(i=0; i<value.retroList.length;i++){
          tmpArr.push(value.retroDate);
     }
    }
  }
  return tmpArr;
}

const getAllTopics = async (event) => {
  console.log('Get all topics');

  if(event.body.version && event.body.version==='prod'){
    console.log('Attempting to retrieve text analysis');
    console.log(`Calling confluence service for retrospectives`);
    const retroContent = [{"retroTopic":"What should we have done better?","retroDate":"25 Feb 2020","retroList":["Drip feeding items through for review","Communicating clearly and early if a task is not achievable in a sprint","Articulating what we need now from the POs and what we need in the future to enable our delivery","Collaboration between technical and functional team members"]},{"retroTopic":"What should we have done better?","retroDate":"03 Mar 2020","retroList":["There are multiple outstanding queries due to limited involvement by TCS. Need increased input from that side","Identified a need to record decisions in order to improve traceability","Concern expressed regarding the scale-up and how stakeholders time can be utilised across both teams","Concerns expressed regarding the ready for PO Column in JIRA due to limited availability of Product Owner. Suggestions made to remove column temporarily","Working in isolation highlighted as an area of potential concern. Was unavoidable in the current sprint given the nature of the tasks. Greater effort to be made in the future to avoid repetition","Reviewing process needs to be more robust","Easier access to the dev environment would be beneficial","Need to utilise seniors time in a more efficient manner"]}];
    // const retroData = await prepareConfluenceData(retroContent);
    console.log(`Calling service for text analysis: ${JSON.stringify(retroContent)} \n`);
    // return await prepareConfluenceData(retroContent);
    // return await getTextAnalysisLayer1(retroData);

    const retroData = await prepareConfluenceData(retroContent);
    const layer1 = await getTextAnalysisLayer1(retroData);
    const layer2 = await getTextAnalysisLayer2(retroData);
    return await transformData(layer1, layer2, retroContent);
  } else {
    console.log(`Attempting to retrieve mock data`);
    try{
      const retroContent = [{"retroTopic":"What should we have done better?","retroDate":"12 Dec 2019","retroList":["Communicating clearly and early if a task is not achievable in a sprint","Articulating what we need now from the POs and what we need in the future to enable our delivery","Collaboration between technical and functional team members"]},{"retroTopic":"What should we have done better?","retroDate":"17 Dec 2019","retroList":["There are multiple outstanding queries due to limited involvement by TCS. Need increased input from that side","Identified a need to record decisions in order to improve traceability","Concern expressed regarding the scale-up and how stakeholders time can be utilised across both teams","Concerns expressed regarding the ready for PO Column in JIRA due to limited availability of Product Owner. Suggestions made to remove column temporarily","Working in isolation highlighted as an area of potential concern. Was unavoidable in the current sprint given the nature of the tasks. Greater effort to be made in the future to avoid repetition","Reviewing process needs to be more robust","Easier access to the dev environment would be beneficial","Need to utilise seniors time in a more efficient manner"]},{"retroTopic":"What should we have done better?","retroDate":"07 Jan 2020","retroList":["Better communication and knowledge sharing between teams","Better use of stand-up session to ask questions, extract the information you need and support team members","Stand-up session could be more lively","Ask questions - don't wait for the information to come to you","Ownership of JIRA - everyone should update more regularly with progress and new backlog items","Estimation - should happen regularly and we should all be more vocal","Sprint planning - needed more urgency and collaboration","Ceremonies - retrospective should be after review","Better lines of communication with other DWP teams outside of teams remit","Testing approach needs to be rolled out","PO needs to be reviewing AC's","Maintenance of questions, dependencies and actions log"]},{"retroTopic":"What should we have done better?","retroDate":"14 Jan 2020","retroList":["More access to PO and SME","More organic communications","More engagement outside of our key area e.g. OED","Correct estimation of tasks","Update confluence more","Recording decisions better","No phones or laptops in meetings"]},{"retroTopic":"What should we have done better?","retroDate":"21 Jan 2020","retroList":["Waiting until last moment for planning"]},{"retroTopic":"What should we have done better?","retroDate":"28 Jan 2020","retroList":["Planning in advance","Meeting estimation","Bring less things in","Limited access to current environment","Stand ups have regressed to updates","Struggled with test environment set up","Keeping an eye on JIRA throughout the sprint, not just at the end"]},{"retroTopic":"What should we have done better?","retroDate":"04 Feb 2020","retroList":["Direction of the team has been a little unclear - \"Limbo","Only 1 Design team member - so unable to make any progress - \"lonely\"","Resourcing is an issue - still need 3+ members to complete the team - still waiting on resources from DWP pool.","Ill-defined scope - led to previous confusion around direction/tasks","Transition from Architect to PO's could have been smoother."]},{"retroTopic":"What should we have done better?","retroDate":"11 Feb 2020","retroList":["Allowed to be a little disrupted with direction/holidays etc ","Still need additional resources (QA/UX)"]},{"retroTopic":"What should we have done better?","retroDate":"18 Feb 2020","retroList":["Planning Sprints at the end","Procrastinating","Discovery Distracting Tech Refresh","Urgently escalating blockers","Qa Earlier","Sharing full picture","Finding better roots","User Stories","Backlog","Clear way forward tech refresh","Better graphs"]},{"retroTopic":"What should we have done better","retroDate":"25 Feb 2020","retroList":["Muddy water between online & options - more clarity about getting together for sessions and ceremonies  ","Clearer vision of direction - involvement of PO and a BA & DL  ","Need to be product focused rather than technical - need a new plan - strategic planning  ","More collaboration between devops  ","More focus on delivery "]},{"retroTopic":"What should we have done better","retroDate":"03 Mar 2020","retroList":["Over reliance on certain team members","Monitors!","link to existing test environment for IAM","More focus on task and sprint goals","Time limits in ceremonies","improve engagement with stakeholders"]}];
      const layer1 = await getTextAnalysisLayer1Mock();
      const layer2 = await getTextAnalysisLayer2Mock();
      return await transformData(layer1, layer2, retroContent);
    } catch (e) {
      console.log(`Attempting to retrieve mock data Error: ${e}`)
    }
  }
}

// Transform data 
const transformData = async (payloadLayer1, payloadLayer2, retroContent) =>{
  console.log('Attempting to transformData\n');
  let contract = {};
  const categoryName = retroContent[0].retroTopic;
  console.log(`categoryName: ${categoryName}\n\n`)
  const classifications = 'classifications'
  // get dates
  const datePast = prepareConfluenceDates(retroContent)
  contract[categoryName]=[];
  try{
  if(contract[categoryName]){
  for(const[i, value] of payloadLayer1.entries()){
     //Add dynamic key, value pairs to JavaScript array or hash table
     //TODO change to param for transformData FUNCTION
    let textClassification = {}
    textClassification['text']=value.text
    textClassification['external_id']=uuid4();
    textClassification['error']=value.error
    textClassification['date_past'] = datePast[i]
    textClassification['first_layer']=value.classifications
    contract[categoryName].push(textClassification)
    }
    for(const [i, layer1] of contract[categoryName].entries()){
        // const matches = payloadLayer2.filter(x => x.text === layer1.text);
        console.log(`@@layer1 exist: ${JSON.stringify(layer1)}`)
        const match = payloadLayer2.filter(x => x.text === layer1.text);
        console.log(`@@matches exist: ${JSON.stringify(match)}`)
        if(match!==[]){
          for(const [i,firstLayerVal] of layer1.first_layer.entries()){
            layer1.first_layer[i].second_layer = match[0].classifications;
            console.log(`@@match[0].second_layer: ${JSON.stringify(match[0].classifications)}`);
            console.log(`@@layer1: ${JSON.stringify(layer1)}`);
          }
         }else{
          for(const [i,firstLayerVal] of layer1.first_layer.entries()){
            layer1.first_layer[i].second_layer = [];
          }
         }
      }
    }
  }catch(e){
    console.log(`ERROR Category does not exist: ${e}`)
  }
  return contract;
}

module.exports = { getAllTopics };