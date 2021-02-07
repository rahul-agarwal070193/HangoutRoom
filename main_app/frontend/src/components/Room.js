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
            <div class="container-fluid">

                <div class="row">
                    {/* video played(player)and controls */}
                    <div class="col-xl-8">
                        <div class="row">
                            <Player></Player>
                        </div>
                        <div class="row bg-dark" >
                            <p>controls</p></div>
                    </div>
                    {/* playlist */}
                    <div class="col-xl-4">
                        <h3>Playlist</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colspan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* 
            
           
            <Chat /> 
            <Queue />
            */}
        </div>
    )
}
