
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


        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstname,lastname,dob,email,usertype,sex,password,userid) {
    return axios.post(API_URL + "register", {
      firstname,lastname,dob,email,usertype,sex,password,userid
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

 registerEmail(email) 
  {
return axios.post(API_URL+"Newsletter", {email},{
  headers: headers
});
     
 }
}

export default new AuthService();

