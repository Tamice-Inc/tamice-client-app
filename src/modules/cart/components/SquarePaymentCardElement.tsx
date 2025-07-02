import { useEffect, useState } from "react";
import {
  ApplePay,
  GooglePay,
  CreditCard,
  PaymentForm,
} from "react-square-web-payments-sdk";
import SquarePaymentForm from "@square/web-sdk";

export const SquarePaymentCardElement = (props: {
  setToken: (token: any) => any;
  handleSubmit: () => any;
}) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [card, setCard] = useState<any>(null);

  useEffect(() => {
    const applicationId = process.env.REACT_APP_APPLICATION_ID || "";
    const locationId = process.env.REACT_APP_LOCATION_ID;
    if (window.Square) {
      const payments = window.Square.payments(applicationId, locationId);
      payments.card().then((card: any) => {
        setCard(card);
        card.attach("#card-container");
      });
    }
  }, []);

  const handlePayment = async () => {
    try {
      const result = await card.tokenize();
      if (result.status === "OK") {
        console.log(`Payment token is ${result.token}`);
        setPaymentStatus("Payment Successful");
      } else {
        let errorMessage = `Tokenization failed with status: ${result.status}`;
        if (result.errors) {
          errorMessage += ` and errors: ${JSON.stringify(result.errors)}`;
        }
        throw new Error(errorMessage);
      }
    } catch (e) {
      console.error(e);
      setPaymentStatus("Payment Failed");
    }
  };

  return (
    <div id="payment-form">
      <div id="payment-status-container">{paymentStatus}</div>
      <div id="card-container"></div>
      <button id="card-button" type="button" onClick={handlePayment}>
        결제하기
      </button>
    </div>
  );
};
