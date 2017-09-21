//function to send a json object
const respondJSON = (request, response, status, object) => {
  //set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  //Send the response to the client
  response.end();
};

const respondXML = (request,response,status,obj,acceptedTypes)=>{
  let responseXML = '<response>';
  //pass in responseJSON as obj
  responseXML =`${responseXML}<id>${obj.id}</id>`;
  responseXML = `${responseXML}<message>${obj.message}</message>`;
  responseXML = `${responseXML} </response>`;   
/*    
  //set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  //stringify the object (so it doesn't use references/pointers/etc)
  //but is instead a flat string object.
  //Then write it to the response.
  response.write(responseXML);
  //Send the response to the client
  response.end();
  */
};

//function to show a success status code
const success = (request, response) => {
  //message to send
  const responseJSON = {
    message: 'This is a successful response',
    id: 'success'
  };

  //send our json with a success status code
  respondJSON(request, response, 200, responseJSON);
};

//function to show a bad request without the correct parameters
const badRequest = (request, response, params,type) => {
  //message to send
  
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'badRequest'
  };
  
  if(!params.valid || params.valid !== 'true') {
    //set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    //give the error a consistent id 
    responseJSON.id = 'badRequest';
    //return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }
  
     return respondJSON(request, response, 200, responseJSON);
  
  
  /*
if(!params.valid || params.valid !== 'true') {
    //set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    //give the error a consistent id 
    responseJSON.id = 'badRequest';
    //return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }
  console.log(type);
  if (type == "text/xml" ){
        //call resond xml***************

  }
  else
    //if the request does not contain a valid=true query parameter
  //if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
  */
};

//function to show not found error
const notFound = (request, response) => {
  //error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  //return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

//Forbidden
const forbidden = (request, response) =>{
    const responseJSON ={
    message: 'You do not have access to this content.',
    id: 'forbidden',
    };
    respondJSON(request, response, 403, responseJSON);
};

//Not Implemented
const notImp = (request, response) =>{
    const responseJSON ={
    message: 'A get request for this page has not been implemented yet. Check back later',
    id: 'notImplemented',
    };
    respondJSON(request, response, 501, responseJSON);
};

//Internal Error
const internal = (request, response) =>{
    const responseJSON ={
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
    };
    respondJSON(request, response, 500, responseJSON);
};

//Unauthorized
const unAuth = (request, response,params) =>{
    const responseJSON ={
    message: 'You are authorized',
    id: 'unauthorized',
    };
  
     if(!params.loggedIn || params.loggedIn !== 'true') {
        //set our error message
        responseJSON.message = 'You are not authorized';
        //give the error a consistent id 
        responseJSON.id = 'Unauthorized';
        //return our json with a 400 bad request code
        return respondJSON(request, response, 401, responseJSON);
  }
    
    respondJSON(request, response, 200, responseJSON);
};


//exports to set functions to public.
//In this syntax, you can do getIndex:getIndex, but if they
//are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  notFound,
  forbidden,
  notImp,
unAuth,
  internal
};
