import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Style/AdminDashboard.scss';
import { SERVER_URL } from '../../Constants/main';

export default function AdminDashboard() {
    const [status, setStatus] = useState([]);

    useEffect(() => {
        // Čia bus API kvietimas į back-end
        // Pvz. GET /api/stories/stats
        axios.get(`${SERVER_URL}/stories/status`)
            .then(res => {
                console.log(res.data)
                setStatus(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    const pending = status.find(item => item.status === 'pending')?.count || 0;
    const approved = status.find(item => item.status === 'approved')?.count || 0;
    const rejected = status.find(item => item.status === 'rejected')?.count || 0;

    return (

        <div className="admin-dashboard">
            <h1 className="admin-dashboard__title">Administratoriaus valdymo skydas</h1>

            <div className="admin-dashboard__stats">
                <div className="card pending">
                    <h2>Laukiančios istorijos</h2>
                    <p>{pending}</p>
                </div>

                <div className="card approved">
                    <h2>Patvirtintos istorijos</h2>
                    <p>{approved}</p>
                </div>

                <div className="card rejected">
                    <h2>Atmestos istorijos</h2>
                    <p>{rejected}</p>
                </div>
            </div>

            <div className="btn">
                <Link to={'/admin/stories'} style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    marginRight: '10px'
                }}>Peržiūrėti istorijas</Link>
                <Link
                style={{
                    backgroundColor: "#cb1b1bff",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                }}
                >Valdyti vartotojus</Link>
            </div>
        </div>
    );
};


