import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Style/AdminStories.scss';
import { SERVER_URL } from '../../Constants/main';

export default function AdminStories() {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
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

    // Istorijos gavimas ir Pattvirtinimas arba atmetimas

    const handleStatusChange = (id, newStatus) => {
        axios.put(`${SERVER_URL}/admin/stories/${id}`, { status: newStatus })
            .then(res => {
                setStories(prev =>
                    prev.map(story =>
                        story.id === id ? { ...story, status: newStatus } : story
                    )
                );
                setSelectedStory(prev =>
                    prev && prev.id === id ? { ...prev, status: newStatus } : prev
                );
            })
            .catch(err => {
                console.error("Klaida keičiant statusą:", err);
            });
    };


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
                            <tr key={story.id}>
                                <td>{story.title}</td>
                                <td>{story.surname}</td>
                                <td>
                                    <span className={`status ${story.status}`}>
                                        {story.status}
                                    </span>
                                </td>
                                <td >
                                    <button
                                        className="view"
                                        style={{ margin: '2px' }}
                                        onClick={() => setSelectedStory(story)}
                                    >
                                        Peržiūrėti
                                    </button>

                                    {story.status === "pending" && (
                                        <>
                                            <button
                                                className="approve"
                                                onClick={() => handleStatusChange(story.id, "approved")}
                                            >
                                                Patvirtinti
                                            </button>
                                            <button
                                                className="reject"
                                                style={{ margin: '2px' }}
                                                onClick={() => handleStatusChange(story.id, "rejected")}
                                            >
                                                Atmesti
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* 🔹 Modal langas */}
            {selectedStory && (
                <div className="modal-overlay" onClick={() => setSelectedStory(null)}>
                    <div
                        className="modal"
                        onClick={(e) => e.stopPropagation()} // kad neuzdarytų paspaudus viduje
                    >
                        <button className="close" onClick={() => setSelectedStory(null)}>
                            ✖
                        </button>

                        <h2>{selectedStory.title}</h2>
                        <p className="author">
                            Autorius: {selectedStory.writerName}
                        </p>
                        <p className={`status ${selectedStory.status}`}>
                            {selectedStory.status}
                        </p>
                        {/* {console.log("Story image path:", selectedStory?.image)} */}
                        <div className="preview-photo" >
                            {selectedStory?.image ? (
                                <img style={{ objectFit: 'contain' }}
                                    src={`http://localhost:3001/${selectedStory.image}`}
                                    alt={selectedStory.title}
                                />
                            ) : (
                                <img src="/images/no-image.jpg" alt="no image" />
                            )}
                        </div>

                        <div className="content">{selectedStory.story}</div>

                        {selectedStory.status === "pending" && (
                            <div className="actions">
                                <button
                                    className="approve"
                                    onClick={() =>
                                        handleStatusChange(selectedStory.id, "approved")
                                    }
                                >
                                    Patvirtinti
                                </button>
                                <button
                                    className="reject"
                                    onClick={() =>
                                        handleStatusChange(selectedStory.id, "rejected")
                                    }
                                >
                                    Atmesti
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );


}
