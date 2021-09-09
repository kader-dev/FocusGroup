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
import Hand from './Components/HandRaise/Hand';
import Axios from 'axios';
import { getCookie, isAuth, signout } from '../../helpers/auth';
import { FaHandPaper } from "react-icons/fa";
import { toast } from 'react-toastify';
const socket = io.connect('http://localhost:5000');
function TheRoom({ history }) {
    const [isPoll, setISPoll] = useState(false)
    const [endPoll, setEndPoll] = useState(false)
    const [isHand, setIsHand] = useState(false)
    const [quest, setQues] = useState('');
    const [answer, setAnswer] = useState([]);
    const [notification, setNotification] = useState([]);
    const [timer, setTimer] = useState(0);
    const [name, setName] = useState('');


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

    useEffect(() => {
        socket.on('hand', ({ name }) => {
            setName(name)
            setIsHand(true);

        })
    }, [])


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password1: "",
        textChange: "Update",
        role: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        const token = getCookie("token");
        Axios.get(`http://localhost:5000/api/user/${isAuth()._id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                const { role, name, email } = res.data;
                setFormData({ ...formData, role, name, email });
            })
            .catch((err) => {
                toast.error(`Error To Your Information ${err.response.statusText}`);
                if (err.response.status === 401) {
                    signout(() => {
                        history.push("/login");
                    });
                }
            });
    };
    return (
        <div className='dashboard_container background_main_color'>
            <div className='dashboard_left_section'>
                <div className='dashboard_content_container'>
                    <GroupCall />
                </div>
            </div>
            <div className='dashboard_right_section background_secondary_color'>
                <div className='dashboard_active_users_list'>
                    <div class="flex flex-col max-w-5xl px-4 py-8 dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                        <div class="self-center mb-2 text-xl blue-700 sm:text-3xl dark:text-white">
                            Notifications
                        </div>
                    </div>

                    {isPoll ? <PollComp question={quest} answer={answer} setAnswer={setAnswer} socket={socket} timer={timer} setISPoll={setISPoll} setEnd={setEndPoll} /> : ''}
                    {isHand && formData.role == 'admin' ? <Hand name={name} icon={<FaHandPaper className="hand" />} text=" raised his hand!" /> : ''}

                </div>

            </div>
        </div>
    )
}

export default TheRoom
