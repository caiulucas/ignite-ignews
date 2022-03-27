import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/axios';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

export const SubscribeButton: React.FC = () => {
  const [session] = useSession();
  const route = useRouter();

  async function handleSubscribe() {
    if (!session) return signIn('github');

    if (session?.activeSubscription) return route.push('/posts');

    try {
      const { data } = await api.post('/subscribe');

      const { sessionId } = data;

      const stripe = await getStripeJs();

      return await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      return alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
};
