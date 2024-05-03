import { render, screen } from '@testing-library/react';
import { UscmProtectedRoute } from './UscmProtectedRoute';
import { useLocation, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('UscmProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the children when the param hash matches and uscmEnabled is true', () => {
    // Mock the useLocation hook to return a query parameter hash that matches the saved hash
    (useLocation as jest.Mock).mockReturnValueOnce({
      search: '?param=validHash',
    });

    // Mock the localStorage getItem method to return a last saved time that is more than 2 minutes ago
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(
      String(new Date().getTime() - 3 * 60 * 1000)
    );

    // Mock the localStorage setItem method
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    // Mock the useNavigate hook
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValueOnce(mockNavigate);

    // Render the UscmProtectedRoute component
    render(
      <UscmProtectedRoute>
        <div data-testid="children">Children Content</div>
      </UscmProtectedRoute>
    );

    // Assert that the children content is rendered
    expect(screen.getByTestId('children')).toBeInTheDocument();

    // Assert that the localStorage setItem method is called with the correct arguments
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'userHash',
      'validHash'
    );

    // Assert that the localStorage getItem method is called with the correct argument
    expect(localStorage.getItem).toHaveBeenCalledWith('lastSavedTime');

    // Assert that the useNavigate hook is not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('redirects to the home page when the param hash does not match', () => {
    // Mock the useLocation hook to return a query parameter hash that does not match the saved hash
    (useLocation as jest.Mock).mockReturnValueOnce({
      search: '?param=invalidHash',
    });

    // Mock the useNavigate hook
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValueOnce(mockNavigate);

    // Render the UscmProtectedRoute component
    render(
      <UscmProtectedRoute>
        <div data-testid="children">Children Content</div>
      </UscmProtectedRoute>
    );

    // Assert that the component redirects to the home page
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});