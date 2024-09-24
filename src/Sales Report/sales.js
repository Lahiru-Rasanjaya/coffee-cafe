import React, { useState, useEffect, useCallback } from "react"; 
import "./sales.css";
import Nav from './components/navigation/nav'

export default function Sales() {
  const [itemName, setItemName] = useState(""); // State to store the inputted item name
  const [month, setMonth] = useState(""); // State to store the inputted month
  const [year, setYear] = useState(""); // State to store the inputted year
  const [day, setDay] = useState(""); // State to store the inputted day
  const [salesData, setSalesData] = useState([]); // State to store fetched sales data

  // Fetch sales data from the backend API
  const fetchSalesData = useCallback(() => {
    let query = `http://localhost/egaleeyesstore/Billinsert/salesReport.php`;
    const params = new URLSearchParams();

    if (itemName) {
      params.append("itemName", itemName);
    }
    if (month) {
      params.append("month", month);
    }
    if (year) {
      params.append("year", year);
    }
    if (day) {
      params.append("day", day);
    }

    query += `?${params.toString()}`; // Add query parameters to the URL

    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        // Convert item_price and item_quantity to numbers if they're strings
        const formattedData = data.map(sale => ({
          ...sale,
          item_price: Number(sale.item_price),
          item_quantity: Number(sale.item_quantity)
        }));
        setSalesData(formattedData); // Store fetched data
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  }, [itemName, month, year, day]); // Add dependencies for itemName, month, year, and day

  // Fetch data immediately when the component mounts
  useEffect(() => {
    fetchSalesData(); // Call to fetch sales data on component mount
  }, [fetchSalesData]); // Add fetchSalesData to the dependency array

  return (
    <div>
      <div className="sales">
        <Nav />
      </div>
      <div className="Salescontainer">
        <h1 className="sales-header">Sales Report</h1>
        <form onSubmit={(e) => { e.preventDefault(); }} className="searchForm">
          <div className="SalesDateAndPric">
            <div className="itemName-Price enterDetails">
              <h3 className="item-label">Enter Item Name:</h3>
              <input
                type="text"
                placeholder="(e.g., Latte)"
                className="input-text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)} // Update state on input change
              />
            </div>
            <div className="itemDate enterDetails">
              <h3 className="item-label">Enter Year:</h3>
              <input
                type="text"
                className="input-text"
                placeholder="(e.g., 2024)"
                value={year}
                onChange={(e) => setYear(e.target.value)} // Update state on input change
              />
            </div>
            <div className="itemDate enterDetails">
              <h3 className="item-label">Enter Month:</h3>
              <input
                type="text"
                className="input-text"
                placeholder="(e.g., 09)"
                value={month}
                onChange={(e) => setMonth(e.target.value)} // Update state on input change
              />
            </div>
            <div className="itemDate enterDetails">
              <h3 className="item-label">Enter Day:</h3>
              <input
                type="text"
                className="input-text"
                placeholder="(e.g., 08)"
                value={day}
                onChange={(e) => setDay(e.target.value)} // Update state on input change
              />
            </div>            
          </div>
          <div className="searchButton">
            <button type="button" className="search-button" onClick={fetchSalesData}>
              Search
            </button>
          </div>
        </form>
        <table className="sales-table">
          <thead className="table-header">
            <tr>
              <th>Item Name</th>
              <th>Price (Rs.)</th>
              <th>Quantity Sold</th>
              <th>Total Sales (Rs.)</th>
              <th>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {salesData.length > 0 ? (
              salesData.map((sale, index) => (
                <tr key={index} className="table-row">
                  <td>{sale.itemName}</td>
                  <td>{sale.item_price.toFixed(2)}</td>
                  <td>{sale.item_quantity}</td>
                  <td>{(sale.item_quantity * sale.item_price).toFixed(2)}</td>
                  <td>{new Date(sale.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No sales data found.</td>
              </tr>
            )}
          </tbody>
          {salesData.length > 0 && (
            <tfoot className="table-footer">
              <tr>
                <td colSpan="3">Total Sales</td>
                <td>
                  {salesData.reduce(
                    (total, sale) => total + (sale.item_quantity * sale.item_price),
                    0
                  ).toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
