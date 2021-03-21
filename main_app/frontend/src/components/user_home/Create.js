import React, { useState } from 'react'


export default function Create(props) {
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const update = props.update;
    const [successMsg, setsuccessMsg] = useState("");
    const [errorMsg, seterrorMsg] = useState("");
    const initial = () => {
        seterrorMsg(""); setsuccessMsg("");
    }
    const createroom = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                password: password
            })
        };

        fetch('/room/create-room', requestOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.msg === 'Success') {
                    update("created room " + data.room.code);
                    setsuccessMsg("Room created!!!!!!!!")
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
                    data-bs-target="#createmodel"
                    onClick={initial}>
                    Create Room</button>

                {/* <!-- Modal --> */}
                <div class="modal" id="createmodel" tabindex="-1" aria-labelledby="createmodelLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="createmodelLabel">Create Room</h5>
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
                                            <label for="id_username">Room Name</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="username"
                                                maxlength="150"
                                                id="id_username"
                                                value={name}
                                                onChange={(e) => { setname(e.target.value) }} />
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
                                                onClick={createroom}
                                            >Create Room</button>
                                            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" aria-label="Close">Back</button>
                                        </div>
                                    </section>
                                </div >
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}
