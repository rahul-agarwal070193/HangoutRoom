import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

// export default class Player extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             id: this.props.video,
//             videoend: this.props.videoend,
//         }
//         this.end = this.end.bind(this);
//         this.pause = this.pause.bind(this);
//     }

//     _onReady(event) {
//         // access to player in all event handlers via event.target
//         event.target.pauseVideo();
//     }
//     pause() {
//         console.log("pause");
//         console.log(this.state.id);
//     }
//     end(Event) {
//         // console.log(this.state.id);
//         
//     }

// }



export default function Player(props) {
    const [video, setvideo] = useState(props.video);
    const videoend = props.videoend;
    const opts = {
        width: "100%",
        height: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 0,
            showinfo: 1,
            color: "white",
            modestbranding: 0,
            autohide: 0,
            rel: 0,
            wmode: 'transparent',
            disablekb: 1,
        },
    };
    const pause = () => {
        console.log("pause");
    }
    const end = () => {
        // console.log("end");
        videoend(video);
        // setvideo(props.video);
    }
    useEffect(() => {
        setvideo(props.video);
    }, [end])
    return (
        <>
            <YouTube
                videoId={video}
                opts={opts}
                onPause={pause}
                onEnd={end}
                onPlay={(e) => { console.log(e) }}
                onReady={(e) => { console.log(e) }}
                containerClassName="playercontainer"
            />
        </>
    )
}
