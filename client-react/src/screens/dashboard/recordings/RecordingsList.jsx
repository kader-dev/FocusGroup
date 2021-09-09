import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { DashboardLayout } from '../Layout';
import Playlist from './Playlist';
import captureFrame from 'capture-frame'
import Axios from 'axios';
import { getCookie, isAuth, signout } from '../../../helpers/auth';
import { toast } from 'react-toastify';
function RecordingsList({ history }) {

    const [roomTab, setRoomTab] = useState([]);
    const [recTab, setRecTab] = useState([]);
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
    useEffect(() => {
        if (done) {
            console.log("role===" + formData.role)
            getClientRec();
            console.log(recTab);
        }

    }, [formData])

    const getClientRec = () => {
        const tab = [];
        if (formData.role == "client") {
            roomTab.forEach(el => {

                if (el.client == formData.name) {

                    Axios.get(`http://localhost:5000/api/rec/room/` + el.link).then((res) => {
                        if (res.data) {
                            res.data.forEach(element => {
                                tab.push(element);
                                console.log(tab);
                                setRecTab(tab)
                            });
                        }
                        setIsLoading(true)


                    })
                }
            });




        }



    }


    return (
        <DashboardLayout>

            <div class="relative flex flex-row items-center justify-center ">
                <Playlist url={require('Z:/downloads/Video-1627034569487.mp4')} recList={recTab} getRecs={getClientRec} />
            </div>

        </DashboardLayout>
    )
}

export default RecordingsList
