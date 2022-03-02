// config file (REST API base url)
import config from "./config";
// axios FETCHES REST API
import axios from "axios";

/**
 * Data class containg all api request
 * AXIOS - API()
 * GET /api/users - getUser()
 * POST /users - createUser()
 * GET /courses - getCourses()
 * GET /courses/:id - getCourse(id)
 * POST /courses - createCourse(body, credentials)
 * PUT /courses/:id - updateCourse(id, body, credentials)
 * DELETE /courses/:id - deleteCourse(id, credentials)
 */
export default class Data {
  /**
   *
   * @param {string} method - HTTP Method
   * @param {string} path - REST API Route
   * @param {object} body - NULL or req.body
   * @param {boolean} requiresAuth - If the request requires autherization
   * @param {object} credentials - Username and Password
   * @returns {response} response from REST API
   */
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
        return response;
      })
      .catch(({ response }) => {
        return response;
      });
  }

  // functions for /api/users routes

  // GET /users
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

  // POST /users
  async createUser(user) {
    const response = await this.api("POST", "/users", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.data.errors;
    } else {
      throw new Error();
    }
  }

  // functions for /api/courses

  // GET /courses
  async getCourses() {
    const response = await this.api("GET", "/courses");
    if (response.status === 200) {
      return response.data.courses;
    } else if (response.status === 404) {
      return response.data.errors;
    } else {
      throw new Error();
    }
  }

  // GET /courses/:id
  async getCourse(id) {
    const response = await this.api("GET", `/courses/${id}`);
    if (response.status === 200) {
      return response.data.course;
    } else if (response.status === 404) {
      return response.data.errors;
    } else {
      throw new Error();
    }
  }

  // POST /courses
  async createCourse(body, credentials) {
    const response = await this.api(
      "POST",
      "/courses",
      body,
      true,
      credentials
    );
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.data.errors;
    } else {
      throw new Error();
    }
  }

  // PUT /courses/:id
  async updateCourse(id, body, credentials) {
    const response = await this.api(
      "PUT",
      `/courses/${id}`,
      body,
      true,
      credentials
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      // forbiden access
      return [response.data.message];
    } else if (response.status === 400) {
      // validation errors
      return response.data.errors;
    } else if (response.status === 404) {
      // course not found
      return response.data;
    } else {
      throw new Error();
    }
  }

  // DELETE /courses/:id
  async deleteCourse(id, credentials) {
    const response = await this.api(
      "DELETE",
      `/courses/${id}`,
      null,
      true,
      credentials
    );
    if (response.status === 204) {
      // success
      return null;
    } else if (response.status === 403) {
      // Forbidden: Access Denied
      return response.data.message;
    } else if (response.status === 404) {
      // Course Not Found
      return response.data.message;
    } else {
      throw new Error();
    }
  }
}
