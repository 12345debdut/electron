const electron =require("electron");
const app=electron.app;
const BrowserWindow=electron.BrowserWindow;
const path=require("path");
const url=require("url");
let win;
function createWindow(){
    win=new BrowserWindow({width:800,height:600,maxHeight:600,maxWidth:800,minHeight:600,minWidth:800,frame:false,modal:true});
    win.loadURL(url.format({
        pathname:path.join(__dirname,'home','index.html'),
        protocol: 'file',
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on('closed',()=>{
        win=null;
    })
}
app.on("ready",createWindow);
app.on('window-all-closed',()=>{
    if(process.platform !=='darwin'){
        app.quit()
    }
});
app.on('activate',()=>{
    if(win==null){
        createWindow()
    }
});