import React, { useEffect } from 'react'
import ReactPlayer from "react-player";
import { DashboardLayout } from '../Layout';

function RecordingsList() {

    return (
        <DashboardLayout>
            <div>
                <ReactPlayer url={require('Z:/downloads/Video-1627034569487.mp4')} controls={true} />
            </div>
        </DashboardLayout>
    )
}

export default RecordingsList
