import React, { Component } from "react";
// import RoomJoinPage from "./RoomJoinPage";
// import CreateRoomPage from "./CreateRoomPage";
// import Room from "./Room";
// import AllRoom from "./AllRoom";
// import Navbar from "./Navbar";
import LandingPage from "./LandingPage";
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
                    {/* <Route path="/join" component={RoomJoinPage} />
                        <Route path="/create" component={CreateRoomPage} />
                        <Route path="/room/:roomCode" component={Room} />
                        <Route path="/all_room" component={AllRoom} /> */}
                </Switch>
            </Router>
        </>
    );
}
