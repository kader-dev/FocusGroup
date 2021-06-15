import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Axios from 'axios';
import Multiselect from './Multiselect'
import { uuid } from 'uuidv4';
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CreateRoomModal(props) {

    const classes = useStyles();

    const initialState = {
        id: "",
        name: "",
        description: "",
        duration: "",
        participants: [],
        client: "",
        startDate: "",
        state: "",
        link: "",
    };
    const [room, setRoom] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        console.log(props.open);
    }, [])

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    };

    const handleMulti = list => {

        setRoom({ ...room, participants: list });
        console.log(room)
    };

    const createRoom = () => {
        const data = {
            name: room.name,
            description: room.description,
            duration: room.duration,
            participants: room.participants,
            client: room.client,
            startDate: room.startDate,
            state: room.state,
            link: "http://localhost:5000" + uuid(),
        }
        Axios.post(`http://localhost:5000/api/room/create`, data).then((res) => {

            setRoom({
                name: res.data.name,
                description: res.data.description,
                duration: res.data.duration,
                participants: res.data.participants,
                client: res.data.client,
                startDate: res.data.startDate,
                state: res.data.state,
                link: res.data.link,
            })
            setSubmitted(true)
            console.log(data)
        })
    }

    return (
        <div >
            <Modal
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Fade in={props.open}>
                    <div class="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                        <div class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                            Create a new room
                        </div>
                        <div class="p-6 mt-8">
                            <form action="#">
                                <div class="flex flex-col mb-2">
                                    <div class=" relative ">
                                        <input value={room.name} onChange={handleInputChange} type="text" id="create-account-pseudo" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="name" placeholder="Name" />
                                    </div>
                                </div>
                                <div class="flex gap-4 mb-2">
                                    <div class=" relative ">
                                        <input value={room.description} onChange={handleInputChange} type="text" id="create-account-first-name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="description" placeholder="Description" />
                                    </div>
                                    <div class=" relative ">
                                        <input value={room.duration} onChange={handleInputChange} type="text" id="create-account-last-name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="duration" placeholder="Duration" />
                                    </div>
                                </div>
                                <Multiselect list={room.participants} setParticipants={handleMulti} />
                                <div class="flex w-full my-4">
                                    <button type="button" onClick={createRoom} class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
