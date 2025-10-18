import Gate from "../Auth/Gate";

export default function User({ user }) {


    return (
        <div className="user" style={{
            background: user?.temp ? 'red' : null
        }} >
            <div className="about">
                <div className="name">{user.username}</div>
                <div className="role">{user.role}</div>
            </div>
            <div className="actions">
                <a href={'#users/edit/' + user.id} className="edit">Change Role</a>
                <a href={'#users/delete/' + user.id} className="delete">Delete</a>
            </div>
        </div>
    )
}