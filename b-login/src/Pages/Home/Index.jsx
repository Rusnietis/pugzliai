import TopNav from "../TopNav";
import { useContext } from 'react';
import { Auth } from '../../Contexts/Auth';
import Gate from "../Auth/PageGate";

export default function Index() {

    const { user } = useContext(Auth);
    console.log(user);

    return (
        <div>
            <TopNav />
            <h1>Home</h1>
            <div className="content">
                <p>Welcome to the home page</p>
                <p>Click on the links above to navigate </p>
                <a href={'#users/delete/' + user?.id}>Delete account</a>
                {/* <Gate roles="editor|viewer"><a href={'#users/delete/' + user?.id}>Delete account</a></Gate> */}
            </div>

        </div>
    )
}