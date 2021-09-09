import React, { useEffect } from 'react'
import VideoThumbnail from 'react-video-thumbnail';
import './Playlist.css'
import ReactPlayer from "react-player";
import Grid from '@material-ui/core/Grid';
import a from 'Z:/downloads/Video-1627034569487.mp4'

function Playlist(props) {

    useEffect(() => {

        console.log("recccc" + props.recList);
    }, [props.recList.length])


    return (

        <div class="m-20  bg-white ">

            <Grid container>
                <Grid item xs="8" >
                    <ReactPlayer url={a} controls={true} width='100%'
                        height='auto' />

                </Grid>

                <Grid xs="4" item xs direction="column" style={{ overflowY: "scroll", height: "35rem" }}>
                    {props.recList && props.recList.length > 0 ? props.recList.map((el) => (
                        <Grid item xs>
                            <div class="bg-white cursor-pointer hover:bg-gray-100  ">
                                <div class="flex-none lg:flex">
                                    <div class=" h-full w-full lg:h-48 lg:w-48   lg:mb-0 ">
                                        {/* <VideoThumbnail
                                            videoUrl={`${b}`}
                                            snapshotAtTime={1}
                                        /> */}

                                    </div>
                                    <div class="flex-auto ml-3 justify-evenly py-2">
                                        <div class="flex flex-wrap ">
                                            <div class="w-full flex-none text-xs text-blue-700 font-medium ">
                                                Room:
                                            </div>
                                            <h2 class="flex-auto text-lg font-medium">{el.room}</h2>
                                        </div>
                                        <p class="mt-3"></p>
                                        <div class="flex py-4  text-sm text-gray-500">

                                            <div class="flex-1 inline-flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <p class="">{el.date?.slice(0, 10)} at {el.date?.slice(11, 16)}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Grid>
                    )) : ''}





                </Grid>
            </Grid>
        </div>


    )
}

export default Playlist
