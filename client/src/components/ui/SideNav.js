import React from 'react';
import { faHome, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import SideNavItem from './SideNavItem';
import Logo from './Logo';

export default function SideNav() {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <Logo href="#" svgIcon={faAngleDoubleRight} text="COVID-19" />
                <SideNavItem href="#" svgIcon={faHome} text="Dashboard" />        
            </ul>
        </nav>
    )
}
