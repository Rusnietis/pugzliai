import { useContext } from 'react';
import { ParameterContext } from './Layout';

export default function Link({ href, children }) {
    const { path } = useContext(ParameterContext)
    return (
        <a className="nav-link" style={{
            color: path === href ? 'red' : 'orange'
        }} href={href}>{children}</a>
    );
}