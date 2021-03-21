import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar"


// each room with join in functionality
function RoomCard(props) {
    const code = props.room.code;
    const name = props.room.name;
    const id = props.room.id;
    const host = props.room.host;
    const link = "/userroom/" + props.room.code;
    const update = props.update;
    const leave = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: code
            })
        };

        fetch('/room/leave-room', requestOptions)
            .then(response => {
                console.log(response);
                update("deleted room " + code);
            });

    }
    return (
        <div class="col-md-6 col-lg-4 ">
            <div class="card border-success shadow-lg p-3 mb-3  rounded ">
                <div class="card-header text-center">
                    <h5>{name}</h5>
                </div>
                <div class="card-body text-center">
                    <h5>Code:{code}</h5>
                    <div class="btn-group" role="group">
                        <a href={link} class="btn btn-success">Enter Room</a>
                        <button class="btn btn-danger" onClick={leave}>Leave Room</button>
                    </div>
                    {/* <button type="button" class="btn btn-success" onClick={this.join} >Join Room</button> */}
                </div>
            </div>
        </div>
    )
}


// get info of all the avail all the room detail of the user
export default function Userhome() {
    const [search, setsearch] = useState("");
    const [room, setroom] = useState([]);
    const [msg, setmsg] = useState("");
    const [username, setusername] = useState("");
    const [first, setfirst] = useState("");
    const [last, setlast] = useState("");
    const [update, setupdate] = useState("");
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
        console.log(update);
        return () => {
            // cleanup
        }
    }, [update])

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
            <Navbar name={username} firstname={first} lastname={last} update={setupdate} />
            {/* search bar */}
            <section class="p-4">
                <input
                    class="form-control"
                    type="search"
                    value={search}
                    onChange={changesearch}
                    placeholder="Search"
                />
            </section>
            {filter_data.length !== 0 ?
                <div class="container">

                    <div class="row p-4">
                        {filter_data.map((room) =>
                            <RoomCard room={room} key={room.id} update={setupdate} />)}
                    </div>
                </div> :
                <>
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">No Room to display</h5>
                            <p class="card-text">Go to create or join room to be a part of the room</p>
                        </div>
                    </div>
                </>}
            {/* <button class="btn" onClick={pri}>print</button> */}

        </>
    );
}