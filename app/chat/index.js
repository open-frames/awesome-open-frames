import "./polyfills";
import React from "react";
import ReactDOM from "react-dom/client";
import InboxPage from "../Page";

import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InboxPage />
  </React.StrictMode>,
);
