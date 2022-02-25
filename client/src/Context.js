import React, { Component } from "react";
import Cookies from "js-cookie";

import Data from "./Data";

const Context = React.createContext();

export default class Provider extends Component {
  state = {
    authenticatedUser: null,
  };

  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get("authenticatedUser");
    this.state = this.cookie ? JSON.parse(this.cookie) : null;
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      data: this.data,
      authenticatedUser,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>
        {...this.props.children}
      </Context.Provider>
    );
  }

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user) {
      this.setState({ authenticatedUser: user });
    }
    console.log("USER: ", user);
    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
  };
}

export const Consumer = Context.Consumer;

/**
 * Wraps provided component in context consumer component
 * @param {Class} Component - React Component
 * @returns {function} - Higher-order component
 */
export default function withContext(Component) {
  return function ContextComponent(props){
    <Context.Consumer>
      {context => {
        <Component {...props} context={context} />
      }}
    </Context.Consumer>
  }
}