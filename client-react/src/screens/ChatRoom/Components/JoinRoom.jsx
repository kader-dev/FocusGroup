import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import * as webRTCGroupCallHandler from "../../../utils/webRTC/webRTCGroupCallHandler";

const JoinRoom = ({ history }) => {
    const [roomId, setRoomId] = useState("");

    const handleChange = e => {
        setRoomId(e.target.value);
    };

    const handleSubmit = () => {
        //webRTCGroupCallHandler.joinGroupCall("gg", roomId);
        history.push("/room/" + roomId)
    };
    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            <ToastContainer />
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>

                        <div className='w-full flex-1 mt-8 text-indigo-500'>
                            <div className='flex flex-col items-center'>





                                <span className='ml-4'>Welcome to FOCUS GP</span>

                            </div>
                            <div className='my-12 border-b text-center'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Please enter the Room ID in the email
                                </div>
                            </div>
                            <form
                                className='mx-auto max-w-xs relative '
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    type='text'
                                    placeholder='Room ID'
                                    onChange={handleChange}
                                    value={roomId}
                                />
                                <button
                                    disabled={roomId.length == 0}
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                                    <span className='ml-3'>Join room</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            ;
        </div>
    );
};

export default JoinRoom;
