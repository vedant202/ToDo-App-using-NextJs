const checkCookie=()=>{
    
    console.log(document.cookie)
      const cookie = document.cookie.split("=")[1];
      console.log("Check Cookie"+ cookie)
      if(cookie==""){
        return false;
      }
      return true;
  }
export default checkCookie;