var fs = require("fs");
var Handlebars = require("handlebars");
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

Handlebars.registerHelper('date', function(date) {
	if (date === "") {
		return "Current";
	}

	var theDate = new Date(date);
	return months[theDate.getMonth()] + ' ' + theDate.getFullYear();
});

Handlebars.registerHelper('paragraphSplit', function(plaintext) {
	var i, output = '',
	lines = plaintext.split(/\r\n|\r|\n/g);
	for (i = 0; i < lines.length; i++) {
		if(lines[i]) {
			output += '<p>' + lines[i] + '</p>';
		}
	}
	return new Handlebars.SafeString(output);
});

Handlebars.registerHelper('shortenWebsite', function(website) {
	website = website.replace("http://", "");
	website = website.replace("https://", "");
	website = website.replace("www.", "");
	return new Handlebars.SafeString(website);
});

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

Handlebars.registerHelper('companyId', function(str) {
  return str.toLowerCase().replace(" ","-");
});

Handlebars.registerHelper('obfuscateEmail', function(email) {
  return email.rot13();
});

function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var printcss = fs.readFileSync(__dirname + "/print.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");

	return Handlebars.compile(tpl, {noEscape: true})({
		css: css,
		printcss: printcss,
		resume: resume
	});
}

String.prototype.rot13 = function(){
    return this.replace(/[a-zA-Z]/g, function(c){
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
};

var resume = require("./resume.json");
var html = render(resume);
fs.writeFile("index.html", html);
console.log("index.html sucessfully written.");