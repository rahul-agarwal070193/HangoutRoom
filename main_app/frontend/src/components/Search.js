import React, { useState, useEffect } from 'react'
import PlayCircleFilledTwoToneIcon from '@material-ui/icons/PlayCircleFilledTwoTone';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
function List(props) {
    const data = props.data;
    const pri = () => {
        console.log(data);
    }
    return (
        <>
            <tr>
                <td><img src={data.thumbnail}></img></td>
                <td>{data.title}</td>
                <td>{data.channel_name}</td>
                <td><PlayCircleFilledTwoToneIcon /></td>
                <td><AddCircleTwoToneIcon onClick={pri} /></td>
            </tr>

            {/* <p> {data}</p> */}
        </>
    );

}
function Table(props) {
    const data = props.data;
    const pri = () => {
        console.log(data);
    }
    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Thumbnail</th>
                        <th scope="col">Title</th>
                        <th scope="col">Channel Name </th>
                        <th scope="col">Play Now</th>
                        <th scope="col">Add to playlist</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((list) =>
                        <List data={list} key={list.id} />)}
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
                // console.log(data);
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

                                    {/* search bar*/}
                                    <section class="p-4 d-flex flex-fill justify-content-center ">
                                        <div class="form-outline mb-2">
                                            <div class="d-flex">
                                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                                    onChange={Change}
                                                    value={count} />
                                                <button class="btn btn-outline-success " onClick={find}>Search</button>
                                                {/* <button class="btn btn-outline-warning" onClick={pri}>Print state</button> */}
                                            </div>
                                        </div>
                                    </section>
                                    {table !== null ? <Table data={table} /> : <></>}
                                </div >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
