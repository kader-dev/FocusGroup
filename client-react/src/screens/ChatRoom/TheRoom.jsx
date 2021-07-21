import React, { useEffect, useState } from 'react'
import { callStates } from '../../store/actions/callActions'
import './TheRoom.css'
import DirectCall from './Components/DirectCall/DirectCall';
import GroupCall from './Components/GroupCall/GroupCall';
import GroupCallRoomsList from './Components/GroupCallRoomsList/GroupCallRoomsList';
import * as webRTCHandler from '../../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../../utils/webRTC/webRTCGroupCallHandler';
import store from '../../store/store';
import io from 'socket.io-client'
import PollComp from './Components/Poll/PollComponenet'
const socket = io.connect('http://localhost:5000');
function TheRoom() {
    const [poll, setPoll] = useState({})
    const [isPoll, setISPoll] = useState(false)
    const [quest, setQues] = useState('');
    const [answer, setAnswer] = useState([]);
    const [timer, setTimer] = useState(0);


    useEffect(() => {
        webRTCHandler.getLocalStream();
        webRTCGroupHandler.connectWithMyPeer();

    }, []);
    useEffect(() => {
        socket.on('poll', ({ question, votes, progress }) => {
            setQues(question);
            setAnswer(votes);
            console.log("ppp" + progress);
            setTimer(progress);
            setISPoll(true);
        })
    }, [])

    return (
        <div className='dashboard_container background_main_color'>
            <div className='dashboard_left_section'>
                <div className='dashboard_content_container'>
                    <GroupCall />
                </div>
            </div>
            <div className='dashboard_right_section background_secondary_color'>
                <div className='dashboard_active_users_list'>
                    {isPoll ? <PollComp question={quest} answer={answer} setAnswer={setAnswer} socket={socket} timer={timer} /> : ''}

                </div>

            </div>
        </div>
    )
}

export default TheRoom
