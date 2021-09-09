/* This example requires Tailwind CSS v2.0+ */
import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'


export default function Example(props) {

    const [items, setItems] = useState([]);
    useEffect(() => {
        getParticipants();
    }, [])
    const getParticipants = () => {
        Axios.get(`http://localhost:5000/api/user/all`).then((res) => {
            setItems(res.data);
            console.log(items)
        })
    }
    return (

        <div>
            <div class="relative  self-center">
                <label class="mb-2 text-m font-light text-gray-800 sm:text-l dark:text-white" for="animals">
                    Client:
                    <select name="client" onChange={props.setClient} class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                        <option></option>
                        {items && items.length > 0 ? items.map((item, key) => (

                            item.role == "client" ? <option value={item.name}>{item.name} </option> : ''

                        )) : ''}

                    </select>
                </label>
            </div>
        </div>
    )
}
