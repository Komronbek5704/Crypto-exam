import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const generateData = () => {
    const start = 2920000;
    const end = 3080000;
    const increment = 20000;
    const data = [];
    
    let currentValue = start;
    while (currentValue <= end) {
        data.push(currentValue);
        currentValue += increment;
    }

    return data;
};

const PriceChart = () => {
    const [timeFrame, setTimeFrame] = useState('24h');

    const data = {
        series: [
            {
                name: 'Price in INR',
                data: generateData()
            }
        ],
        options: {
            chart: {
                type: 'line',
                background: '#14161A',
                toolbar: {
                    show: true
                }
            },
            xaxis: {
                categories: ["00:00", "00:15", "00:45", "01:00", "01:15", "01:45", "02:00", "02:15", "02:45", 
                             "03:00", "03:15", "03:45", "04:00", "04:15", "04:45", "05:00", "05:15", "05:45", 
                             "06:00", "06:15", "06:45", "07:00", "07:15", "07:45", "08:00", "08:15", "08:45", 
                             "09:00", "09:15", "09:45", "10:00", "10:15", "10:45", "11:00", "11:15", "11:45", 
                             "12:00", "12:15", "12:45", "13:00", "13:15", "13:45", "14:00", "14:15", "14:45", 
                             "15:00", "15:15", "15:45", "16:00", "16:15", "16:45", "17:00", "17:15", "17:45", 
                             "18:00", "18:15", "18:45", "19:00", "19:15", "19:45", "20:00", "20:15", "20:45", 
                             "21:00", "21:15", "21:45", "22:00", "22:15", "22:45", "23:00", "23:15", "23:45"],
                labels: {
                    show: true,  
                    style: {
                        colors: '#333',
                        fontSize: '12px'
                    }
                },
                axisBorder: {
                    color: '#555'
                },
                axisTicks: {
                    color: '#555'
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#333'
                    }
                },
                axisBorder: {
                    color: '#555'
                },
                axisTicks: {
                    color: '#555'
                }
            },
            stroke: {
                curve: 'smooth',
                width: 3,
                colors: ['#87CEEB']
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    gradientToColors: ['#87CEEB'],
                    shadeIntensity: 0.8,
                    type: 'horizontal',
                    opacityFrom: 0.6,
                    opacityTo: 0.1,
                    stops: [0, 100]
                }
            },
            grid: {
                borderColor: '#555',
                strokeDashArray: 6
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: '#333'
                }
            }
        }
    };

    const handleTimeFrameChange = (frame) => {
        setTimeFrame(frame);
    };

    return (
        <div className="text-[#333] min-h-screen flex flex-col items-center p-5 bg-[#14161A]">
            <h1 className="text-3xl font-bold mb-4">Price Chart (Past {timeFrame})</h1>
            <div className="w-full max-w-[1200px] bg-[#14161A] ">
                <Chart options={data.options} series={data.series} type="line" height={400} />
            </div>
            <div className="mt-6 flex gap-20">
                <button
                    className={`w-[130px] h-[41px] text-left px-4 py-2 rounded border-[#87CEEB] border-[1px] ${timeFrame === "1d" ? "bg-[#87CEEB] text-white" : "bg-[#333] text-white"}`}
                    onClick={() => handleTimeFrameChange('1d')}
                >
                    1 Day
                </button>
                <button
                    className={`w-[130px] h-[41px] text-left px-4 py-2 rounded border-[#87CEEB] border-[1px]  ${timeFrame === "30d" ? "bg-[#87CEEB] text-white" : "bg-[#333] text-white"}`}
                    onClick={() => handleTimeFrameChange('30d')}
                >
                    30 Days
                </button>
                <button
                    className={`w-[130px] h-[41px] text-left px-4 py-2 rounded border-[#87CEEB] border-[1px]  ${timeFrame === "3m" ? "bg-[#87CEEB] text-white" : "bg-[#333] text-white"}`}
                    onClick={() => handleTimeFrameChange('3m')}
                >
                    3 Months
                </button>
                <button
                    className={`w-[160px] h-[41px] text-left px-4 py-2 rounded border-[#87CEEB] border-[1px] ${timeFrame === "1y" ? "bg-[#87CEEB] text-white" : "bg-[#333] text-white"}`}
                    onClick={() => handleTimeFrameChange('1y')}
                >
                    1 Year
                </button>
            </div>
        </div>
    );
};

export default PriceChart;
