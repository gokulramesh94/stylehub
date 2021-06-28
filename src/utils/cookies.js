export default class cookies {
    static setCookie = (cName, cValue) => {
      console.log(cValue);
      document.cookie = cName + "=" + cValue + "; path=/";
    };
  
    static getCookie = (cName) => {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded.split("; ");
      let res;
      cArr.forEach((val) => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
      });
      return res;
    };
  
    static deleteCookie = (name, path, domain) => {
      if (this.getCookie(name)) {
        document.cookie =
          name +
          "=" +
          (path ? ";path=" + path : "") +
          (domain ? ";domain=" + domain : "") +
          ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
      }
    };
  }
  