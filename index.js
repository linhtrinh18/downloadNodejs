let express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser")
const http = require('https');

const fs = require('fs');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get("/",function(req,res){
    res.render("form");
})

app.post("/",function(req,res){
    let linkDownload = req.body.link
    let fileName = req.body.file

    const file = fs.createWriteStream("./download/"+fileName);
    const request = http.get(linkDownload, function(response) {
      response.pipe(file);
    });
    res.send("Dowloading...")
})



app.listen(process.env.PORT || 3000)