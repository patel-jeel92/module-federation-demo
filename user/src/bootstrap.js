import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

class ReactElement extends HTMLElement {
  connectedCallback() {
    // Create a ShadowDOM
    const root = this.attachShadow({ mode: "open" });

    // Create a mount element
    const mountPoint = document.createElement("div");

    root.appendChild(mountPoint);

    // You can directly use shadow root as a mount point
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      mountPoint
    );
  }
}

customElements.define("react-element", ReactElement);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
