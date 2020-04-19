import React from 'react';
import Header from '../Header/Header';
import Cards from '../Card/Cards';
import Table from '../Table/Table';

// Components
export default function Dashboard() {
    return (
        <div className="main">
            <Header />
            <Cards />
            <Table />
        </div>
    )
}