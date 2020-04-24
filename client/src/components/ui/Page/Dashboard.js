import React from 'react';
import Header from '../Header/Header';
import Cards from '../Card/Cards';
import Table from '../Table/Table';
import Map from '../Map/Map';

// Components
export default function Dashboard() {
    return (
        <div className="main">
            <Header />
            <Cards />
            <div className="table-wrapper">
                <Table />
                <Map />
            </div>
        </div>
    )
}