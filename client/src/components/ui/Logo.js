import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Logo(props) {
    const {href, svgIcon, text} = props;
    return (
        <li className="logo">
            <a href={href} className="nav-link">
                <span className="link-text logo-text">{text}</span>
                <FontAwesomeIcon icon={svgIcon} size="lg" className="svg fa-primary fa-secondary" />
            </a>
        </li>
    )
}
