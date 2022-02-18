import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./app.styles.scss";
import HorizontalNonLinearStepper from "./nav-bar/nav-bar.component";
class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter basename="/">
          <HorizontalNonLinearStepper />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
