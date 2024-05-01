import { useLocation, Navigate } from 'react-router-dom';

const CatalogPage = () => {
    // This is the pre-saved hash you will compare against
    const savedHash = '6a49f67ed8e5e478391b7496381f4047';

    // React Router's useLocation hook to access query parameters
    const location = useLocation();

    // Helper function to extract the 'param' value from the URL
    const getQueryParam = () => {
        const query = new URLSearchParams(location.search);
        return query.get('param');
    };

    // Retrieve the 'param' query parameter
    const paramHash = getQueryParam();

    // Compare the retrieved 'param' value with the saved hash
    if (paramHash === savedHash) {
        // Save the userHash in localStorage if the last saved time is more than 2 minutes ago
        // Check if the last saved time is more than 2 minutes ago
        const lastSavedTime = localStorage.getItem('lastSavedTime');
        const currentTime = new Date().getTime();
        if (lastSavedTime && currentTime - parseInt(lastSavedTime) > 24 * 60 * 60 * 1000) {
          // Save the hash in localStorage
          localStorage.setItem('userHash', paramHash);
        }

        // Update the last saved time in localStorage
        localStorage.setItem('lastSavedTime', currentTime.toString());

        // Render the Catalog page content
        return (
            <div>
                <h1>Catalog Page</h1>
                <p>Welcome to the catalog!</p>
                {/* Additional components and logic for your catalog can go here */}
            </div>
        );
    } else {
        // Redirect to the home page if the hash does not match
        return <Navigate to="/" />;
    }
};

export default CatalogPage;
