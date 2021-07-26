import React from 'react'
import { FaHandPaper } from "react-icons/fa";
import './Hand.css'
function Hand(props) {
    return (
        <div class="flex ">
            <div class="m-auto w-screen">
                <div class="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
                    <div class="flex flex-row">
                        <div class="px-2">
                            <div>
                                {props.icon}
                            </div>
                        </div>
                        <div class="ml-2 mr-6">
                            <span > <b>{props.name}</b> {props.text} </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hand
