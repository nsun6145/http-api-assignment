const http = require('http'); //pull in the http server module
const url = require('url'); //pull in the url module
//pull in the query string module
const query = require('querystring'); 
//pull in our html response handler file
const htmlHandler = require('./htmlResponses.js'); 
//pull in our json response handler file
const jsonHandler = require('./jsonResponses.js');


//set the port. process.env.PORT and NODE_PORT are for servers like heroku
const port = process.env.PORT || process.env.NODE_PORT || 3000;

//key:value object to look up URL routes to specific functions
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getStyle,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unAuth,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImp,
  'notFound': jsonHandler.notFound,
};

//handle HTTP requests. In node the HTTP server will automatically
//send this function request and pre-filled response objects.
const onRequest = (request, response) => {

  //parse the url using url module
  const parsedUrl = url.parse(request.url);
  
  //grab the query parameters (?key=value&key2=value2&etc=etc)
  const params = query.parse(parsedUrl.query);

  //check if the path name (the /name part of the url) matches 
  //any in our url object. If so call that function. If not, default to index.
  console.log(parsedUrl);
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
    
};

//start HTTP server 
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
