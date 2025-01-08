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
var ServicesDB = DB.create(__dirname+"/services.db");

/*ProfolioDB.insert([
{ id: "1", role: "焊接服務", photo: "img/IMG_2552.JPG" ,text:"提供高精度的焊接解決方案，適用於各類項目。"},
{ id: "2", role: "自動化技術", photo: "img/IMG_1721.JPG" ,text:"引入先進的機械手臂技術，提高生產效率。" },
{ id: "3", role: "訂製設計", photo: "img/IMG_1721.JPG" ,text:"根據客戶需求量身訂製解決方案，滿足特殊要求。"},
])*/
/*ServicesDB.insert([
    {
        title:"焊接服務", image: "img/IMG_2552.JPG", description: "提供高精度的焊接解決方案，適用於各類項目。"
    },
    {   
        title:"自動化技術", image: "img/IMG_1721.JPG", description:"引入先進的機械手臂技術，提高生產效率。"
    },
    {
        title:"訂製設計", image:"img/IMG_4490.JPG", description:"根據客戶需求量身訂製解決方案，滿足特殊要求。"
    }
]);*/

server.get("/services", (req, res)=>{
    //DB find
    /*var Services=[
        {icon: "fa-shopping-cart", heading:"E-Commerce", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."},
        {icon: "fa-laptop", heading:"Responsive Design", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."}
    ];
    res.send(Services);*/
    ServicesDB.find({}).then(results=>{
        if(results != null){
            res.send(results);
        }else{
            res.send("Errpr!");
        }
    })

    
});

server.get("/profolio", (req,res)=>{
      
      ProfolioDB.find({}).then(results=>{
        if(results != null){
             res.send(results);
        }else{
            res.send("Error!");
        }
      })
});

server.post("/contact", async (req, res) => {
    try {
        await ContactDB.insert(req.body); // 將表單數據插入到資料庫           /*req 是在讀取使用端的請求*/ /*res是伺服器提交給使用者的回應*/ /*body裡面是使用者輸入的資訊*/
        res.redirect("/");               // 提交後重定向到首頁或其他頁面
    } catch (err) {
        res.status(500).send({ error: "表單提交失敗請重新提交" });
    }
});


server.listen(8080, ()=>{
    console.log("Server is running at port 8080.");
})
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

  const cors = require('cors');
const express = require('express');
const app = express();

// 允许特定的域名跨域
app.use(cors({
  origin: 'https://autowelding-guju001.onrender.com'
}));