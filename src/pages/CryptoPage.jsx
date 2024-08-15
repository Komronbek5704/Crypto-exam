import React, { useState, useEffect } from "react";
import { Table, Button, Drawer } from "flowbite-react";
import { Link } from "react-router-dom";
import Carusel from "./Carusel";
import CustomNavbar from "./Navbar";
import Loader from "./Loader";
import NotFound from "../pages/404";

const CryptoPage = () => {
  const [cryptoData, updateCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedCryptos, setSelectedCryptos] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [drawerVisible, toggleDrawerVisible] = useState(false);
  const [currency, setCurrency] = useState("INR");

  const resultsPerPage = 10;

  useEffect(() => {
    const retrieveData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&sparkline=false&price_change_percentage=24h`
        );
        if (!response.ok) throw new Error(`HTTP error!: ${response.status}`);
        const fetchedData = await response.json();
        updateCryptoData(fetchedData);
      } catch (err) {
        setFetchError(err);
      } finally {
        setIsLoading(false);
      }
    };

    retrieveData();
  }, [currency]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("savedCryptos")) || [];
    setSelectedCryptos(savedList);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCryptos", JSON.stringify(selectedCryptos));
  }, [selectedCryptos]);

  const changePage = (page) => setPageIndex(page);

  const toggleCryptoSelection = (crypto) => {
    const cryptoId = crypto.id;
    setSelectedCryptos((previousSelection) =>
      previousSelection.find((item) => item.id === cryptoId)
        ? previousSelection.filter((item) => item.id !== cryptoId)
        : [...previousSelection, crypto]
    );
  };

  const openDrawer = () => toggleDrawerVisible(true);
  const closeDrawer = () => toggleDrawerVisible(false);

  const updateSearchText = (e) => setFilterText(e.target.value);

  const removeCrypto = (cryptoId) => {
    setSelectedCryptos((previousSelection) =>
      previousSelection.filter((item) => item.id !== cryptoId)
    );
  };

  const filteredCryptos = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(filterText.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCryptos.length / resultsPerPage);
  const paginatedCryptos = filteredCryptos.slice(
    (pageIndex - 1) * resultsPerPage,
    pageIndex * resultsPerPage
  );

  if (isLoading) return <Loader />;
  if (fetchError) return <NotFound />;

  return (
    <div className="overflow-x-auto bg-[#14161A]">
      <CustomNavbar
        handleDrawerOpen={openDrawer}
        onCurrencyChange={setCurrency}
      />
      <Carusel cryptos={selectedCryptos} />
      <div className="flex flex-col justify-center">
        <h1 className="text-center text-[34px] font-[400] mb-6 mt-8 text-white">
          Cryptocurrency Prices by Market Cap
        </h1>
        <input
          type="text"
          placeholder="Search For a Crypto Currency.."
          className="w-[1232px] p-3 outline-[#515151] border-[#515151] bg-[#16171A] m-auto mb-5 text-white hover:outline-none"
          value={filterText}
          onChange={updateSearchText}
        />
      </div>
      <div className="w-[1232px] m-auto">
        <Table className="w-[1232px] bg-[#16171A] h-[60px]">
          <Table.Head>
            <Table.HeadCell className="bg-[#87CEEB] text-sm text-[#000000] py-4">
              Coin
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#87CEEB] text-sm text-[#000000] pl-96">
              Price
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#87CEEB] text-sm text-[#000000] pl-20">
              24H Change
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#87CEEB] text-sm text-[#000000] pl-36">
              Market Cap
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {paginatedCryptos.map((crypto) => {
              const cryptoId = crypto.id;
              const isSelected = selectedCryptos.some(
                (item) => item.id === cryptoId
              );
              const changeClass =
                crypto.price_change_percentage_24h > 0
                  ? "text-[#0ECB81]"
                  : "text-[#FF0000]";
              return (
                <Table.Row
                  key={cryptoId}
                  className={`h-[93.5px] dark:border-gray-700 dark:bg-gray-800 cursor-pointer border-[#515151]`}
                  onClick={() => toggleCryptoSelection(crypto)}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white pr-40 py-10">
                    <div className="flex items-center gap-3">
                      <div>
                        <img
                          className="w-[50px]"
                          src={crypto.image}
                          alt={crypto.name}
                        />
                      </div>
                      <div>
                        <Link
                          to={`/crypto/${crypto.id}`}
                          className="text-[22px] text-white font-[400]"
                        >
                          {crypto.symbol.toUpperCase()}
                        </Link>
                        <h4 className="text-[#A9A9A9] font-[400] text-[14px]">
                          {crypto.name}
                        </h4>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="">
                    <p className="pl-48 text-end  text-white">
                      {currency === "INR" && "₹"}
                      {currency === "USD" && "$"}
                      {currency === "EUR" && "€"}
                      {currency === "GBP" && "£"}
                      {currency === "JPY" && "¥"}
                      {crypto.current_price.toLocaleString()}
                    </p>
                  </Table.Cell>
                  <Table.Cell className={`  ${changeClass}`}>
                    <div className="flex items-center  justify-center gap-[18px]">
                      <button className="" onClick={openDrawer}>
                        <svg
                          width="27px"
                          height="27px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                            fill="#FFFF"
                            stroke="#FFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                            stroke={isSelected ? "#0ECB81" : "#FFFF"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <p className={changeClass}>
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-white text-end  text-sm">
                    {currency === "INR" && "₹"}
                    {currency === "USD" && "$"}
                    {currency === "EUR" && "€"}
                    {currency === "GBP" && "£"}
                    {currency === "JPY" && "¥"}
                    {crypto.market_cap.toLocaleString()}M
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>

      <div className="m-auto flex justify-center mb-10 mt-5">
        <div className="flex items-center gap-3">
          <Button onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}>
            {"<"}
          </Button>
          {[1, 2, 3, 4, 5].map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => setPageIndex(pageNumber)}
              className={
                pageNumber === pageIndex ? "bg-[#87CEEB] text-black" : ""
              }
            >
              {pageNumber}
            </Button>
          ))}
          <span>...</span>
          <Button onClick={() => setPageIndex(totalPages)}>{totalPages}</Button>
          <Button
            onClick={() =>
              setPageIndex((prev) => Math.min(prev + 1, totalPages))
            }
          >
            {">"}
          </Button>
        </div>
      </div>

      <Drawer
        open={drawerVisible}
        onClose={closeDrawer}
        position="right"
        className="bg-[#515151] w-[511px] px-8"
      >
        <Drawer.Header/>
        <Drawer.Items>
          <h2 className="text-white text-[30px] text-center mb-6">WATCHLIST</h2>
          <div className="flex flex-wrap justify-between">
            {selectedCryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="mb-4 bg-[#14161A]  p-4 gap-2 rounded-[25px] w-[198px] h-[247px] flex flex-col items-center"
              >
                <img
                  className="w-[110px]"
                  src={crypto.image}
                  alt={crypto.name}
                />
                <h4 className="mt-3 text-[20px] text-white">
                  {currency === "INR" && "₹"}
                  {currency === "USD" && "$"}
                  {currency === "EUR" && "€"}
                  {currency === "GBP" && "£"}
                  {currency === "JPY" && "¥"}
                  {crypto.market_cap.toLocaleString()}
                </h4>
                <button
                  className="bg-[#FF0000] px-5 py-1 rounded text-white"
                  onClick={() => removeCrypto(crypto.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default CryptoPage;
