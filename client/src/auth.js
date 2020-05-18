import axios from "axios";
import _ from "lodash";

class Auth {
  isAuthenticated() {
    const isUserLoggedIn = axios.get(`/user`).then((res) => {
      return !_.isEmpty(res.data);
    });
    console.log(isUserLoggedIn);
    return isUserLoggedIn;
  }
}

export default new Auth();
