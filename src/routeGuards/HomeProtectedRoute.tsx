import { ReactNode, useEffect } from 'react';

import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import savedHash from '../savedHashes.json';

export const HomeProtectedRoute = ({ children }: { children: ReactNode }) => {
  console.log('--------------UscmProtectedRoute--------------');
  const location = useLocation();
  const navigate = useNavigate();

   console.log('--------------ReferrerGuard outside--------------');
   console.log('document.referrer', document.referrer);
   useEffect(() => {
     console.log('--------------ReferrerGuard inside--------------');
     console.log('document.referrer', document.referrer);
     if (document.referrer !== 'http://localhost:5174/') {
       navigate('/');
     }
   }, [navigate]);

  // Helper function to extract the 'param' value from the URL
  const getQueryParam = () => {
    const query = new URLSearchParams(location.search);
    return query.get('param');
  };

  const removeQueryParam = (param: string) => {
    const searchParams = new URLSearchParams(location.search);
    // console.log('searchParams', searchParams.toString());
    searchParams.delete(param);
    // console.log('searchParams', searchParams.toString());
    navigate({ ...location, search: searchParams.toString() });
  };

  // Retrieve the 'param' query parameter
  const paramHash = getQueryParam();

  // Compare the retrieved 'param' value with the saved hash
  if (paramHash && savedHash.includes(paramHash)) {
    console.log(
      'paramHash && savedHash.includes(paramHash)',
      paramHash, paramHash && savedHash.includes(paramHash)
    );
    // Save the domainHash in localStorage if the last saved time is more than 2 minutes ago
    // Check if the last saved time is more than 2 minutes ago
    const lastSavedTime = localStorage.getItem('lastSavedTime');
    const currentTime = new Date().getTime();
    if(!lastSavedTime){
      localStorage.setItem('lastSavedTime', currentTime.toString());
      localStorage.setItem('domainHash', paramHash);
    }

    if (
      lastSavedTime &&
      currentTime - parseInt(lastSavedTime) > 24 * 60 * 60 * 1000
    ) {
      // Save the hash in localStorage
      console.log('inside', paramHash);
      localStorage.setItem('domainHash', paramHash);
      localStorage.setItem('lastSavedTime', currentTime.toString());
    }

    // Update the last saved time in localStorage
    
    removeQueryParam('param');
    // Render the Catalog page content
    const uscmEnabled = true;
    return uscmEnabled ? <Navigate to="/catalog" /> : <>{children}</>;
  } else {
    // Redirect to the home page if the hash does not match
    return <Navigate to="/" />;
  }
};
