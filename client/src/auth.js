import axios from "axios";
import _ from "lodash";

async function isAuthenticated() {
  const isUserLoggedIn = await axios.get(`/user`).then((res) => {
    return !_.isEmpty(res.data);
  });
  return isUserLoggedIn;
}

class Auth {
  async isAuthenticated() {
    const isUserLoggedIn = await axios.get(`/user`).then((res) => {
      return !_.isEmpty(res.data);
    });
    return isUserLoggedIn;
  }
}

export default new Auth();
