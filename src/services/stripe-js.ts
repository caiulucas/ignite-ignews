import { loadStripe, Stripe } from '@stripe/stripe-js';

export const getStripeJs = async (): Promise<Stripe> => {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  return stripeJs;
};
