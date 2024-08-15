import React, { useState } from 'react';
import {  Link } from "react-router-dom";
import { Button, Navbar as FlowbiteNavbar } from "flowbite-react";

function Navbar({ handleDrawerOpen, onCurrencyChange }) {
    const [selectedCurrency, setSelectedCurrency] = useState("INR");

    const handleCurrencyChange = (event) => {
        const newCurrency = event.target.value;
        setSelectedCurrency(newCurrency);
        onCurrencyChange(newCurrency); 
    };

    return (
        <header className='bg-[#14161A] flex align-center text-center'>
            <FlowbiteNavbar className="w-[1240px] h-[64px] m-auto bg-[#14161A]">
                <Link to={"/"}>
                    <img className="h-[24px] items-center" src="/logo.svg" alt="loading" />
                </Link>
                <div className='h-[40px] flex gap-9 items-center'>
                    <select
                        className="bg-[#14161A] text-white p-2 border-none border-gray-700 rounded"
                        value={selectedCurrency}
                        onChange={handleCurrencyChange}
                    >   
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <Button className='bg-[#87CEEB] text-black h-[40px]' onClick={handleDrawerOpen}>
                        WATCH LIST
                    </Button>
                </div>
            </FlowbiteNavbar>
        </header>
    );
}

export default Navbar;
