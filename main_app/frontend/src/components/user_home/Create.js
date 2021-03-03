import React from 'react'

export default function Create() {
    return (
        <>

            {/* model */}
            <>
                {/* <!-- Button trigger modal --> */}
                <button
                    type="button"
                    class="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => { console.log(1) }}>
                    Create Room</button>

                {/* <!-- Modal --> */}
                <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Room Settings</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    {/* msg */}
                                    {/* {this.state.successMsg != "" ? <div class="alert alert-success" role="alert">
                                        {this.state.successMsg}</div> : null} */}
                                    {/* 
                                    {this.state.errorMsg != "" ? <div class="alert alert-danger" role="alert">
                                        {this.state.errorMsg}</div> : null} */}

                                    {/* text */}
                                    <div class="row text-center">
                                        <h1 class="display-4 pt-4">
                                            Update Room
                                        </h1>
                                        <p>
                                            <small>Guest Control of Playback State</small>
                                        </p>
                                    </div>
                                    {/* play pause button */}
                                    <section class=" text-center ">
                                        <div class="btn-group " role="group" >

                                            <input
                                                value="true"
                                                type="radio"
                                                class="btn-check"
                                                name="options"
                                                id="option1"
                                                autocomplete="off"
                                            // checked
                                            />
                                            <label class="btn btn-outline-info" for="option1">Play and Pause</label>
                                            <input
                                                value="false"
                                                type="radio"
                                                class="btn-check"
                                                name="options"
                                                id="option2"
                                                autocomplete="off" />
                                            <label class="btn btn-outline-warning" for="option2">No Control</label>



                                        </div>
                                    </section>
                                    {/* vote count */}
                                    <section class="p-4 d-flex flex-fill justify-content-center ">
                                        <div class="form-outline">
                                            <label class="form-label form-row" for="typeNumber">Votes To Skip Song</label>
                                            <input
                                                type="number"
                                                id="typeNumber"
                                                class="form-control active"
                                                min={0}
                                            // defaultValue={this.state.votesToSkip}
                                            // onChange={this.handleVotesChange}
                                            />
                                        </div>
                                    </section>
                                    {/* sucess and back button  */}
                                    <section class="text-center mb-4 ">
                                        <div class="btn-group" role="group" aria-label="Basic example">
                                            <button
                                                type="button"
                                                class="btn btn-outline-success"
                                            // onClick={this.handleRoomButtonPressed}
                                            >Update Settings</button>
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
