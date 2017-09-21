const fs = require('fs');  // pull in the file system module
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);


//function to handle the index page
const getIndex = (request, response) => {
  //set status code (200 success) and content type
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getStyle = (request, response) =>{
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.write(style);
    response.end();
};

//exports to set functions to public.
module.exports = {
  getIndex,
  getStyle
};
