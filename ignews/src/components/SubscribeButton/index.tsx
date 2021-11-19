import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
};

export function SubscribeButton ({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();
    const router = useRouter();

    async function handleSubscription () {
        if (!session) {
            return signIn('github');
        }

        if (session.activeSubscription) {
            return router.push('/posts');
        }

        try {
            const response = await api.post('/subscribe');
            const { sessionId } = response.data;
        
            const stripe = await getStripeJs();

            stripe.redirectToCheckout({ sessionId });
        } catch(e) {
            console.log(e);
            alert(e.message);
            // Time 05:50
        }
    };

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscription}
            >
            Subscribe Now
        </button>
    );
}