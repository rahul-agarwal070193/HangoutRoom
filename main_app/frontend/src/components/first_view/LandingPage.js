import React from 'react'
import Navbar from "./Navbar"
export default function LandingPage() {
    return (
        <>
            <Navbar />
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
