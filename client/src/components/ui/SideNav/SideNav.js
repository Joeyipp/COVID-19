import React from 'react';
import { faHome, faNewspaper, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';


import SideNavItem from './SideNavItem';
import Logo from './Logo';

function SideNav() {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <Logo href="/" svgIcon={faAngleDoubleRight} text="COVID-19" />
                <SideNavItem href="/" svgIcon={faHome} text="Dashboard" />
                <SideNavItem href="/news" svgIcon={faNewspaper} text="News" />  
            </ul>
        </nav>
    )
}

export default SideNav;
