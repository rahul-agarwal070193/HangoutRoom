import React from 'react'
import Search from "./Search"
import Player from "./Player"
import Chat from "./Chat"
// import Queue from "./Queue"
export default function Room() {
    return (
        <div>
            <ul class="nav justify-content-center navbar nav-pills">
                <li class="nav-item">
                    <Search />
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Player</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Chat</a>
                </li>
            </ul>
            {/* 
            
            <Player />
            <Chat /> 
            <Queue />
            */}
        </div>
    )
}
