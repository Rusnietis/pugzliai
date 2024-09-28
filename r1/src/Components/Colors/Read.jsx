import { Show } from "./Show";

export default function Read({ colors, setDeleteData, setEditData }) {

    return (
        <div className="card">

            <div className="card-header">
                <h2>Colors</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                        colors.map(color => <li key={color.id} className="list-group-item"><Show color={color} setDeleteData={setDeleteData} setEditData={setEditData}/></li>)
                    }
                </ul>
            </div>

        </div>

    );



}