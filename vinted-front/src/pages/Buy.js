import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/checkoutForm";

const stripePromise = loadStripe(
  "pk_test_51LSOf9CgaEeFj6OyvldyzXBBgIdgtfychiutWoQeVlIMZgZdjw9Oy9lOgCszTDeGRQB8m1kpYICh9z5fT6XwauJc00bus5hle2"
);

const Buy = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default Buy;
