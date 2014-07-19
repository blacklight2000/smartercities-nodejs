var sys = require('sys'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    index;
 
var json_file = './data.json';
var json_data;

fs.readFile(json_file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);
  json_data=data
  console.dir(data);
});

fs.readFile('./graphs.html', function (err, data) {
    if (err) {
        throw err;
    }
    index = data;
});


fs.readFile('./nyc-map.html', function (err, data) {
    if (err) {
        throw err;
    }
    index = data;
});

http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;

    if(path=="/data.json"){
      response.writeHeader(200,{'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
      response.end(JSON.stringify(json_data));
    }

   if(path=="/graphs.html"){
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(index);
    response.end();
   }

   if(path=="/nyc-map.html"){
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(index);
    response.end();
  }

}).listen(8000);
