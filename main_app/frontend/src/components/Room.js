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
                    <a>player</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Chat</a>
                </li>
            </ul>
            <div class="container">

                <div class="row">
                    <div class="col-8">
                        <Player />
                    </div>
                    <div class="col-4 bg-dark">
                        <header>Queue</header>
                        <p></p>
                    </div>
                </div>
                <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1">
                </iframe>
            </div>

            {/* 
            
           
            <Chat /> 
            <Queue />
            */}
        </div>
    )
}
