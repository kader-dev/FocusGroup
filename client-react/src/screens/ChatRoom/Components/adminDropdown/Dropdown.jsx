import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import './Dropdown.css'
import CreatePoll from '../Poll/CreatePoll'
import { saveAs } from 'file-saver'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
const styles = {
    button: {
        width: '50px',
        height: '50px',
        borderRadius: '40px',
        border: '2px solid #e6e5e8',
        textDecoration: 'none',
        backgroundColor: '#282C34',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '10px',
        boxShadow: 'none',
        borderImage: 'none',
        borderStyle: 'none',
        borderWidth: '0px',
        outline: 'none'
    }
};
export default function Dropdown({ click, changeText }) {
    const { roomID } = useParams();
    const [open, setOpen] = useState(false);
    const [recording, setRecording] = useState(false);
    const handleClose = () => {
        setOpen(false);
        console.log("closed")
    }

    const createRec = (name) => {
        const data = {
            link: "Z:/downloads/" + name,
            room: roomID,
            date: new Date()
        }
        Axios.post(`http://localhost:5000/api/rec/create`, data).then((res) => {

            console.log(data)
        })
    }

    const start = async () => {
        const data = [];
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: {

                mediaSource: "screen"
            }
        })

        const mediaRecroder = new MediaRecorder(stream);
        mediaRecroder.ondataavailable = (e) => {
            data.push(e.data);
            console.log(e.data);
        }
        mediaRecroder.start()
        mediaRecroder.onstop = (e) => {
            const name = `Video-${Date.now()}.webm`
            saveAs(URL.createObjectURL(new Blob(data, {
                type: data[0].type,
            })), name);
            setRecording(false);
            createRec(name);
        }
    }

    const startRec = () => {
        start()
        setRecording(true);
    }
    return (
        <div className="w-56 text-right fixed top-16" style={styles.button}>
            <CreatePoll open={open} handleClose={handleClose} setOpen={setOpen} />
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button >
                        <i class="fas fa-lg fa-ellipsis-v dropdown"></i>

                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute bottom-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        onClick={click}
                                    >

                                        {!changeText ? "Mute all" : 'Unmute all'}

                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        onClick={() => setOpen(true)}
                                    >

                                        Create poll

                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        onClick={!recording ? startRec : ''}
                                    >

                                        {recording ? '' : 'Start recording'}

                                    </button>
                                )}
                            </Menu.Item>

                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

function EditInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function EditActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}







