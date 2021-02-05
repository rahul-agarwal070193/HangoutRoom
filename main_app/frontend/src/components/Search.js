import React, { useState, useEffect } from 'react'

function Table() {
    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default function Search(props) {
    const [count, setcount] = useState("song");
    const [table, settable] = useState(null);

    const Change = (e) => {
        setcount(e.target.value);
    };

    const find = () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        // response fetch 
        fetch("/api/search" + "?search=" + count, requestOptions)
            .then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                settable(data);
            });
    }


    const pri = (e) => {
        console.log(count);
        console.log(table);
    }

    return (
        <div>
            {/* model */}
            <div>
                {/* <!-- Button trigger modal --> */}
                <button
                    type="button"
                    class="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    <i class="fas fa-search"></i></button>

                {/* <!-- Modal --> */}
                <div class="modal fade modal-fullscreen" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">
                            <div class="modal-header row">
                                <h5 class="modal-title col-11 text-center" id="exampleModalLabel" style={{ paddingLeft: "6rem" }}>Search for Songs in Youtube</h5>
                                <button type="button" class=" btn col-1" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times" style={{ "color": "#f06595" }}></i></button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    {/* msg */}
                                    {/* {this.state.successMsg != "" ? <div class="alert alert-success" role="alert">
                                        {this.state.successMsg}</div> : null}

                                    {this.state.errorMsg != "" ? <div class="alert alert-danger" role="alert">
                                        {this.state.errorMsg}</div> : null} */}

                                    {/* text */}
                                    {/* <div class="row text-center">
                                        <h1 class="display-4 pt-4">
                                            Update Room
                                        </h1>
                                        <p>
                                            <small>Guest Control of Playback State</small>
                                        </p>
                                    </div> */}

                                    {/* search bar*/}
                                    <section class="p-4 d-flex flex-fill justify-content-center ">
                                        <div class="form-outline">
                                            <div class="d-flex">
                                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                                    onChange={Change}
                                                    value={count} />
                                                <button class="btn btn-outline-success" onClick={find}>Search</button>
                                                {/* <button class="btn btn-outline-warning" onClick={pri}>Print state</button> */}
                                            </div>
                                        </div>
                                    </section>
                                    {table !== null ? <Table /> : <></>}
                                </div >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
