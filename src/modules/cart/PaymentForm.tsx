import React, { useEffect, useRef } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MpCKJACe4fzyuYTJ7dhX6C5O2cMlxTseYRQlWL74jeAvYTg1TL9nU9shH0tNydkvLh4YRomOb4eG11M08SI9yCI00qCMUvVDY"
);

const PaymentForm = () => {
  const cardNumberRef: any = useRef();
  const cardExpiryRef: any = useRef();
  const cardCvcRef: any = useRef();

  useEffect(() => {
    const initStripe = async () => {
      const stripe: any = await stripePromise;
      const elements = stripe.elements();
      const style = {
        base: {
          fontSize: "16px",
          color: "#32325D",
          "::placeholder": {
            color: "#A0AEC0",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      };

      // Create separate instances of the card Element.
      const cardNumberElement: any = elements.create("cardNumber", { style });
      const cardExpiryElement: any = elements.create("cardExpiry", { style });
      const cardCvcElement: any = elements.create("cardCvc", { style });

      // Mount the card Elements to their respective divs.
      cardNumberElement.mount(cardNumberRef.current);
      cardExpiryElement.mount(cardExpiryRef.current);
      cardCvcElement.mount(cardCvcRef.current);

      // Create a token or display an error when the form is submitted.
      const form: any = document.getElementById("payment-form");
      form.addEventListener("submit", async (event: any) => {
        event.preventDefault();
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
          billing_details: {
            // Add any additional billing details here.
          },
        });
        if (error) {
          // Inform the customer that there was an error.
          const errorElement: any = document.getElementById("card-errors");
          errorElement.textContent = error.message;
        } else {
          // Send the payment method to your server.
          console.log("paymentMethod", paymentMethod);
          // stripePaymentMethodHandler(paymentMethod);
        }
      });
    };

    initStripe();
  }, []);

  // const stripePaymentMethodHandler = (paymentMethod) => {
  //   console.log(paymentMethod);
  //   // axios.post('/api/reservations/4/payments', {
  //   //     payment_method: paymentMethod.id,
  //   //     payment_type: 'Credit Card',
  //   // })
  //   // .then(function (response) {
  //   //     console.log(response);
  //   // })
  //   // .catch(function (error) {
  //   //     console.log(error);
  //   // });
  // };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <form
        id="payment-form"
        className="max-w-md p-6 mx-auto bg-white rounded shadow-md"
      >
        <div className="form-row">
          <label htmlFor="card-number" className="text-gray-700">
          카드 번호
          </label>
          <div
            ref={cardNumberRef}
            id="card-number"
            className="p-2 border border-gray-300 rounded"
          ></div>
        </div>
        <div className="form-row">
          <label htmlFor="card-expiry" className="text-gray-700">
            Expiration Date
          </label>
          <div
            ref={cardExpiryRef}
            id="card-expiry"
            className="p-2 border border-gray-300 rounded"
          ></div>
        </div>
        <div className="form-row">
          <label htmlFor="card-cvc" className="text-gray-700">
            CVC
          </label>
          <div
            ref={cardCvcRef}
            id="card-cvc"
            className="p-2 border border-gray-300 rounded"
          ></div>
        </div>
        <div id="card-errors" role="alert" className="mt-2 text-red-500"></div>
        <button className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
