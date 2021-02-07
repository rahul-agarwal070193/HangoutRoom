import React from 'react'
import Navbar from "./Navbar"
export default function Contact() {
    const [name, setname] = React.useState("");
    const [email, setemail] = React.useState("");
    return (
        <>
            <Navbar />
            <div class="containter">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <header class="card-header">
                                <h4 class="card-title mt-2">Contact Us</h4>
                            </header>
                            <article class="card-body">
                                {/*Name */}
                                <div class="form-group mb-3">
                                    <label for="id_username">Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="username"
                                        maxlength="150"
                                        id="id_username"
                                        value={name}
                                        onChange={(e) => { setname(e.target.value) }} />
                                </div>
                                {/* email address */}
                                <div class="form-group mb-3">
                                    <label for="id_email">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        class="form-control"
                                        id="id_email"
                                        value={email}
                                        onClick={(e) => { setemail(e.target.value) }} />
                                </div>
                                <p>
                                    <label for="id_message">Message</label> <textarea name="message" cols="40" rows="10" required
                                        id="id_message" class="form-control">
                                    </textarea>
                                </p>
                                <div class="form-group">
                                    <button class="btn btn-outline-warning text-dark">Submit</button>
                                </div>

                            </article>
                            <div class="border-top card-body text-center">You can email us directly at <a
                                href="mailto:">#@gmail.com</a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}
