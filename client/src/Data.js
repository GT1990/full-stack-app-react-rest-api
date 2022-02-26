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
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
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
    return axios({
      ...options,
    })
      .then((response) => {
        console.log("THEN: ", response);
        return response;
      })
      .catch(({ response }) => {
        console.log("CATCH: ", response);
        return response;
      });
  }

  async getUser(username, password) {
    const response = await this.api("GET", "/users", null, true, {
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
    const response = await this.api("POST", "/users", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      console.log("response 400: ", response.data.errors);
      return response.data.errors;
    } else {
      throw new Error();
    }
  }
}
