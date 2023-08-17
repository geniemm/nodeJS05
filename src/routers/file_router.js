const router = require("express").Router();

const multer = require("multer"); // 멀터가 파일을 관리해준다.
//파일을 어느위치에 저장할거냐 > 저장할 폴더 위치

//const upload = multer({dest : "upload_file"});
// dest : destination 목적지를 나타냄 
const stg = multer.diskStorage({
    destination : (req,file,cb) => {
        console.log("==== dest ====");
        cb(null,"upload_file"); // 앞쪽에 null이라는 값을 고정으로 쓴다. 에러발생을 null을 보고 처리해준다.
    },
    filename : (req,file,cb)=>{
        console.log("==== filename ====");
        console.log(file);
        cb(null,Date.now()+"-"+file.originalname);
    }
}); 
// cb : 목적지를 실행해주는 함수
// 동일한 파일이름(내용은다름)을 중복 업로드하면 덮어씌우기가 되니까 그거 해줘야함
//Date.now()+"-" 초단위 + 파일명으로 이름을 업로드해주자 그러면 중복 해결완료>< 

const f_Filter = (req,file,cb)=>{
    console.log("=== filter ===");
    const type = file.mimetype.split("/")[0]; // /를 기준으로 쪼갬 > 0,1 번째로 나뉘게됨 
    console.log("type: ",type);
    if(type === "image"){
        cb(null,true); //image 파일이면 받고 아니면 안받겠다!
    }else{
        req.fileValidation ="이미지만 저장하세요!";
        cb(null, false);
    }
  
}
// 파일을 전송하지 않으면 stg, filter는 작동하지 않는다.


const upload = multer({storage : stg, fileFilter : f_Filter});
// storage : 저장방식 

const fileCtrl = require("../controller/file_controller")

router.get("/",fileCtrl.views.index) // ctrl에서 views를 받아옴(views라는 변수에있는 index라는 키를 쓰겠다)
router.get("/list",fileCtrl.views.list)
router.get("/download/:fileName",fileCtrl.views.download) // 보여주는거는 views
router.get("/deleteFile/:fileName",fileCtrl.process.deleteFile) // 삭제는 연산하는 기능
router.get("/modify_form/:fileName",fileCtrl.views.modifyForm)

router.post("/upload", 
            upload.single("file_name") ,// 파일이 들어오면 upload를 해줄거다. 
                                        //single: 단일 파일/ 여러개이면 arr로 배열로 받는다.
            fileCtrl.process.upload)    // file_name: ejs에서 저장한 이름형식(그대로 써야한다)

router.post("/modify", 
    upload.single("newFileName"),
    fileCtrl.process.modify) 
                                  
           
module.exports = router;