
import axios from "axios";

const API_URL = "http://localhost:9000/";

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin' : '*'
}

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      },{
        headers: headers
      })
      .then(response => {

        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    console.log("remove user token");
    localStorage.removeItem("user");
  }

  register(firstname,lastname,email,usertype,password,userid) {
    return axios.post(API_URL + "register", {
      firstname,lastname,email,usertype,password,userid
    })
    .then(response => {
      return response.data;
    });

  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));;
  }

 registerEmail(email) 
  {
return axios.post(API_URL+"Newsletter", {email},{
  headers: headers
});
     
 }

 
 getProfile(username) {
  return axios
    .post(API_URL + "profile", {
      username
    },{
      headers: this.authHeader()
    })
    .then(response => {
      return response.data;
    });
}



 authHeader() {
   const userData = JSON.parse(localStorage.getItem("user"));
   if(userData.token) 
   {
     return { 'token' : userData.token };
   } else {
     return {};
   }
 }
}

export default new AuthService();

