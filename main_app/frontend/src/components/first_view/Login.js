import React, { useState } from 'react'
import Navbar from "./Navbar"
export default function Login() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [msg, setmsg] = useState("");
    const pri = () => {
        console.log(password);
        console.log(username);
    }
    const login = () => {
        if (username === '') {
            setmsg("  Enter Username");
        }
        else if (password === '') {
            setmsg("  Enter Password");
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            };

            fetch('/member/user-login', requestOptions)
                .then(response => {
                    console.log(response);
                    window.location.replace("/home");
                });
            // fetch('/member/get_user?username=' + username + '&password=' + password)
            //     .then(response => {
            //         if (response.ok)
            //             return response.json();
            //         else {
            //             setmsg(" Username or Password invalid");
            //             return {};
            //         }
            //     })
            //     .then(data => {
            //         window.location.reload('/home')
            //         // console.log(data);
            //     });
        }
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
                                {msg ?
                                    <div class="alert alert-danger" role="alert">
                                        <i class="fas fa-exclamation-circle"> </i>{msg}
                                    </div>
                                    : null}
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
                                        class="btn btn-outline-warning text-dark" onClick={login}>
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
