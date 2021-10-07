const valid =(name,email,password,confirmpass)=>{
    if(!name || !email || !password){
        return "Bạn chưa nhập dữ liệu"
    }
    if(!validateEmail(email)) {
        return "Đây không phải Email"
    }
    if(password.length < 6){
        return "Mật khẩu phải có 6 ký tự"
    }
    if(password != confirmpass){
        return "2 mật khẩu chưa khớp"
    }
}

export function validString(str){
    if(str.length < 1)
    return 'Bạn chưa nhập dữ liệu'
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

export  function validateNumber(number){
    if(/(03|05|07|08|09)+([0-9]{8})\b/.test(number)){
     return true;
    }
  }
export function CalculatorSalePrice(priceBefore,priceAfter){
    const persent  = Math.round(((priceBefore - priceAfter)/priceBefore)*100) +'%';
    return persent;
}
export default valid