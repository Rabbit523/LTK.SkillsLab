import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import Home from "./pages/home";
import BasicForm from "./pages/form";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<BasicForm />} />
        </Routes>
      </Router>
    </Provider>
  );
}
