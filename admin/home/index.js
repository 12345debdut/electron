const btn=document.getElementById('button-log');
var CryptoJS = require("crypto-js");
var local=require("localstorage");
btn.addEventListener('click',()=>{
    const email=document.getElementById('email').value;
    const pass=document.getElementById('pass').value;
    const cry=CryptoJS.AES.encrypt(pass,"secret key 1234").toString();
    var mysql=require('mysql');
    var connection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:null,
        database:"student"
    });
    connection.connect((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("database connected successfully");
        }
    });
    $query="INSERT INTO `login`(`userid`, `password`) VALUES "+"("+"'"+email+"'"+",'"+cry+"'"+")";
    connection.query($query,(err,results,fields)=>{
        if(err){
            console.log(err);
        }
    });
    connection.end((err)=>{
        console.log(err);
    })
});