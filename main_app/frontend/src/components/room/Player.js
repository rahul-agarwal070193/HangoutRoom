import React from 'react';
import YouTube from 'react-youtube';

export default class player extends React.Component {
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    pause() {
        console.log("pause");
    }
    render() {
        const opts = {
            height: '450',
            width: '100%',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 0,
            },
        };

        return <YouTube
            videoId="-KrzJVC9QOo"
            opts={opts}
            className=""
            onPause={this.pause}
        />;
    }


}