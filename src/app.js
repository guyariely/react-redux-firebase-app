import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import beautify from "beautify-html";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";

beautify("light", "purple");

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const generateRenderAppOnce = () => {
  let hasRendered = false;
  const renderApp = () => {
    if (!hasRendered) {
      ReactDOM.render(jsx, document.getElementById("app"));
      hasRendered = true;
    }
  };
  return renderApp;
};

const renderAppOnce = generateRenderAppOnce();

ReactDOM.render(<p>loading ...</p>, document.getElementById("app"));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderAppOnce();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    store.dispatch(logout());
    renderAppOnce();
    history.push("/");
  }
});
