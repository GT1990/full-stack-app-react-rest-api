import config from "./config";

import axios from "axios";

export default class Data {
  api(
    method = "get",
    path,
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    let options = {
      method,
      url: config.apiBaseURL + path,
    };
    if (body) {
      options.data = body;
    }
    if (requiresAuth) {
      if (credentials) {
        options.auth = {
          username: credentials.username,
          password: credentials.password,
        };
      } else {
        console.error(
          "ERROR: Authorization was required without any credentials"
        );
      }
    }
    console.log(options);
    return axios({
      method: "get",
      url: "http://bit.ly/2mTM3nY",
      responseType: "stream",
    }).then((response) => {
      return response.data;
    });
  }

  async getUser(username, password) {
    const response = await this.api("/users", "get", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
}
