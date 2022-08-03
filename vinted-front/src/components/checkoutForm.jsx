import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./styles/checkoutForm-styles.scss";

const CheckoutForm = () => {
  const { price, name } = useParams();

  const stripe = useStripe();
  const elements = useElements();

  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // recuperer les codes de cartes écrits
      const cardElement = elements.getElement(CardElement);
      // demandaer a stripe le token
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "l'id de l'acheteur",
      });
      //   console.log("stripeResponse", stripeResponse);
      const stripeToken = stripeResponse.token.id;
      console.log("~ stripeToken", stripeToken);

      /// je recois bien le token
      if (stripeToken) {
        // jjenvoie le token au serveur
        const response = await axios.post("http://localhost:4000/payment", {
          stripeToken,
          cost: price,
          description: name,
        });

        console.log("~ response.data", response.data);

        if (response.data === "succeeded") {
          setPurchaseCompleted(true);
        }
      }
    } catch (error) {
      console.log("errorCheckoutForm", error.response.data);
    }
  };

  return (
    <>
      {purchaseCompleted ? (
        <div className="purchase--completed">
          <h2>Bravo achat effectué avec succès !!</h2>
          <p>Vous allez le recevoir : hier</p>
          <p>Adios.</p>
        </div>
      ) : (
        <div className="checkout--panel">
          <div className="checkout--infos">
            <div>
              <p>Produit :</p>
              <p>{name}</p>
            </div>
            <div>
              <p>Prix</p>
              <p>{price} €</p>
            </div>
          </div>
          <div className="checkout--form">
            <form onSubmit={handleSubmit}>
              <CardElement />
              <input type="submit" value="Acheter" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
