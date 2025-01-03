//install: node js
//install web server package: express >npm install express
var express = require("express");
var server = express();
var bodyParser = require("body-parser");

//web root
server.use(express.static(__dirname+"/AgencyProject"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

var fileUpload = require("express-fileupload");
server.use(fileUpload({defCharset:'utf8', defParamCharset:'utf8'}));


var DB = require("nedb-promises");
var ProfolioDB = DB.create(__dirname+"/profolio.db");
var ContactDB = DB.create(__dirname+"/contact.db");
 

/*ProfolioDB.insert([
{ id: "1", role: "機械手臂焊接", photo: "img/IMG_1730.JPG" },
{ id: "2", role: "光纖雷射切管", photo: "img/IMG_4714.JPG" },
{ id: "3", role: "傳統鐵管加工", photo: "img/IMG_4490.jpg" },
]);*/

server.get("/services", (req, res)=>{
    //DB find
    var Services=[
        {icon: "fa-shopping-cart", heading:"E-Commerce", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."},
        {icon: "fa-laptop", heading:"Responsive Design", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."}
    ];
    res.send(Services);
});

server.get("/profolio", (req,res)=>{
      DB
      ProfolioDB.find({}).then(results=>{
        if(results != null){
             res.send(results);
        }else{
            res.send("Error!");
        }
      })
})

server.post("/contact", async (req, res) => {
    try {
        await ContactDB.insert(req.body); // 將表單數據插入到資料庫
        res.redirect("/");               // 提交後重定向到首頁或其他頁面
    } catch (err) {
        res.status(500).send({ error: "Failed to save contact information." });
    }
});


server.listen(8080, ()=>{
    console.log("Server is running at port 8080.");
})
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  });