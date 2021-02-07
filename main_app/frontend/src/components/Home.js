import React, { Component } from "react";
import LandingPage from "./LandingPage";
import Room from "./Room";
import Search from "./Search";
import Login from "./Login";
import Signup from "./Signup";
import Contact from "./Contact";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
// routing logic 
export default function Home() {

    return (
        <>

            <Router>
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                    <Route path="/room" component={Room} />
                    <Route path="/search" component={Search} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/contact" component={Contact} />
                    {/* 
                        <Route path="/create" component={CreateRoomPage} />
                        <Route path="/room/:roomCode" component={Room} />
                        <Route path="/all_room" component={AllRoom} /> */}
                </Switch>
            </Router>
        </>
    );
}
