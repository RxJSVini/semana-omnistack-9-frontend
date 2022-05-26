import "./styles.css";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from 'react-router-dom';
import socketio from "socket.io-client";


function Dashboard() {

    const [spots, setSpots] = useState([{}]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const user_id = localStorage.getItem("@aircnc_id");
        const socket = socketio(process.env.REACT_APP_URL, {
            transports: ['websocket'],
            rejectUnauthorized: false,
            query: {user_id}
        });
        socket.on("booking_request", data => {
            setRequests([...requests, data]);

        })

    }, [requests ])

    useEffect(() => {

        async function loadSpots() {
            const user_id = localStorage.getItem("@aircnc_id");

            const response = await api.get("/dashboard", {
                headers: { user_id }
            });

            setSpots(response.data);

        }

        loadSpots()
    }, []);

    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`);
     

        setRequests(requests.filter(request => request._id !== id))
    }
    async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id))
    }

    return (

        <>
            <ul className="notifications">
                {requests.map(request => {
                    return (
                        <>
                            <li key={request._id}>
                                <p>
                                <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                                    
                                </p>
                                <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                                <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>

                            </li>
                        </>
                    )
                })}
            </ul>

            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>

        </>
    )

}
export { Dashboard };