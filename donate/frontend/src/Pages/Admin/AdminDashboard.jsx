import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Style/AdminDashboard.scss';
import { SERVER_URL } from '../../Constants/main';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        pending: 0,
        approved: 0,
        finished: 0,
    });

    useEffect(() => {
        // Čia bus API kvietimas į back-end
        // Pvz. GET /api/stories/stats
        axios.get(`${SERVER_URL}/stories/stats`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
        // Simuliuojame duomenis:
        setTimeout(() => {
            setStats({
                pending: 5,
                approved: 12,
                rejected: 3,
            });
        }, 500);
    }, []);

    return (

        <div className="admin-dashboard">
            <h1 className="admin-dashboard__title">Administratoriaus valdymo skydas</h1>

            <div className="admin-dashboard__stats">
                <div className="card pending">
                    <h2>Laukiančios istorijos</h2>
                    {/* <p>{stats.pending}</p> */}
                </div>

                <div className="card approved">
                    <h2>Patvirtintos istorijos</h2>
                    {/* <p>{stats.approved}</p> */}
                </div>

                <div className="card rejected">
                    <h2>Atmestos istorijos</h2>
                    {/* <p>{stats.rejected}</p> */}
                </div>
            </div>

            <div className="admin-dashboard__actions">
                <button className="btn">Peržiūrėti laukiančias</button>
                <button className="btn btn-secondary">Valdyti vartotojus</button>
            </div>
        </div>
    );
};


