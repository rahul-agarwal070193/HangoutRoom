import React, { Component } from "react";
import LandingPage from "./first_view/LandingPage";
import Room from "./room/Room";
import Search from "./room/Search";
import Login from "./first_view/Login";
import Signup from "./first_view/Signup";
import Contact from "./first_view/Contact";
import Userhome from "./user_home/Userhome"
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
                    <Route path="/userroom/:code" component={Room} />
                    <Route path="/search" component={Search} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/home" component={Userhome} />
                    {/* 
                        <Route path="/create" component={CreateRoomPage} />
                        <Route path="/room/:roomCode" component={Room} />
                        <Route path="/all_room" component={AllRoom} /> */}
                </Switch>
            </Router>
        </>
    );
}
