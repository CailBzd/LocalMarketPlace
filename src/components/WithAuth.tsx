import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { message } from 'antd';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        message.error('You need to be logged in to view this page.');
        setTimeout(() => {
          router.push('/');
        }, 3000); // Redirige après 3 secondes
      }
    }, [status, router]);

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'unauthenticated') {
      return <p>You need to be logged in to view this page. Redirecting to home...</p>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
