// ReferrerGuard.tsx

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


const CommonProtectedRoute = ({ children }: { children: ReactNode }) => {

      const domainHash = localStorage.getItem('domainHash');
      const currentTime = new Date().getTime();
      const lastSavedTime = localStorage.getItem('lastSavedTime');
      const timeDuration = lastSavedTime
        ? currentTime - parseInt(lastSavedTime)
        : 0;

      if (!domainHash || !lastSavedTime) {
        localStorage.removeItem('domainHash');
        localStorage.removeItem('lastSavedTime');
        return <Navigate to="/" />;
      }

      console.log('timeDuration', timeDuration);

      if (domainHash && lastSavedTime && timeDuration > 24 * 60 * 60 * 1000) {
        // remove the hash in localStorage
        localStorage.removeItem('domainHash');
        localStorage.removeItem('lastSavedTime');
        return <Navigate to="/" />;
      }

      if (
        domainHash &&
        lastSavedTime &&
        !(timeDuration > 24 * 60 * 60 * 1000)
      ) {
        return children;
      }

};

export default CommonProtectedRoute;
