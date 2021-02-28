import React, { useState, useEffect } from 'react'

// // each room with join in functionality
// class Room extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             code: this.props.room.code,
//             votesToSkip: this.props.room.votes_to_skip,
//             guestCanPause: this.props.room.guest_can_pause,
//             id: this.props.room.id,
//             create: this.props.room.created_at.slice(0, 10),
//         };
//         this.join = this.join.bind(this);
//     }
//     join() {
//         // request send to the api 
//         const requestOptions = {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 code: this.state.code,
//             }),
//         };
//         // response fetch
//         fetch("/api/join-room", requestOptions)
//             .then((response) => {
//                 if (response.ok) {
//                     console.log(this.props.history);
//                     window.location.replace("/room/" + this.state.code);
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }
//     render() {
//         return (
//             <>
//                 {this.state.guestCanPause ?
//                     <div class="col-md-6 col-lg-4">
//                         <div class="card border-success shadow p-3 mb-5  rounded" >
//                             <div class="card-header text-center"><h5>Room Code:{this.state.code} </h5></div>
//                             <div class="card-body ">
//                                 {/* <p class="card-title">Room Id:{this.state.id}</p> */}
//                                 <h6 class="card-subtitle mb-2 text-muted">Created on:{this.state.create}</h6>
//                                 <p class="card-text m-1">Votes to skip:  {this.state.votesToSkip}</p>
//                                 <p class="card-text">Guest Can Pause:    {this.state.guestCanPause ? "TRUE" : "FALSE"}</p>
//                                 <button type="button" class="btn btn-success" onClick={this.join}>join room </button>
//                             </div>
//                         </div>
//                     </div>
//                     : <div class="col-md-6 col-lg-4">
//                         <div class="card border-danger shadow p-3 mb-5  rounded" >
//                             <div class="card-header text-center"><h5>Room Code:{this.state.code} </h5></div>
//                             <div class="card-body ">
//                                 {/* <p class="card-title">Room Id:{this.state.id}</p> */}
//                                 <h6 class="card-subtitle mb-2 text-muted">Created on:{this.state.create}</h6>
//                                 <p class="card-text m-1">Votes to skip:  {this.state.votesToSkip}</p>
//                                 <p class="card-text">Guest Can Pause:    {this.state.guestCanPause ? "TRUE" : "FALSE"}</p>
//                                 <button type="button" class="btn btn-success" onClick={this.join}>join room </button>
//                             </div>
//                         </div>
//                     </div>
//                 }</>

//         )
//     }
// }

// // get info of all the avail all the room detail of the user
// export default class Userhome extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             room: [{}],
//             search: ""
//         };
//         this.print = this.print.bind(this);
//         this.search = this.search.bind(this);
//         this.getdata = this.getdata.bind(this);
//         // this.getdata();
//     }
//     search(e) {
//         this.setState({
//             search: (e.target.value).toUpperCase()
//         })
//     }
//     print() {
//         console.log(this.state.search);
//     }
//     // getdata() {
//     //     fetch('/api/room').then(Response => Response.json()).then(data => {
//     //         console.log(data);
//     //         this.setState({
//     //             room: data
//     //         })
//     //     }
//     //     );
//     // }
//     render() {
//         // let data = this.state.room;
//         // let filter_data = data.filter((room) => {
//         //     if (room.code !== undefined) {
//         //         return room.code.indexOf(this.state.search) !== -1;
//         //     }
//         // })
//         return (
//             <div class="container">
//                 {/* search bar */}
//                 <section class="p-4 d-flex flex-fill justify-content-center ">
//                     <form class="form-floating">
//                         <input
//                             class="form-control"
//                             type="search"
//                             value={this.state.search}
//                             onChange={this.search}
//                             placeholder="Search"
//                             aria-label="Search" />
//                         <label>Search</label>
//                     </form>
//                 </section>
//                 {/* all room */}
//                 {/* <div class="row">
//                     {filter_data.map((room) =>
//                         <Room room={room} key={room.id} />)}
//                 </div> */}
//             </div>
//         )
//     }
// }

export default function Userhome() {
    const [search, setsearch] = useState("");
    const [room, setroom] = useState([{}]);

    // api request to fill all the room data of the user
    const finduser = () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        // response fetch
        fetch("/member/user_detail", requestOptions)
            .then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                // settable(data);
            });
        console.log("user found");
    }
    useEffect(() => {
        finduser();
        return () => {
            cleanup
        }
    }, [])

    const changesearch = (e) => {
        setsearch(e.target.value);
        let data = room;
        let filter_data = data.filter((room) => {
            if (room.code !== undefined) {
                return room.code.indexOf(e) !== -1;
            }
        })
        setroom(filter_data);
    }
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
                {/* all room
                <div class="row">
                    {room.map((room) =>
                        <Room room={room} key={room.id} />)}
                </div> */}
            </div>
        </>
    );
}