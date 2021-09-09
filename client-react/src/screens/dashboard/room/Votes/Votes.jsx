import Axios from 'axios';
import { json } from 'body-parser';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getCookie, isAuth, signout } from '../../../../helpers/auth';
import { DashboardLayout } from '../../Layout'
import { Doughnut } from 'react-chartjs-2'

function Votes(props, { history }) {

    const [roomTab, setRoomTab] = useState([]);
    const [votesTab, setVotesTab] = useState([]);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [done, setDone] = useState(false);
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
        setDone(true);

    };

    useEffect(() => {
        getMyRooms();
    }, [])

    const getMyRooms = () => {

        Axios.get(`http://localhost:5000/api/room/all`).then((res) => {
            setRoomTab(res.data);

        })
    }

    const func = (link) => {
        Axios.get(`http://localhost:5000/api/poll/find/` + link).then((res) => {
            if (res.data && res.data.length > 0) {
                setVotesTab(res.data);
                console.log(res.data)
            }
        })
    }

    const getVotes = () => {
        if (formData.role == "client") {
            roomTab.forEach(el => {

                if (el.client == formData.name) {
                    func(el.link)
                    console.log(votesTab)

                }
            });

            setIsLoading(true);
        } else {
            Axios.get(`http://localhost:5000/api/poll/all`).then((res) => {
                setVotesTab(res.data)
            })
        }
    }
    useEffect(() => {
        if (!isLoading) {
            getVotes();
        }
    }, [formData])



    const getAns = (a) => {
        const tab = [];
        a.forEach(el => {
            tab.push(el.votes);
        });
        return tab;
    }
    const getLabels = (a) => {
        const tab = [];
        a.forEach(el => {
            tab.push(el.option);
        });
        return tab;
    }

    return (
        <DashboardLayout>


            <div className="grid gap-6 m-8 md:grid-cols-4">
                {votesTab && votesTab.length > 0 ? votesTab.map((el) => (
                    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">{el.question}</p>
                        <Doughnut data={{
                            datasets: [
                                {
                                    data: getAns(el.answers),
                                    backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
                                },

                            ],
                            labels: getLabels(el.answers),
                        }} options={{
                            responsive: true,
                            cutoutPercentage: 80,
                        }} />
                    </div>


                )) : ''}

            </div>
        </DashboardLayout>
    )
}



export default Votes

