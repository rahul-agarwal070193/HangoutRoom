import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
export default function App() {
    return (
        <Home />
    );
}

render(<App />, document.getElementById("app"));