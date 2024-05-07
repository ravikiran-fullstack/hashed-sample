import { ReactNode } from 'react';

import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import savedHash from './savedHashes.json';

export const UscmProtectedRoute = ({ children }: { children: ReactNode }) => {
  console.log('--------------UscmProtectedRoute--------------');
  // This is the pre-saved hash you will compare against

  // React Router's useLocation hook to access query parameters
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to extract the 'param' value from the URL
  const getQueryParam = () => {
    const query = new URLSearchParams(location.search);
    return query.get('param');
  };

  const removeQueryParam = (param: string) => {
    const searchParams = new URLSearchParams(location.search);
    console.log('searchParams', searchParams.toString());
    searchParams.delete(param);
    console.log('searchParams', searchParams.toString());
    navigate({ ...location, search: searchParams.toString() });
  };

  // Retrieve the 'param' query parameter
  const paramHash = getQueryParam();

  if (!paramHash) {
    const lastSavedTime = localStorage.getItem('lastSavedTime');
    const domainHash = localStorage.getItem('domainHash');

    if(!domainHash || !lastSavedTime) {
      localStorage.removeItem('domainHash');
      localStorage.removeItem('lastSavedTime');
      return <Navigate to="/" />;
    }
    
    if (domainHash && lastSavedTime && parseInt(lastSavedTime) > 24 * 60 * 60 * 1000) {
      // remove the hash in localStorage
      localStorage.removeItem('domainHash');
      localStorage.removeItem('lastSavedTime');
      return <Navigate to="/" />;
    }
  }

  // Compare the retrieved 'param' value with the saved hash
  if (paramHash && savedHash.includes(paramHash)) {
    // Save the domainHash in localStorage if the last saved time is more than 2 minutes ago
    // Check if the last saved time is more than 2 minutes ago
    const lastSavedTime = localStorage.getItem('lastSavedTime');
    const currentTime = new Date().getTime();
    if (
      lastSavedTime &&
      currentTime - parseInt(lastSavedTime) > 24 * 60 * 60 * 1000
    ) {
      // Save the hash in localStorage
      localStorage.setItem('domainHash', paramHash);
    }

    // Update the last saved time in localStorage
    localStorage.setItem('lastSavedTime', currentTime.toString());
    removeQueryParam('param');
    // Render the Catalog page content
    const uscmEnabled = true;
    return uscmEnabled ? <Navigate to="/catalog" /> : <>{children}</>;
  } else {
    // Redirect to the home page if the hash does not match
    return <Navigate to="/" />;
  }
};
