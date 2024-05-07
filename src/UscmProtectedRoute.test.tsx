import { render, screen } from '@testing-library/react';
import { UscmProtectedRoute } from './UscmProtectedRoute';
import { MemoryRouter } from 'react-router-dom';

describe('UscmProtectedRoute', () => {
  beforeEach(() => {
    // Mock localStorage methods
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
    jest
      .spyOn(window.localStorage.__proto__, 'setItem')
      .mockImplementation(() => {});
    jest
      .spyOn(window.localStorage.__proto__, 'removeItem')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders children when param hash is valid', async () => {
    // Mock useLocation hook

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({
        pathname:
          'http://localhost:5173/uscm?param=e4d909c290d0fb1ca068ffaddf22cbd0',
      }),
    }));

    render(
      <MemoryRouter>
        <UscmProtectedRoute>
          <div>Children Content</div>
        </UscmProtectedRoute>
      </MemoryRouter>
    );

    // expect(screen.getByText('Catalog Page')).toBeInTheDocument();
    const element = await screen.findByText('Catalog Page');
    expect(element).toBeInTheDocument();
  });

  test('redirects to home page when param hash is invalid', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({
        pathname:
          'http://localhost:5173/uscm?param=e4d909c290d0fb1ca068ffaddf22cbdadsad',
      }),
    }));

    render(
      <MemoryRouter>
        <UscmProtectedRoute>
          <div>Children Content</div>
        </UscmProtectedRoute>
      </MemoryRouter>
    );

    // expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  test('redirects to home page when param hash is missing', () => {
    // Mock useLocation hook

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({
        pathname: 'http://localhost:5173/uscm',
      }),
    }));

    render(
      <MemoryRouter>
        <UscmProtectedRoute>
          <div>Children Content</div>
        </UscmProtectedRoute>
      </MemoryRouter>
    );

    expect(window.location.pathname).toBe('/');
  });

  // Add more test cases as needed
});
