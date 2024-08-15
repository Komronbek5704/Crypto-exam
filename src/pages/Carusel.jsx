import React from "react";
import { Carousel } from "flowbite-react";

const Carusel = ({ cryptos }) => {
  const groupedItems = [];
  for (let i = 0; i < cryptos.length; i += 4) {
    groupedItems.push(cryptos.slice(i, i + 4));
  }

  return (
    <div className="background h-[450px] pt-10">
      <div className="m-auto">
        <p className="text-center text-[60px] font-[700] text-[#87CEEB]">
          CRYPTOFOLIO WATCH LIST
        </p>
        <p className="text-[#A9A9A9] text-center text-[14px] font-[400]">
          Get All The Info Regarding Your Favorite Crypto
        </p>
        <p className="text-[#A9A9A9] text-center text-[14px] font-[400]">
          Currency
        </p>
      </div>
      <div className="h-[180px] mt-14 m-auto">
        <Carousel indicators={false} leftControl="left" rightControl="right">
          {groupedItems.map((itemGroup, index) => (
            <div
              key={index}
              className="h-56 sm:h-64 xl:h-80 2xl:h-96 flex items-center justify-around w-[1280px]"
            >
              {itemGroup.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <img
                    className="object-contain w-[80px] h-[80px] mb-2"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="text-center flex items-center gap-2">
                    <p className="font-[400] text-white text-[16px]">
                      {item.symbol.toUpperCase()}
                    </p>
                    <p
                      className={`text-[16px] ${
                        item.price_change_percentage_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                  <p className="text-white text-[21px]">
                    ${item.current_price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Carusel;
