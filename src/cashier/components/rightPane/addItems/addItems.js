import React, { useEffect, useState } from "react";
import "./addItems.css";
import DeleteIcon from "@mui/icons-material/Delete";
import eventBus from "../../leftPane/Item/eventBus"; 
import '../total/total.css';

export default function AddItems() {
  const [items, setItems] = useState([]); 
  const [amount, setAmount] = useState(0);  // New state for amount
  const [showTotal, setShowTotal] = useState(false);  // To control showing total and balance
  const [showGenerateBill, setShowGenerateBill] = useState(false); // To control displaying "Generate Bill"
  const [showPlaceOrder, setShowPlaceOrder] = useState(true); // To control displaying "Place Order"
  const [showAmountBalance, setShowAmountBalance] = useState(false);  // To control display of amount and balance

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
    setShowTotal(true); // Show total and balance on button click
    setShowGenerateBill(true); // Show Generate Bill button
    setShowPlaceOrder(false); // Hide Place Order button
    setShowAmountBalance(true); // Show Amount and Balance input fields
  };

  return (
    <div className="div">
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
                  <span>RS.&nbsp;</span> <input type="text" className="displyTotals" value={calculateTotal().toFixed(2)} readOnly />
                </td>
              </tr>
            </table>
          </div>
          {showPlaceOrder && ( 
            <button 
              className="oder" 
              onClick={handlePlaceOrder} 
              disabled={items.length === 0} // Disable button if no items
            >
              Place Order
            </button>
          )}
          
          {/* Display Amount and Balance after Place Order is clicked */}
          {showAmountBalance && (
            <>
              <div className="AllItemTotal">
                <div className="itemTotal">
                  <div className="addItem-container">
                    <table>
                      <tr className="tableAlign">
                        <td className="namePrice amount">
                          <span className="name Totalcolour">AMOUNT</span>
                          <div className="DisplayTotal">
                            <input 
                              type="text" 
                              className="balanceInputBox" 
                              placeholder="Enter Amount" 
                              value={amount} 
                              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} 
                            />
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <div className="AllItemTotal">
                <div className="itemTotal">
                  <div className="addItem-container">
                    <table>
                      <tr className="tableAlign">
                        <td className="namePrice Balance">
                          <span className="name Totalcolour">BALANCE</span>
                          <div className="DisplayTotal">
                            <input 
                              type="text" 
                              className="balanceInputBox" 
                              placeholder="Balance" 
                              value={(amount - calculateTotal()).toFixed(2)} 
                              readOnly 
                            />
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {showGenerateBill && (
            <button className="oder">Generate Bill</button>
          )}
        </div>
      </div>
    </div>
  );
}
