import { useContext } from 'react';
import { Auth } from '../../Contexts/Auth';


export default function Gate({ children, roles }) {

    const { user } = useContext(Auth);

    const hasRole = _ => {
        const rolesArray = roles.split('|');
        //console.log(rolesArray);
        return user && rolesArray.includes(user.role);
    }

    return (
        <div>
            {
                hasRole() && children
            }
        </div>
    );
}