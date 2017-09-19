import React from "react";
import { render } from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducer";
import App from "./containers/App";

const enhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

// Current store
const store = createStore(reducer, enhancers);

// Main render
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("main")
);
