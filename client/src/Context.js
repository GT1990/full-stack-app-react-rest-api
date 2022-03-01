import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: null,
  };

  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get("authenticatedUser");
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    };
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      data: this.data,
      authenticatedUser,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        getCourses: this.getCourses,
        getCourse: this.getCourse,
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user) {
      user.user.password = password;
      this.setState({ authenticatedUser: user });
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
  };

  getCourses = async () => {
    const courses = await this.data.getCourses();
    return courses;
  };

  getCourse = async (id) => {
    const course = await this.data.getCourse(id);
    return course;
  };

  createCourse = async (body, credentials) => {
    const response = await this.data.createCourse(body, credentials);
    return response;
  };

  updateCourse = async (id, body, credentials) => {
    const response = await this.data.updateCourse(id, body, credentials);
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
