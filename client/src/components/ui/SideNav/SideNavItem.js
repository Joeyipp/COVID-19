import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SideNavItem(props) {
    const {href, svgIcon, text} = props;
    return (
        <li className="nav-item">
            <a href={href} className="nav-link">
                <FontAwesomeIcon icon={svgIcon} size="2x" className="svg fa-primary fa-secondary" />
                <span className="link-text">{text}</span>
            </a>
        </li>
    )
}
