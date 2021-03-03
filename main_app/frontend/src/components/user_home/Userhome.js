import React, { useState, useEffect, Component } from 'react'
import Navbar from "./Navbar"
import Join from "./Join"
import Create from './Create'

// each room with join in functionality
class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.room.code,
            name: this.props.room.name,
            id: this.props.room.id,
            host: this.props.room.host,
            link: "/userroom/" + this.props.room.code
        };
        // this.join = this.join.bind(this);
    }
    // join() {
    //     let tex = "/userroom/" + this.state.code;
    //     console.log(1);
    //     window.location.replace(tex);
    //     // window.location.replace(tex);

    // }
    render() {
        return (
            <div class="col-md-6 col-lg-4 ">
                <div class="card border-success shadow p-3 mb-5  rounded ">
                    <div class="card-header text-center">
                        <h5>{this.state.name}</h5>
                    </div>
                    <div class="card-body text-center">
                        <h5>Code:{this.state.code}</h5>
                        <a href={this.state.link} class="btn btn-success">Enter Room</a>
                        {/* <button type="button" class="btn btn-success" onClick={this.join} >Join Room</button> */}
                    </div>
                </div>
            </div>
        )
    }
}


// get info of all the avail all the room detail of the user
export default function Userhome() {
    const [search, setsearch] = useState("");
    const [room, setroom] = useState([]);
    const [msg, setmsg] = useState("");
    const [username, setusername] = useState("");
    const [first, setfirst] = useState("");
    const [last, setlast] = useState("");

    // api request to fill all the room data of the user
    const findroom = () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        // response fetch
        fetch("/room/all-room-of-user", requestOptions)
            .then((response) => {
                const st = response.status
                return response.json();
            }).then((data) => {
                if (data["Bad Request"] === "Not a part of any room") {
                    setmsg("Not a part of any room");
                    setusername(data["username"]);
                    setfirst(data["first_name"]);
                    setlast(data["last_name"]);
                }
                else {
                    setusername(data['username']);
                    setroom(data['room']);
                    setfirst(data["first_name"]);
                    setlast(data["last_name"]);
                }
            })
    }

    const pri = () => {
        console.log(msg);
        console.log(room.length !== 0);
        room.map((room) => {
            console.log(room);
        })
    }
    useEffect(() => {
        findroom();
        console.log(first);
        return () => {
            cleanup
        }
    }, [])

    const changesearch = (e) => {
        let val = (e.target.value);
        setsearch(val);
    }
    let data = room;
    let filter_data = data.filter((room) => {
        if (room.name !== undefined) {
            return room.name.indexOf(search) !== -1;
        }
    })
    return (
        <>
            {/* <ul class="nav justify-content-center navbar  shadow-lg  mb-2 bg-white rounded ">
                <div class="container">
                    <a class="navbar-brand ms-5 ">{"Welcome " + "name"}</a>
                </div>

                <li class="nav-item">
                    <Create />
                </li>
                <li class="nav-item">
                    <Join />
                </li>
                <li class="nav-item">
                    profile
                </li>
            </ul> */}
            <Navbar name={username} firstname={first} lastname={last} />
            {room.length !== 0 ?
                <div class="container">
                    {/* search bar */}
                    <section class="p-4 d-flex flex-fill justify-content-center ">
                        <input
                            class="form-control"
                            type="search"
                            value={search}
                            onChange={changesearch}
                            placeholder="Search"
                        />
                    </section>
                    <div class="row p-4">
                        {filter_data.map((room) =>
                            <Room room={room} key={room.id} />)}
                    </div>
                </div> : <p>{msg}</p>}
            {/* <button class="btn" onClick={pri}>print</button> */}

        </>
    );
}