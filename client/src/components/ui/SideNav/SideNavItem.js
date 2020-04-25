import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link, withRouter} from 'react-router-dom';

function SideNavItem(props) {
    const {href, svgIcon, text} = props;
    return (
        <li className="nav-item">
            <Link to={href} className="nav-link">
                <FontAwesomeIcon icon={svgIcon} size="2x" className="svg fa-primary fa-secondary" />
                <span className="link-text">{text}</span>
            </Link>
        </li>
    )
}

export default withRouter(SideNavItem)
