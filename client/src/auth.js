import axios from "axios";
import _ from "lodash";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  async isAuthenticated() {
    const isUserLoggedIn = await axios.get(`/user`).then((res) => {
      return !_.isEmpty(res.data);
    });
    return isUserLoggedIn;
  }
}

export default new Auth();
