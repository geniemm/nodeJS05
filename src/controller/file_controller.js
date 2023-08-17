const fs = require("fs"); 
const views = {
    //key:index value:함수
    index: (req,res) =>{
        //res.send("controller index 연동");
        res.render("file_index");
    },
    list : (req,res) =>{
        
        fs.readdir("./upload_file",(err,files)=>{
            console.log("=== 비동기 ===");
            console.log(files) // readdir 비동기방식으로 처리됨
        })
        
       
        const fileList = fs.readdirSync("./upload_file"); // await 기능까지 포함되어있다
        console.log("=== 동기 처리 방식 ===");
        console.log(fileList);
       // res.send("test");
        res.render("file_list",{files:fileList});
    },
    download : (req,res)=>{
        const filePath = `./upload_file/${req.params.fileName}`;
        res.download(filePath);
    },
    modifyForm : (req,res)=>{
        const fileName = req.params.fileName;
        res.render("modify_form",{fileName});
    }
}
const process = {
    //연산하는 기능들은 여기다가 다 만들거다
    upload : (req,res) =>{
        console.log(" ==== ctrl upload ====");
        // 건네주는 방식이 post니까 
        console.log(req.body);
        console.log("-----------------");
        console.log(req.file);
        console.log("-----------------");
        console.log("req.test: ",req.fileValidation);
        console.log("=================")
        if(req.fileValidation){
            return res.send(req.fileValidation);
        }

        res.send("upload");
    },
    deleteFile : (req,res) =>{
        fs.unlinkSync(`./upload_file/${req.params.fileName}`);
        //unlink 비동기/ 동기방식 둘다 있는데 여기선 동기방식
        res.redirect("/file/list");
    },
    modify : (req,res)=>{
        console.log(" ==== modify ====");
        console.log(req.file);  //file값이 없으면 변경안됨, 있으면 변경됨
        if(req.file){
            return res.redirect(`/file/deleteFile/${req.body.originFileName}`)

        }
        res.redirect("/file/list");
    }
}

module.exports= { views ,process };