import React, { useState } from 'react'

export default function Join() {
    const [code, setcode] = useState("");
    const [password, setpassword] = useState("");

    return (
        <>

            {/* model */}
            <>
                {/* <!-- Button trigger modal --> */}
                <button
                    type="button"
                    class="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#joinmodel">
                    Join Room</button>

                {/* <!-- Modal --> */}
                <div class="modal" id="joinmodel" tabindex="-1" aria-labelledby="joinmodelLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="joinmodelLabel">Join Room</h5>
                                <button type="button" class=" btn col-1" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times" style={{ "color": "#f06595" }}></i></button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    {/* msg */}
                                    {/* {this.state.successMsg != "" ? <div class="alert alert-success" role="alert">
                                        {this.state.successMsg}</div> : null} */}
                                    {/* 
                                    {this.state.errorMsg != "" ? <div class="alert alert-danger" role="alert">
                                        {this.state.errorMsg}</div> : null} */}

                                    {/* username */}
                                    <section class="d-flex flex-fill justify-content-center ">
                                        <div class="form-group mb-3">
                                            <label for="id_username">Room Code</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="username"
                                                maxlength="20"
                                                id="id_username"
                                                value={code}
                                                onChange={(e) => { setcode(e.target.value) }} />
                                        </div>
                                    </section>
                                    {/* password */}
                                    <section class="d-flex flex-fill justify-content-center ">
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
                                    </section>

                                    {/* sucess and back button  */}
                                    <section class="text-center mb-4 ">
                                        <div class="btn-group" role="group" aria-label="Basic example">
                                            <button
                                                type="button"
                                                class="btn btn-outline-success"
                                            // onClick={joinsroom}
                                            >Join Room</button>
                                            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" aria-label="Close">Back</button>
                                        </div>
                                    </section>
                                </div >
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>)
}
