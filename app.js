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


http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;

    if(path=="/data.json"){
      response.writeHeader(200,{'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
      response.end(JSON.stringify(json_data));
    }

    if(path=="/bar-data0.csv"||path=="/bar-data1.csv"||path=="/bar-data2.csv"){
      response.writeHeader(200, {"Content-Type": "text/csv","Access-Control-Allow-Origin":"*"});
      response.write(index);
      response.end();
    }
}).listen(8000);
