import React, { Component } from "react";
import Data from "./Data";

const Context = React.createContext();

export default class Provider extends Component {
  state = {
    authenticatedUser: null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const value = {
      data: this.data,
      authenticatedUser,
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
  };
}

export const Consumer = Context.Consumer;
