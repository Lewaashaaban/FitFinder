import React from "react";
import "./payment.css"; // Import your CSS styles
import MasterCardIcon from "../../Images/mastercard.png";
import VisaIcon from "../../Images/visa_card.png";
const PaymentPage = () => {
  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <div className="payment-options">
        <div className="payment-option">
          <img src={VisaIcon} alt="Visa" />
          <label htmlFor="visaCard">Visa Card</label>
          <input
            type="text"
            id="visaCard"
            placeholder="Enter Visa Card Number"
          />
        </div>

        <div className="payment-option">
          <img src={MasterCardIcon} alt="MasterCard" />
          <label htmlFor="masterCard">MasterCard</label>
          <input
            type="text"
            id="masterCard"
            placeholder="Enter MasterCard Number"
          />
        </div>
      </div>

      <button className="pay-button">Pay Now</button>
    </div>
  );
};

export default PaymentPage;
