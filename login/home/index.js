const btn=document.getElementById("btn");
const CryptoJS=require("crypto-js");
const electron=require("electron");
var ipc=electron.ipcRenderer;
btn.addEventListener("click",(event)=>{
    const email=document.getElementById("email").value;
    const pass=document.getElementById("pass").value;
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
    var ema="'"+email+"'";
    $query="SELECT * FROM login WHERE userid= "+ema;
    connection.query($query,(err,result,fields)=>{
        if(err){
            alert(err);
        }
        var res=result[0].password;
        var bytes=CryptoJS.AES.decrypt(res.toString(),"secret key 1234");
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        if(plaintext.localeCompare(pass)==0)
        {
            ipc.send("async-massage");
        }
        else{
            ipc.send('open-error-dialog');
        }
    });
    connection.end((err)=>{
        console.log(err);
    });
});