import React, { useEffect, useRef, useState } from 'react'
import Timer from './Timer'
import Axios from 'axios';
import Poll from 'react-polls'
import { useParams } from 'react-router-dom';
const pollStyles1 = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'black'
}

function PollComponenet(props) {
    const { roomID } = useParams();
    const [pollAnswers, setPollAnswers] = useState([])
    const [test, setTest] = useState(true)
    const [duration, setDuration] = useState(props.timer)

    useEffect(() => {

        if (props.answer) {
            console.log("ddddd", props.answer)
            setPollAnswers(props.answer)
        }
    }, [props.answer])


    useEffect(() => {

        console.log("duratiiionn " + duration);
        if (duration == 1000) {
            props.setISPoll(false);
            props.setEnd(true);
            const newPoll = {
                question: props.question,
                room: roomID,
                answers: props.answer
            }
            Axios.post(`http://localhost:5000/api/poll/create`, newPoll).then((res) => {

                console.log(newPoll)
            })
        }
    }, [duration])
    useEffect(() => {

        props.socket.on('vote', ({ question, voteAnswer }) => {

            const newPollAnswers = props.answer.map(answer => {
                if (answer.option === voteAnswer) answer.votes++
                return answer
            })
            props.setAnswer(newPollAnswers);

        })

        console.log(props.timer)

    }, [])

    const handleVote = (voteAnswer, Answers) => {

        console.log(test)
        const { question } = props;
        props.socket.emit('vote', { question, voteAnswer });

    }

    return (
        <div>
            <header className='header'>
            </header>
            <main className='main'>
                <div>
                    {props.answer ?
                        <Poll question={props.question} answers={props.answer} onVote={voteAnswer => handleVote(voteAnswer, props.answer)} customStyles={pollStyles1} noStorage /> : ''}

                    <Timer

                        initialTime={props.timer}
                        tickFrequency={1000}
                        prog={setDuration}
                    />
                </div>
            </main>


        </div>
    )
}

export default PollComponenet
