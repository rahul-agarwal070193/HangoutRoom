import React, { useState } from 'react'
import Navbar from "./Navbar"
export default function Signup() {
    const [username, setusername] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");

    const pri = () => {
        console.log(username);
        console.log(firstname);
        console.log(lastname);
        console.log(email);
        console.log(password);
        console.log(confirmpassword);
    }
    const checkusername = (e) => {
        setusername(e.target.value);
    }
    const signup = () => {
        console.log("s");
    }
    return (
        <>
            <Navbar />
            <div class="containter">
                {/* <button class="btn btn-success" onClick={pri}>print</button> */}
                <div class="row justify-content-center m-5">
                    <div class="col-md-6">
                        <div class="card">
                            <header class="card-header">
                                <a href="/login" class="float-end btn btn-outline-warning mt-1 text-dark">Login</a>
                                <h4 class="card-title mt-2">Sign Up</h4>
                            </header>
                            <article class="card-body">
                                {/* username */}
                                <div class="form-group mb-3">
                                    <label for="id_username">Username</label>
                                    <input type="text" class="form-control"
                                        placeholder="150 characters or fewer. Letters, digits and @/./+/-/_ only." name="username"
                                        maxlength="150" id="id_username" value={username} onChange={checkusername} />
                                </div>
                                {/* first name and second name */}
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="id_first_name">First Name </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="First name"
                                            aria-label="First name"
                                            value={firstname}
                                            onChange={(e) => { setfirstname(e.target.value) }} />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="id_last_name">Last Name</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Last name"
                                            aria-label="Last name"
                                            value={lastname}
                                            onChange={(e) => { setlastname(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                {/* email address */}
                                <div class="form-group mb-3">
                                    <label for="id_email">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        class="form-control"
                                        id="id_email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => { setemail(e.target.value) }} />
                                    <small class="form-text text-muted">Your email and personal information is not shared with any
                                third parties, and we only use your email for communications related to our service, such as password resets.</small>
                                </div>
                                {/* password */}
                                <div class="form-group mb-3">
                                    <label for="id_password1">Create Password</label>
                                    <input
                                        class="form-control"
                                        type="password"
                                        name="password1"
                                        id="id_password1"
                                        value={password}
                                        onChange={(e) => { setpassword(e.target.value) }} />
                                </div>
                                {/* confirm password */}
                                <div class="form-group mb-3">
                                    <label for="id_password2">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="password2"
                                        autocomplete="new-password"
                                        class="form-control"
                                        id="id_password2"
                                        value={confirmpassword}
                                        onChange={(e) => { setconfirmpassword(e.target.value) }}
                                    />
                                </div>
                                {/* text */}
                                <div class="form-group mb-3">
                                    <small class="text-muted">
                                        By clicking the 'Sign Up' button,
                                        you confirm that you accept
                                    our Terms of use and Privacy Policy.</small>
                                </div>
                                {/* sign up button */}
                                <div class="form-group">
                                    <button
                                        class="btn btn-outline-warning text-dark"
                                        onClick={signup}>
                                        Sign Up</button>
                                </div>
                            </article>
                        </div>

                    </div>

                </div>

            </div >
        </>
    )
}
