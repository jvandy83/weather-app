import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

const rootElement = document.getElementById("root") as HTMLDivElement;
const root = createRoot(rootElement);

import { Provider } from "react-redux";

import { store } from "./redux/store";

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
