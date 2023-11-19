const express=require("express")
const app=express()
const bodyP=require("body-parser")
const compiler=require("compilex")
const options={stats:true}
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.15",express.static("C:/Users/Avdhesh/Desktop/MajorProject/Compiler/codemirror-5.65.15"))
app.get("/",function(req,res){
    // to delete the files
    compiler.flush(function(){
        console.log("deleted")
    })
    res.sendFile("C:/Users/Avdhesh/Desktop/MajorProject/Compiler/index.html")
})
// compilex to run code
app.post("/compile",function(req,res){
    var code=req.body.code
    var input=req.body.input
    var lang=req.body.lang
    try{
        if(lang=="Cpp"){
            if(!input){
                var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; 
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"});
                    }
                });            
            }
            else{
                var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; 
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"});
                    }
                });
            }
        }
        else if(lang=="Java"){
            if(!input){
                var envData = { OS : "windows"}; 
                compiler.compileJava( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"});
                    }
                });    
            }
            else{
                var envData = { OS : "windows"}; 
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"});
                    }
                });
            }
        }
        else if(lang=="Python"){
            if(!input){
                var envData = { OS : "windows"}; 
                compiler.compilePython( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"});
                    }
                });    
            }
            else{ 
                var envData = { OS : "windows"}; 
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"});
                    }        
                });
            }
        }
    } 
    catch(e){
        console.log("error")
    }
})
app.listen(8000)
// To start Api write {nodemon Api.js} in terminal