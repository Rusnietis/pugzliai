import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Style/AdminStories.scss';
import { SERVER_URL } from '../../Constants/main';

export default function AdminStories() {
    const [stories, setStories] = useState([]);
    //   const [loading, setLoading] = useState(true);
    //   const [error, setError] = useState(null);

    // 🔹 Gauti istorijas iš backend

    useEffect(_ => {
        axios.get(`${SERVER_URL}/admin/stories`)
            .then(res => {
                console.log(res.data)
                setStories(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);





    //if (loading) return <p>Kraunama...</p>;
    //if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="admin-stories">
            <h1>Istorijos</h1>

            {stories.length === 0 ? (
                <p>Nėra istorijų.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Pavadinimas</th>
                            <th>Autorius</th>
                            <th>Statusas</th>
                            <th>Veiksmai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map((story) => (
                            <tr key={story._id}>
                                <td>{story.title}</td>
                                <td>{story.authorName}</td>
                                <td>
                                    <span className={`status ${story.status}`}>
                                        {story.status}
                                    </span>
                                </td>
                                <td>
                                    {story.status === "pending" ? (
                                        <>
                                            <button
                                                className="approve"
                                                onClick={() => handleApprove(story._id)}
                                            >
                                                Patvirtinti
                                            </button>
                                            <button
                                                className="reject"
                                                onClick={() => handleReject(story._id)}
                                            >
                                                Atmesti
                                            </button>
                                        </>
                                    ) : (
                                        <em>{story.status === "approved" ? "✅ Patvirtinta" : "❌ Atmesta"}</em>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
