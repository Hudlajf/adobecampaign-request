Request = function(apiUrl) {
	this.setApiUrl(apiUrl);
}

/**
* Request helper object
* - ajax library
*
* Author: Luka Ločniškar
* Date: 1.8.2017
*
* USE:
* var req = Request("https://api...");
*     req.Get("method");
*/
Request.prototype = {
	apiUrl : null,
	http : null,
	header : {},

	setApiUrl: function(url) {
		this.apiUrl = url;
	},

/**
* If needed add key or token to the
* request header
*/
setHeader: function(key, value) {
	this.header[key] = value;
},

/**
* Set HTTP object
*/
init: function(url) {
	this.http = new HttpClientRequest(this.apiUrl + url);
},

/**
* GET request with forced method
*/
Get: function(url) {
	this.init(url);

	for(key in this.header) {
		this.http.header[key] = this.header[key];
	}
	this.http.header["X-HTTP-Method-Override"] = "GET";
	this.http.method = "GET";

	try {
		this.http.execute();
	}
	catch(err) {
		logInfo("Error: " + err);
	}

	return this.Response();
},

/**
* POST request with forced method
*/
Post: function(url, data) {
	this.init(url);

	for(key in this.header) {
		this.http.header[key] = this.header[key];
	}
	this.http.header["content-type"] = "application/json";
	this.http.header["content-length"] = JSON.stringify(data).length;
	this.http.method = "POST";
	this.http.body = JSON.stringify(data);

	try {
		this.http.execute();
	}
	catch(err) {
		logInfo("Error: " + err);
	}

	return this.Response();
},

/**
* Response handler
* @return response object
*/
Response: function() {
	var response = this.http.response;

	if(response.code != 200) {
		logInfo("Error - reponse code " + response.code);
		throw "HTTP request failed with " + response.message
	}

	if(response.code != 400) {
		var sg = new StringGroup("nms:campaign");
		logWarning(response.body.toString(response.codePage));
		rsp = JSON.parse(response.body.toString(response.codePage));
		logInfo(rsp);
	}

	return response.body.toString(response.codePage);
},

/**
* Prepare parameters for POST
* @return parameters array
*/
PrepareParameters: function(params) {
	var buffer = '';
	if (params != null)
		for (var k in params)
			buffer += k + '=' + encodeURIComponent(params[k]) + '&';

		return buffer.substring(0, buffer.length -1 );
	}


}
