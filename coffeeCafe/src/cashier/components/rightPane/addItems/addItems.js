import React, { useEffect, useState } from "react";
import axios from "axios";
import "./addItems.css";
import DeleteIcon from "@mui/icons-material/Delete";
import eventBus from "../../leftPane/Item/eventBus"; 
import '../total/total.css';

export default function AddItems() {
  const [items, setItems] = useState([]); 
  const [amount, setAmount] = useState(0);   
  const [showGenerateBill, setShowGenerateBill] = useState(false); 
  const [showPlaceOrder, setShowPlaceOrder] = useState(true); 
  const [showAmountBalance, setShowAmountBalance] = useState(false); 
  const [currentDate, setCurrentDate] = useState(""); 
  const [currentTime, setCurrentTime] = useState(""); 

  useEffect(() => {
    const handleDataChange = (newData) => {
      const price = parseFloat(newData.price);
      if (isNaN(price)) {
        console.error("Invalid price value:", newData.price);
        return;
      }

      const exists = items.some(item => item.name === newData.name && item.price === price);
      if (!exists) {
        setItems(prevItems => [...prevItems, { ...newData, price, quantity: 1 }]); 
      }
    };

    eventBus.on('dataChanged', handleDataChange); 

    return () => {
      eventBus.off('dataChanged', handleDataChange); 
    };
  }, [items]);

  const increaseQuantity = (index) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], quantity: newItems[index].quantity + 1 }; 
      return newItems;
    });
  };

  const decreaseQuantity = (index) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      if (newItems[index].quantity > 1) {
        newItems[index] = { ...newItems[index], quantity: newItems[index].quantity - 1 }; 
      }
      return newItems;
    });
  };

  const deleteItem = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = () => {
    setShowPlaceOrder(false); 
    setShowAmountBalance(true);
  };

  const handleGenerateBill = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    setCurrentDate(date);
    setCurrentTime(time);
    setShowGenerateBill(true); 

    setShowPlaceOrder(false);
    setShowAmountBalance(false);
  };

 
  const handlePrint = () => {
    const billData = {
      items: items,
      totalAmount: calculateTotal(),
      date: currentDate,
      time: currentTime
    };

    axios.post("http://localhost:5000/cashier/bills", billData)
      .then(response => {
        console.log("Bill inserted:", response.data);
        window.location.href = `/Home`;
      })
      .catch(error => {
        console.error("Error inserting bill:", error);
      });
  };

  return (
    <div className="div">
      {!showGenerateBill ? (
        <>
          <div className="addItem-container">
            <table>
              <tbody className="itemcolour">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="namePrice">
                          <span className="name colour">{item.name}</span>
                          <span className="price colour">
                            Rs. <span>{item.price.toFixed(2)}</span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="plusAndMinus">
                          <button className="minus" onClick={() => decreaseQuantity(index)}>-</button>
                          <input type="text" className="ItemNumber" value={item.quantity} readOnly />
                          <button className="plus" onClick={() => increaseQuantity(index)}>+</button>
                        </div>
                      </td>
                      <td align="center">
                        <div className="delete">
                          <button onClick={() => deleteItem(index)}><DeleteIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No Items Added</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="AllItemTotal">
            <div className="itemTotal">
              <div className="addItem-container">
                <table>
                  <tr className='tableAlign'>
                    <td>
                      <div className="namePrice">
                        <span className="name Totalcolour">Total</span>
                      </div>
                    </td>
                    <td className="DisplayTotal">
                      <span className="rs">RS.&nbsp;</span> <input type="text" className="displyTotals" value={calculateTotal().toFixed(2)} readOnly />
                    </td>
                  </tr>
                </table>
              </div>
              <div className="AllItemTotal">
                    <div className="itemTotal">
                      <div className="addItem-container">
                        <table>
                          <tr className="tableAlign">
                            <td className="namePrice amount">
                              <span className="name Totalcolour">AMOUNT</span>
                              <div className="DisplayTotal">
                                <span className="RS">RS.&nbsp;</span> 
                                <input type="text" className="balanceInputBox" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} />
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
              {showPlaceOrder && ( 
                <button className="oder" onClick={handlePlaceOrder} disabled={items.length === 0}>
                  Place Order
                </button>
              )}
              <div></div>
              {showAmountBalance && (
                <>
            
                  <div className="AllItemTotal">
                    <div className="itemTotal">
                      <div className="addItem-container">
                        <table>
                          <tr className="tableAlign">
                            <td className="namePrice Balance">
                              <span className="name Totalcolour">BALANCE</span>
                              <div className="DisplayTotal">
                                 <span className="RS">RS.&nbsp;</span> 
                                 <input type="text" className="balanceInputBox" placeholder="Balance" value={(amount - calculateTotal()).toFixed(2)} readOnly />
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {showAmountBalance && (
                <button className="oder" onClick={handleGenerateBill}  disabled={items.length === 0} >Generate Bill</button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="GenarateBill">
          <div>
            <div className="bill-content">
            <div className="star">
              <span>**********************************************************</span>
              <h3>Coffee Cafe</h3>
              <span>**********************************************************</span>
            </div>
            <table>
              <tr>
                <td colSpan={'5'} className="DateTimes">
                  <div className="dateTime">
                    <span className="billDate">{currentDate}</span> 
                    <span className="billTime">{currentTime}</span>
                  </div>        
                </td>
              </tr>
              <tr>
                <td colSpan={'5'}>
                  <span>------------------------------------</span>
                </td>
              </tr>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="itemcount">
                    <span>{item.quantity}</span>                
                  </td>
                  <td>X</td>
                  <td>
                    <span className="ItemName">{item.name}</span>
                  </td>
                  <td className="OneItemPrices">
                    <span><span>Rs.&nbsp;</span>{item.price.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={'5'}>------------------------------------</td>
              </tr>
              <tr>
                <td colSpan={'3'} className="totalAmount">
                  <h4><span>Total Amount</span></h4>
                </td>
                <td className="totalprice">
                <h4><span>Rs.&nbsp;{calculateTotal().toFixed(2)}</span></h4>
                </td>
              </tr>
              <tr>
                <td colSpan={'5'}>------------------------------------</td>
              </tr>
            </table>
            </div>
            <div className="print">
              <button className="oder" onClick={handlePrint}>PRINT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
