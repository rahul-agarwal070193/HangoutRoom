import React, { useState, useEffect, Component } from 'react'

// each room with join in functionality
class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.room.code,
            name: this.props.room.name,
            id: this.props.room.id,
            host: this.props.room.host,
            // votesToSkip: this.props.room.votes_to_skip,
            // guestCanPause: this.props.room.guest_can_pause,
            // create: this.props.room.created_at.slice(0, 10),
        };
        // this.join = this.join.bind(this);
    }
    // join() {
    //     // request send to the api 
    //     const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             code: this.state.code,
    //         }),
    //     };
    //     // response fetch
    //     fetch("/api/join-room", requestOptions)
    //         .then((response) => {
    //             if (response.ok) {
    //                 console.log(this.props.history);
    //                 window.location.replace("/room/" + this.state.code);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
    render() {
        return (
            <div class="col-md-6 col-lg-4">
                <div class="card border-success shadow p-3 mb-5  rounded" >
                    <div class="card-header text-center">
                        <h5>Room Code:{this.state.code} </h5>
                        <h5>Room Code:{this.state.id} </h5>
                        <h5>Room Code:{this.state.name} </h5>
                        <h5>Room Code:{this.state.host} </h5>
                    </div>
                </div>
            </div>
        )
    }
    // render() {
    //     return (
    //         <>
    //             <div class="col-md-6 col-lg-4">
    //                 <div class="card border-success shadow p-3 mb-5  rounded" >
    //                     <div class="card-header text-center">
    //                         <h5>Room Code:{this.state.code} </h5>
    //                     </div>
    //                 </div>
    //             </div>

    //             {this.state.guestCanPause ?
    //                 <div class="col-md-6 col-lg-4">
    //                     <div class="card border-success shadow p-3 mb-5  rounded" >
    //                         <div class="card-header text-center"><h5>Room Code:{this.state.code} </h5></div>
    //                         <div class="card-body ">
    //                             <p class="card-title">Room Id:{this.state.id}</p>
    //                             <h6 class="card-subtitle mb-2 text-muted">Created on:{this.state.create}</h6>
    //                             <p class="card-text m-1">Votes to skip:  {this.state.votesToSkip}</p>
    //                             <p class="card-text">Guest Can Pause:    {this.state.guestCanPause ? "TRUE" : "FALSE"}</p>
    //                             <button type="button" class="btn btn-success" onClick={this.join}>join room </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 : <div class="col-md-6 col-lg-4">
    //                     <div class="card border-danger shadow p-3 mb-5  rounded" >
    //                         <div class="card-header text-center"><h5>Room Code:{this.state.code} </h5></div>
    //                         <div class="card-body ">
    //                             {/* <p class="card-title">Room Id:{this.state.id}</p> */}
    //                             <h6 class="card-subtitle mb-2 text-muted">Created on:{this.state.create}</h6>
    //                             <p class="card-text m-1">Votes to skip:  {this.state.votesToSkip}</p>
    //                             <p class="card-text">Guest Can Pause:    {this.state.guestCanPause ? "TRUE" : "FALSE"}</p>
    //                             <button type="button" class="btn btn-success" onClick={this.join}>join room </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             }
    //         </>

    //     )
    // }
}


// get info of all the avail all the room detail of the user
export default function Userhome() {
    const [search, setsearch] = useState("");
    const [room, setroom] = useState([{}]);
    const [msg, setmsg] = useState("");
    // api request to fill all the room data of the user
    const findroom = () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        // response fetch
        fetch("/room/all-room-of-user", requestOptions)
            .then((response) => {
                // if (response.ok) {
                //     const data = response.json();
                //     console.log(data);
                //     setroom(data);
                // }
                // else {
                //     setmsg("Not a part of any room")
                // }
                return response.json();
            }).then((data) => {
                setroom(data);
            })
    }
    const pri = () => {
        console.log(msg);
        room.map((room) => {
            console.log(room);
        })
    }
    useEffect(() => {
        findroom();
        return () => {
            cleanup
        }
    }, [])

    const changesearch = (e) => {
        let val = (e.target.value).toUpperCase();
        setsearch(val);
    }
    let data = room;
    let filter_data = data.filter((room) => {
        if (room.code !== undefined) {
            return room.code.indexOf(search) !== -1;
        }
    })
    return (
        <>
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
                <div class="row">
                    {filter_data.map((room) =>
                        <Room room={room} key={room.id} />)}
                </div>
            </div>
            <button class="btn" onClick={pri}>print</button>

        </>
    );
}