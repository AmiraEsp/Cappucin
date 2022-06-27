var http = require('http'); // permet de creer un serveur web
var url = require("url");
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);

    // manage url
    res.writeHead(200, { "content-Type": "text/html" });
    if (page == '/')
        res.write('Vous etes dans la page d\'acceuil');
    else if (page == '/contact')
        res.write("Vous etes dans la page contact");
    else if (page == '/Affichage/1/user')
        res.write("Vous etes dans la page d\'utilisateurs");
    else
        res.write("404 not found !");

    // manage params
    var params = querystring.parse(url.parse(req.url).query);
    if ('id' in params)
        res.write("Votre id est " + params['id']);
    res.end();
});
server.listen(8080);