import React, { useEffect, useState } from 'react'
import Player from "./Player"
import TableCheck from "./TableCheck"
import Topnav from "./Topnav"
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Slider from '@material-ui/core/Slider';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
export default function Room(props) {
    const code = props.match.params.code;
    const [queue, setqueue] = useState([]);
    const [update, setupdate] = useState("");
    const [videoend, setvideoend] = useState("");
    const [is_playing, setis_playing] = useState(false);
    const [is_host, setis_host] = useState(false);
    const [videoId, setvideoId] = useState("");
    const [deletevideo, setdeletevideo] = useState("")
    const [queuechange, setqueuechange] = useState("")


    const pressedPlay = () => {
        setis_playing(!is_playing);
    }
    const pressedPause = () => {
        setis_playing(!is_playing);

    }
    const current_song = () => {
        /*
        set video id  to top element of the queue
        */
        if (queue.length !== 0) {
            // console.log(queue[0]);
            setvideoId(queue[0].video_id);
        }


    }

    const onVideoEnd = () => {
        /*
        remove top element from the queue
        call current_song
        remove from the queue using api call
        */
        queue.shift();
        current_song();
        setdeletevideo(videoend);

    }

    const playlist = () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        // response fetch
        fetch("/room/queue" + "?code=" + code, requestOptions)
            .then((response) => {
                return response.json();
            }).then((data) => {
                if (queue.length !== data["queue"]) {
                    setis_host(data["is_host"]);
                    setqueue(data["queue"]);
                    setqueuechange(data["queue"][0].video_id);
                }
            });
    }

    useEffect(() => {
        playlist();
        current_song();
        if (videoend !== "") {
            onVideoEnd();
            setvideoend("");
        }
    }, [update, videoend, queuechange])

    const [value, setValue] = React.useState(30);

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Topnav code={code} update={setupdate} />
            <div class="container-fluid" >
                <div class="row">
                    {videoId ? <>
                        <div class="col-xl-8">
                            <div class="row">
                                <div style={{
                                    position: "relative",
                                    width: "100%",
                                    paddingTop: "56.25%",
                                    overflow: "hidden",
                                    marginLeft: 5,
                                    marginRight: 5,
                                    marginTop: 5,
                                    marginBottom: 1,
                                    // margin: 5,
                                }}>
                                    <div style={{
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        bottom: 0,
                                        right: 0,
                                        width: "100%",
                                        height: "100%",
                                    }}><Player video={videoId} videoend={setvideoend}></Player></div>
                                </div>
                            </div>
                            {is_host ?
                                <>
                                    {/* <div class="bg-dark row">
                                        <div class="col">
                                            {is_playing ? <PauseIcon onClick={pressedPlay} color="error" /> : <PlayArrowIcon onClick={pressedPause} color="error" />}
                                        </div >
                                        <div class="col"><VolumeDown color="error" /></div>
                                        <div class="col">
                                            <Slider value={value} aria-labelledby="continuous-slider" onChange={handleChange} />
                                        </div>
                                        <div class="col"><VolumeUp color="error" /></div>
                                        <div class="col"></div>
                                        <div class="col text-white">f</div>
                                    </div> */}
                                    <div class="bg-dark">

                                        {is_playing ? <PauseIcon onClick={pressedPlay} color="error" /> : <PlayArrowIcon onClick={pressedPause} color="error" />}

                                        <VolumeDown color="error" />

                                        <Slider value={value} aria-labelledby="continuous-slider" onChange={handleChange} />

                                        <VolumeUp color="error" />
                                        <VolumeUp color="primary" />
                                    </div>
                                </> : null}
                        </div>
                        <div class="col-xl-4" >
                            <TableCheck queue={queue} code={code} update={setupdate} deletevideo={deletevideo} />
                        </div>
                    </> :
                        <>
                            <div class="card text-center">
                                <div class="card-body">
                                    <h5 class="card-title">No Video to display</h5>
                                    <p class="card-text">Add video to the queue from search and get the party started</p>
                                </div>
                            </div>
                        </>}
                </div>
            </div>
        </div >
    );
}

