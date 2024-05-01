// Import necessary libraries
// Remove the duplicate import statement for the 'render' function
// import { render } from '@testing-library/react';
// Remove the duplicate import statement for 'CatalogPage'
// import CatalogPage from './CatalogPage'; // Adjust this import path to match your project structure

// Test suite for CatalogPage
import '@testing-library/jest-dom/extend-expect'; // Import the necessary library

import { render } from '@testing-library/react'; // Import the necessary library

// Import necessary libraries
import CatalogPage from './CatalogPage'; // Adjust this import path to match your project structure

// Test suite for CatalogPage
import '@testing-library/jest-dom/extend-expect'; // Import the necessary library

import { screen } from '@testing-library/react'; // Import the necessary library

import '@testing-library/jest-dom';


describe('CatalogPage', () => {
  // Test case: CatalogPage renders without crashing
  it('renders without crashing', () => {
    // Render CatalogPage
    render(<CatalogPage />);

    // Check if CatalogPage has been rendered
    expect(screen.getByTestId('catalog-page')).toBeInTheDocument(); // Use screen instead of getByTestId
  });
});

describe('CatalogPage', () => {
  // Test case: CatalogPage renders without crashing
  it('renders without crashing', () => {
    // Render CatalogPage
    const { getByTestId } = render(<CatalogPage />);

    // Check if CatalogPage has been rendered
    expect(getByTestId('catalog-page')).toBeInTheDocument();
  });

  // Test case: CatalogPage redirects to home page if the hash does not match
  it('redirects to home page if the hash does not match', () => {
    // Mock the useLocation hook
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({
        search: '?param=invalidHash',
      }),
    }));

    // Render CatalogPage
    const { getByText } = render(<CatalogPage />);

    // Check if the redirect component is rendered
    expect(getByText('Redirecting to home page...')).toBeInTheDocument();
  });

  // Test case: CatalogPage saves the userHash in localStorage if the last saved time is more than 2 minutes ago
  it('saves the userHash in localStorage if the last saved time is more than 2 minutes ago', () => {
    // Mock the useLocation hook
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({
        search: '?param=6a49f67ed8e5e478391b7496381f4047',
      }),
    }));

    // Mock the localStorage getItem and setItem methods
    const localStorageMock = (() => {
      let store: { [key: string]: string } = {}; // Add type annotation to specify keys of type string
      return {
        getItem: jest.fn((key) => store[key]),
        setItem: jest.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: jest.fn(() => {
          store = {};
        }),
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    // Set the last saved time to more than 2 minutes ago
    const currentTime = new Date().getTime();
    const twoMinutesAgo = currentTime - 2 * 60 * 1000;
    localStorage.setItem('lastSavedTime', twoMinutesAgo.toString());

    // Render CatalogPage
    render(<CatalogPage />);

    // Check if the userHash is saved in localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('userHash', '6a49f67ed8e5e478391b7496381f4047');
  });
});