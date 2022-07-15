import React, { Component } from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
//region functional Component
// const App = () => {
//   window.navigator.geolocation.getCurrentPosition(
//     (position) => console.log(position),
//     (err) => console.log(err)
//   );
//   return <div>Hi There!</div>;
// };
//endregion

//extends class Component to show that App 'is-a' Component.
class App extends Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    //the following  code was moved from constructor function
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  render() {
    //render method gets called very frequently so don't
    //write initializing code inside render method.
    if (this.state.errorMessage && !this.state.lat)
      return <div>ERROR: {this.state.errorMessage}</div>;

    if (!this.state.errorMessage && this.state.lat)
      return <SeasonDisplay lat={this.state.lat} />;

    return <Spinner message={"Allow Location Permission"} />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
