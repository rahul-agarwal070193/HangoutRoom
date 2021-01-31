import React from 'react'
export default function LandingPage() {
    return (

        <>
            <nav class="navbar navbar-expand-lg navbar-light sticky-top  shadow-lg p-3 mb-5 bg-white rounded ">
                <div class="container">
                    <a class="navbar-brand ms-5 " href="#">Hangout Room</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav p-2 d-flex flex-fill justify-content-end me-5">
                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" href="#"><h6>Contact</h6></a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link "><h6>Sign in </h6></a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="btn btn-outline-warning" role="button" >Sign up</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container-fluid">
                {/* text */}
                <div class="row text-center">
                    <h1 class="display-4 pt-4">
                        landing page
              </h1>
                    <p>
                        <small>Guest Control of Playback State</small>
                    </p>
                </div>
            </div >
        </>
    )
}
