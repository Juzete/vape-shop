import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import "./firebase";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="admin-panel" element={<AdminPanel />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
