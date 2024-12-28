import Gate from "../Auth/Gate";

export default function User({ user }) {


    return (
        <div className="user" style={{ 
            background: user?.temp ? 'red' : null }}>
            <div>{user.name}</div>


        </div>

    )
}