import React, { useEffect } from 'react'
import { callStates } from '../../store/actions/callActions'
import './TheRoom.css'
import DirectCall from './Components/DirectCall/DirectCall';
import GroupCall from './Components/GroupCall/GroupCall';
import GroupCallRoomsList from './Components/GroupCallRoomsList/GroupCallRoomsList';
import * as webRTCHandler from '../../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../../utils/webRTC/webRTCGroupCallHandler';
import store from '../../store/store';
function TheRoom() {
    useEffect(() => {
        webRTCHandler.getLocalStream();
        webRTCGroupHandler.connectWithMyPeer();

    }, []);
    return (
        <div className='dashboard_container background_main_color'>
            <div className='dashboard_left_section'>
                <div className='dashboard_content_container'>
                    <GroupCall />
                </div>
            </div>
            <div className='dashboard_right_section background_secondary_color'>
                <div className='dashboard_active_users_list'>

                </div>

            </div>
        </div>
    )
}

export default TheRoom
