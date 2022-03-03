import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext();

/**
 * Provider
 */
export class Provider extends Component {
  state = {
    authenticatedUser: null,
    locationHistory: null,
  };

  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get("authenticatedUser");
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
      locationHistory: null,
    };
  }

  render() {
    const { authenticatedUser, locationHistory } = this.state;
    const value = {
      data: this.data,
      authenticatedUser,
      locationHistory,
      actions: {
        setLocationHistory: this.setLocationHistory,
        signIn: this.signIn,
        signOut: this.signOut,
        getCourses: this.getCourses,
        getCourse: this.getCourse,
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  /**
   * Takes a route and sets it to global state
   * @param {string} location
   */
  setLocationHistory = (location) => {
    this.setState((prevState) => {
      return {
        authenticatedUser: prevState.authenticatedUser,
        locationHistory: location,
      };
    });
  };

  /**
   * signIn function calls getUser and sees if username and password match the REST API
   * If user is found it is stored in global state and passed down by context props
   * @param {string} username
   * @param {string} password
   * @returns {object} user or null
   */
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user) {
      user.user.password = password;
      this.setState((prevState) => {
        return {
          locationHistory: prevState.locationHistory,
          authenticatedUser: user,
        };
      });
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  /**
   * signOut function sets authenicatedUser to null in global state
   * and deletes authenticatedUser cookie
   */
  signOut = () => {
    this.setState((prevState) => {
      return {
        locationHistory: prevState.locationHistory,
        authenticatedUser: null,
      };
    });
    Cookies.remove("authenticatedUser");
  };

  /**
   * getCourses function retrieves all courses from REST API and returns those courses
   * @returns {object} courses object
   */
  getCourses = async () => {
    const courses = await this.data.getCourses();
    return courses;
  };

  /**
   * getCourse functin gets a course from REST API by id passed to it
   * @param {number} id - course id
   * @returns {object} course
   */
  getCourse = async (id) => {
    const course = await this.data.getCourse(id);
    return course;
  };

  /**
   * createCourse function creates a course by passing in body and credentials
   * @param {object} body - course form input details
   * @param {object} credentials - username and password of user
   * @returns {object} returns validation errors or null
   */
  createCourse = async (body, credentials) => {
    const response = await this.data.createCourse(body, credentials);
    return response;
  };

  /**
   * updateCourse function takes a course id, course body details, and user credentials
   * to update course information
   * @param {number} id - course id
   * @param {object} body - course form input details
   * @param {object} credentials - username and password of user
   * @returns {object} returns validation errors or null
   */
  updateCourse = async (id, body, credentials) => {
    const response = await this.data.updateCourse(id, body, credentials);
    return response;
  };

  /**
   * deleteCourse takes a id and credentials and if user matches course is deleted
   * @param {number} id - course id
   * @param {object} credentials - username and password
   * @returns {object} error messages or null
   */
  deleteCourse = async (id, credentials) => {
    const response = await this.data.deleteCourse(id, credentials);
    return response;
  };
}

export const Consumer = Context.Consumer;

/**
 * Wraps provided component in context consumer component
 * @param {Class} Component - React Component
 * @returns {function} - Higher-order component
 */
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
