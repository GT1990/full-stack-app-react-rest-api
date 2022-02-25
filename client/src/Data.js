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
      method: "GET",
      url: "http://bit.ly/2mTM3nY",
      responseType: "stream",
    }).then((response) => {
      return response;
    });
  }

  async getUser(username, password) {
    const response = await this.api("/users", "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => data.errors);
    } else {
      throw new Error();
    }
  }
}
