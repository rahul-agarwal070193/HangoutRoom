import React from 'react'
import Create from './Create'
import Join from './Join'
function Navbar(props) {
    const name = props.firstname + " " + props.lastname;
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light  shadow-lg  mb-2 bg-white rounded ">
                <div class="container">
                    <a class="navbar-brand ms-5 ">{"Welcome " + name}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav p-2 d-flex flex-fill justify-content-end me-5">
                            <li class="nav-item">
                                <Create />
                            </li>
                            <li class="nav-item">
                                <Join />
                            </li>
                            <li class="nav-item">
                                <button class="btn">Profile</button>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
            {/* <Search /> */}
        </>
    )
}

export default Navbar
