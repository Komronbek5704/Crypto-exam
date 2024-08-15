import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomNavbar from "./Navbar";
import LineChart from "../components/PriceChart";
import Loader from "./Loader";

const CryptoChart = () => {
    const { cryptoId } = useParams();
    const [crypto, setCrypto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [delayedLoading, setDelayedLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCrypto = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
                if (!response.ok) {
                    navigate("/404");
                    return;
                }
                const result = await response.json();
                setCrypto(result);
            } catch {
                navigate("/404");
            } finally {
                setLoading(false);
            }
        };

        fetchCrypto();
    }, [cryptoId, navigate]);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => setDelayedLoading(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    if (loading || delayedLoading) {
        return <Loader />;
    }

    return (
        <div className="bg-[#14161A] min-h-screen">
            <CustomNavbar />
            <div className="container mx-auto p-5 flex gap-5">
                <div className="flex flex-col border-r-2 border-gray-500 text-white w-[500px] box-border">
                    <img className="h-[200px]  w-[200px] mb-5 mx-auto" src={crypto.image.large} alt={crypto.name} />
                    <h1 className="text-4xl font-bold text-center  mb-5">{crypto.name}</h1>
                    <div className="flex flex-col pt-5 gap-3">
                        <p className={`text-white text-[16px] font-[400] ${crypto.description.en.length === 0 ? "h-0 overflow-hidden" : "overflow-hidden h-[162px]"}`}>
                            {crypto.description.en}
                        </p>
                        <h3 className="text-white text-[24px] font-[700]">Rank: {crypto.market_cap_rank}</h3>
                        <p className="text-white text-[24px] font-[700]">Current Price: ${crypto.market_data.current_price.usd}</p>
                        <p className="text-white text-[24px] font-[700]">Market Cap: ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex-1">
                <LineChart priceData={crypto.market_data.current_price.usd} />
                </div>
            </div>
        </div>
    );
};

export default CryptoChart;
