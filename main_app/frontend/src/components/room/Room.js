import React, { useEffect, useState } from 'react'
import Search from "./Search"
import Player from "./Player"
import Chat from "./Chat"
import TableCheck from "./TableCheck"

export default function Room(props) {
    const code = props.match.params.code;
    const [host, sethost] = useState(false);
    const [queue, setqueue] = useState([]);
    const [update, setupdate] = useState("");
    const playlist = () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        // response fetch
        fetch("/room/queue" + "?code=" + code, requestOptions)
            .then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data["queue"]);
                setqueue(data["queue"]);
            });
    }
    useEffect(() => {
        playlist();
        // console.log(queue);
        return () => {
            // cleanup
        }
    }, [update])
    return (
        <div>
            <ul class="nav justify-content-center navbar nav-pills">
                <li class="nav-item">
                    <Search code={code} update={setupdate} />
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Chat</a>
                </li>
            </ul>
            <div class="container-fluid">

                <div class="row">
                    {/* video played(player)and controls */}
                    <div class="col-xl-8">
                        <div class="row">
                            <Player></Player>
                        </div>

                    </div>
                    <div class="bg-dark col-xl-4 text-white" >
                        <p>controls</p>
                    </div>
                </div>
            </div>
            {/* 
            <Chat /> 
            <Queue />
            */}
            <TableCheck queue={queue} />
        </div>
    )
}
