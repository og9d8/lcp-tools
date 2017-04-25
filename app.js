
var request = require("request");
var CryptoJS = require("crypto-js");

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}


function LCPAuthHeader(macId, macKey, method, server,path,data) { 
  var d = new Date();
  var n = d.getTime()+"";
  var ts = n.substring(0, n.length-3);
  var nonce=randomString(8);
  var ext = "";
  if (method != "GET" && data.length > 0) {
    ext = CryptoJS.SHA1("application/json"+data); 
  }
  macKey = macKey.replace(new RegExp("-", 'g'), "+").replace(new RegExp("_", 'g'), "/");
  path = path.split("?")[0];
  var normalizedRequestString = ts+"\n"+nonce+"\n"+method+"\n"+path+"\n"+server+"\n443\n"+ext+"\n";
  var secret = CryptoJS.enc.Base64.parse(macKey);
  var mac=CryptoJS.HmacSHA1(normalizedRequestString, secret).toString(CryptoJS.enc.Base64);         
  var header="MAC id=\""+macId+"\", ts=\""+ts+"\", nonce=\""+nonce+"\", ext=\""+ext+"\", mac=\""+mac+"\"";
  return header;
}
 

module.exports = {
  LCPAuthHeader : LCPAuthHeader
}