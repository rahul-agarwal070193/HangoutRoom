import React, { useState } from 'react'
import Navbar from "./Navbar"
import validator from 'validator'
export default function Signup() {
    const [username, setusername] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [msg, setmsg] = useState("");
    const [userunique, setuserunique] = useState('0');
    const [emailunique, setemailunique] = useState('0');
    const [err, seterr] = useState(false);
    const pri = () => {
        console.log(username);
        console.log(firstname);
        console.log(lastname);
        console.log(email);
        console.log(password);
        console.log(confirmpassword);
        console.log(userunique);
    }
    const checkusername = (e) => {
        setusername(e.target.value);
        if (e.target.value === '') {
            // console.log(e.target.value);
            setuserunique('0');
        }
        else {
            fetch('/member/check-user?username=' + e.target.value).then(response => {
                return response.json();
            }).then(data => {
                if (data === 'True')
                    setuserunique('1');
                else
                    setuserunique('-1');
            })
        }
    }
    const checkemail = (e) => {
        setemail(e.target.value);
        if (e.target.value === '') {
            // console.log(e.target.value);
            setemailunique('0');
        }
        else if (validator.isEmail(e.target.value)) {
            setemailunique('-1');
        }
        else if (!validator.isEmail(e.target.value)) {
            setemailunique('1');
        }
        else {
            fetch('/member/check-email?email=' + e.target.value).then(response => {
                return response.json();
            }).then(data => {
                if (data === 'True')
                    setemailunique('1');
                else
                    setemailunique('-1');
            })
        }

    }
    async function signup() {
        if (username === '') {
            setmsg(" Please fill out username field");
        }
        else if (firstname === '') {
            setmsg(" Please fill out first name field");
        }
        else if (lastname === '') {
            setmsg(" Please fill out last name field");
        }
        else if (email === '') {
            setmsg(" Please fill out email field");
        }
        else if (password === '') {
            setmsg(" Please fill out password field");
        }
        else if (confirmpassword === '') {
            setmsg(" Please fill out confirm password field");
        }
        else if (confirmpassword !== password) {
            setmsg(" password and confirm password does not matchs");
        }
        else if (userunique === '1') {
            setmsg(" Username already taken");
        }
        else if (emailunique === '1') {
            setmsg(" Email Id already exist");
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                    password: password
                })
            };

            fetch('/member/register', requestOptions)
                .then(response => {
                    window.location.replace("/home");
                });
        }
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
                                {msg ? <>
                                    <div class="alert alert-danger" role="alert">
                                        <i class="fas fa-exclamation-circle"> </i>{msg}
                                    </div>
                                </> : null}

                                {/* username */}
                                <div class="form-group mb-3">
                                    <label for="id_username">Username</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="150 characters or fewer. Letters, digits and @/./+/-/_ only."
                                        name="username"
                                        maxlength="150"
                                        id="id_username"
                                        value={username}
                                        onChange={checkusername}
                                        autoComplete="off"
                                        required />
                                    {userunique === '1' ?
                                        <div class="invalid-feedback" style={{ display: "inherit" }}>
                                            Username already taken.</div>
                                        : userunique === '-1' ? <div class="valid-feedback" style={{ display: "inherit" }}>
                                            Looks good! </div> : null}

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
                                            onChange={(e) => { setfirstname(e.target.value) }}
                                            required />
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
                                            required
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
                                        onChange={checkemail}
                                        autoComplete="off"
                                        required />
                                    {emailunique === '1' ?
                                        <div class="invalid-feedback" style={{ display: "inherit" }}>
                                            Email id already in use.</div>
                                        : emailunique === '-1' ? <div class="valid-feedback" style={{ display: "inherit" }}>
                                            Looks good! </div> : null}

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
                                        onChange={(e) => { setpassword(e.target.value) }}
                                        required />
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
                                        required
                                    />
                                </div>
                                {/* text */}
                                <div class="form-group mb-3">
                                    <small class="text-muted">
                                        By clicking the 'Sign Up' button,
                                        you confirm that you accept
                                    our Terms of use and Privacy Policy.</small>
                                </div>



                            </article>
                            {/* sign up button */}
                            <button
                                class="btn btn-outline-warning text-dark"
                                onClick={signup}>
                                Sign Up</button>
                        </div>
                        <button
                            class="btn btn-outline-warning text-dark"
                            onClick={pri}>
                            Sign Up</button>


                    </div>

                </div>

            </div >
        </>
    )
}
