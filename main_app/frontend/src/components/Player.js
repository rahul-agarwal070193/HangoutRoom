import React from 'react';
import YouTube from 'react-youtube';

export default class player extends React.Component {
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    render() {
        const opts = {
            height: '500rem',
            width: '100%',
            frameborder: "0",
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        return <YouTube videoId="_0ImYFii0EI" opts={opts} />;
    }


}