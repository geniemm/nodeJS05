function readURL(input)  {
    console.log(input);
    // 파일에 대한 정보
    const file = input.files[0];
    console.log(file);
    if(file !=""){
        const reader = new FileReader(); // 파일을 읽어오는 기능
        reader.readAsDataURL(file);
        reader.onload = (e) =>{ // e : 이벤트 객체
            console.log(e.target.result);
            document.querySelector("#preview").src = e.target.result;
        }       
    }
}
// 자바스크립트에 있는 여러번 쓰이는기능은 파일로 하나로 묶어주는게 낫다.
