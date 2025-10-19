import Gate from "../Auth/Gate";
import '../../Style/users.scss';  
import { Link } from "react-router-dom";

export default function User({ user }) {


    return (
        <div className="user" style={{
            background: user?.temp ? 'red' : null
        }} >
            <div className="about">
                <div className="name">{user.name}</div>
                <div className="role">{user.role}</div>
            </div>
            <div className="actions">
                <a href={'#users/edit/' + user.id} className="edit">Change Role</a>
                <Link to={'/users/delete/' + user.id} className="delete">Delete</Link>
                {/* <a href={'#users/delete/' + user.id} className="delete">Delete</a> */}
            </div>
        </div>
    )
}