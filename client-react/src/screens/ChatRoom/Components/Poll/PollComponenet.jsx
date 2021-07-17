import React, { useEffect, useRef, useState } from 'react'

import Poll from 'react-polls'
const pollStyles1 = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'black'
}

function PollComponenet(props) {

    const [pollAnswers, setPollAnswers] = useState([])
    const [test, setTest] = useState(true)

    const initialRender = useRef(false);
    useEffect(() => {

        if (props.answer) {
            console.log("ddddd", props.answer)
            setPollAnswers(props.answer)
        }
    }, [props.answer])


    useEffect(() => {

        props.socket.on('vote', ({ question, voteAnswer }) => {

            const newPollAnswers = props.answer.map(answer => {
                if (answer.option === voteAnswer) answer.votes++
                return answer
            })
            props.setAnswer(newPollAnswers);

        })



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
                </div>
            </main>


        </div>
    )
}

export default PollComponenet
