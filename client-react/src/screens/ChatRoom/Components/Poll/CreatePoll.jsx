import React, { useState, Fragment, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import io from 'socket.io-client'
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

const socket = io.connect('http://localhost:5000');

function CreatePoll(props) {
    const classes = useStyles();
    const [question, setquestion] = useState('')
    const [answers, setanswers] = useState([''])
    const [error, setError] = useState(false);




    const handleChange = (e, index) => {

        const options = [...answers];
        options[index] = e.target.value;
        setanswers(options);
        console.log(answers)
    }

    const handleQuestion = (e) => {
        setquestion(e.target.value);
    }

    const onSubmit = (e) => {
        if (question.length > 0 && answers.length > 1) {
            e.preventDefault();
            const votes = [];
            answers.map(a => {
                votes.push({ option: a, votes: 0 })
            })
            console.log(votes)
            socket.emit('poll', { question, votes });
            setanswers(['', '']);
            setquestion('');
            props.handleClose();
        } else {
            setError(true);
        }

    }
    return (

        <div>
            <Modal
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Fade in={props.open}>
                    <div class="flex flex-col max-w-5xl px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                        <div class="self-center mb-2 text-xl font-light text-gray-800 sm:text-3xl dark:text-white">
                            Create a new Poll
                        </div>
                        {error ? <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">

                            <span class="block sm:inline">Please enter the question and at least 2 answers</span>

                        </div> : ''}

                        <div class="p-6 mt-8">

                            <form action="#">
                                <div class="flex flex-col mb-2">
                                    <div class=" mb-2 text-xl font-light text-gray-800 sm:text-xl dark:text-white">
                                        Question:
                                    </div>
                                    <div class="max-w-xl w-full mx-auto ">
                                        <div class=" relative ">
                                            <input type="text" onChange={handleQuestion} id="create-account-pseudo" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="question" placeholder="Add the question" />
                                        </div>
                                    </div>
                                </div>
                                <div class=" mb-2 text-xl font-light text-gray-800 sm:text-xl dark:text-white">
                                    Answers: (minimum 2)
                                </div>

                                <div className="relative mb-2 ">

                                    <input onChange={(e) => handleChange(e, 0)} type="text" id="create-account-pseudo" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="option" placeholder="New option" />

                                </div>
                                <div className="relative mb-2">

                                    <input onChange={(e) => handleChange(e, 1)} type="text" id="create-account-pseudo" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="option" placeholder="New option" />

                                </div>
                                <div className="relative mb-2">

                                    <input onChange={(e) => handleChange(e, 2)} type="text" id="create-account-pseudo" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="option" placeholder="New option" />

                                </div>
                                <div className="relative mb-2">

                                    <input onChange={(e) => handleChange(e, 3)} type="text" id="create-account-pseudo" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="option" placeholder="New option" />

                                </div>
                                <div className="relative mb-2">

                                    <input onChange={(e) => handleChange(e, 4)} type="text" id="create-account-pseudo" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="option" placeholder="New option" />

                                </div>

                            </form>
                        </div>
                        <div class="flex w-full my-4">
                            <button type="button" onClick={onSubmit} class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Submit
                            </button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default CreatePoll
