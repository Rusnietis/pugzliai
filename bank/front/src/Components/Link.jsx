import { useContext } from 'react';
import { Router } from '../Contexts/Router';

export default function Link({ href, children }) {

    const { route } = useContext(Router);

    const isActive = route === href; // lyginam route su href
    const classes = `nav-link${isActive ? ' active' : ''}`;

    return (
        <a className={classes} href={href}>{children}</a>
    )

}