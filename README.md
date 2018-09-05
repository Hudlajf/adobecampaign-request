# adobecampaign-request
Javascript HTTP request for Adobe Campaign

# Usage

var req = Request("https://api.domain.com/v1/");
var response = req.Get("controller/get");

var req = Request("https://api.domain.com/v1/");
var response = req.Post("controller/store");
