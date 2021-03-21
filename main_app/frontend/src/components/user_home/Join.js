import React, { useState } from 'react'

export default function Join(props) {
    const [code, setcode] = useState("");
    const [password, setpassword] = useState("");
    const update = props.update;
    const [successMsg, setsuccessMsg] = useState("");
    const [errorMsg, seterrorMsg] = useState("");
    const initial = () => {
        seterrorMsg(""); setsuccessMsg("");
    }
    const joinroom = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: code,
                password: password
            })
        };

        fetch('/room/join-room', requestOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.type === 'Success') {
                    update("room joined " + code);
                    setsuccessMsg(data.msg);
                }
                else {
                    seterrorMsg(data.msg);
                }
            });
    }
    return (
        <>

            {/* model */}
            <>
                {/* <!-- Button trigger modal --> */}
                <button
                    type="button"
                    class="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#joinmodel"
                    onclick={initial}>
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
                                    {successMsg != "" ? <div class="alert alert-success" role="alert">
                                        {successMsg}</div> : null}
                                    {errorMsg != "" ? <div class="alert alert-danger" role="alert">
                                        {errorMsg}</div> : null}

                                    {/* username */}
                                    <section class="d-flex flex-fill justify-content-center ">
                                        <div class="form-group mb-3">
                                            <label for="id_username">Room Code</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                maxlength="20"
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
                                                onClick={joinroom}
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
