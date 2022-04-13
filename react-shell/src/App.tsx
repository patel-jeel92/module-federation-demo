import React from "react";
import { BrowserRouter } from "react-router-dom";
import HorizontalNonLinearStepper from "./components/navigation";

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
