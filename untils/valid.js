const valid =(name,email,password,confirmpass)=>{
    if(!name || !email || !password){
        return "Please add a feild"
    }
    if(!validateEmail(email)) {
        return "This not Email"
    }
    if(password.length < 6){
        return "PassWord has 6 character"
    }
    if(password != confirmpass){
        return "PassWord Confirm not math"
    }
}
function validateEmail(email) {
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