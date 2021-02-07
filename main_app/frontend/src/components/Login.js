import React, { useState } from 'react'
import Navbar from "./Navbar"
export default function Login() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const pri = () => {
        console.log(password);
        console.log(username);
    }
    return (
        <>
            <Navbar />
            <div class="containter">
                <div class="row justify-content-center mt-5 ">
                    <div class="col-md-6">
                        <div class="card">
                            <header class="card-header">
                                <a href="/signup" class="float-end btn btn-outline-warning mt-1 text-dark">Sign Up</a>
                                <h4 class="card-title mt-2">Login</h4>
                            </header>
                            <article class="card-body">
                                {/* username */}
                                <div class="form-group mb-3">
                                    <label for="id_username">Username</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="username"
                                        maxlength="150"
                                        id="id_username"
                                        value={username}
                                        onChange={(e) => { setusername(e.target.value) }} />
                                </div>
                                {/* password */}
                                <div class="form-group mb-3">
                                    <label for="id_password1">Password</label>
                                    <input
                                        class="form-control"
                                        type="password"
                                        name="password1"
                                        id="id_password1"
                                        value={password}
                                        onChange={(e) => { setpassword(e.target.value) }} />
                                </div>
                                <div class="form-group">
                                    <button
                                        class="btn btn-outline-warning text-dark" onClick={pri}>
                                        Login</button>
                                    {/* <a href="#" class="btn btn-outline-danger" role="button"
                                    aria-pressed="true"><i class="fas fa-exclamation-circle"></i> Forget Password</a> */}
                                </div>
                            </article>
                        </div>
                    </div>

                </div>

            </div >
        </>

    )
}
