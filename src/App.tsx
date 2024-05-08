import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Assume you have this component
import { HomeProtectedRoute } from './routeGuards/HomeProtectedRoute';
import CatalogPage from './pages/CatalogPage';
import CommonProtectedRoute from './routeGuards/CommonProtectedRoute';
import Navbar from './components/Navbar';
import Docs from './pages/Docs';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Resources from './pages/Resources';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/uscm"
          element={
            <HomeProtectedRoute>
              'CatalogPage' component as a JSX element
            </HomeProtectedRoute>
          }
        />
        <Route
          path="/catalog"
          element={
            <CommonProtectedRoute>
              <CatalogPage />
            </CommonProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <CommonProtectedRoute>
              <Dashboard />
            </CommonProtectedRoute>
          }
        />

        <Route
          path="/docs"
          element={
            <CommonProtectedRoute>
              <Docs />
            </CommonProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
};

export default App;
