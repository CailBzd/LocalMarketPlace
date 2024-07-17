import { GetServerSideProps } from 'next';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { clientSecret } = context.query;
  return {
    props: { clientSecret },
  };
};

const CheckoutPage = ({ clientSecret }: { clientSecret: string }) => {
  const options = {
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
