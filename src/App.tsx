import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Assume you have this component
import { UscmProtectedRoute } from './UscmProtectedRoute';
import CatalogPage from './pages/CatalogPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/uscm" element={<UscmProtectedRoute>
          <Route path="/catalog" element={<CatalogPage />} /> // Use the 'CatalogPage' component as a JSX element
        </UscmProtectedRoute>} />
        <Route path="/catalog" element={<CatalogPage />} /> // Use the 'CatalogPage' component as a JSX element
      </Routes>
    </Router>
  );
};

export default App;
