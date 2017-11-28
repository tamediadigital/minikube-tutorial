const http = require('http');
const os = require("os");
var ifaces = os.networkInterfaces();

function getIPz(ifaces) {
	ret = ''
	Object.keys(ifaces).forEach(function (ifname) {
	  var alias = 0;

	  ifaces[ifname].forEach(function (iface) {
	    if ('IPv4' !== iface.family || iface.internal !== false) {
	      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
	      return;
	    }

	    if (alias >= 1) {
	      // this single interface has multiple ipv4 addresses
	      ret += ' | ' + ifname + ':' + alias + ' ' + iface.address
	    } else {
	      // this interface has only one ipv4 adress
	      ret += ' | ' + ifname + ' ' + iface.address
	    }
	    ++alias;
	  });
	});
	return ret	
}

const handleRequest = (request, response) => {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end('Hello from ' + os.hostname() + getIPz(os.networkInterfaces()));
};
const www = http.createServer(handleRequest);
www.listen(8080);
