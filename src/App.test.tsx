import { expect, it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.tsx';

describe('App component', () => {
  it('should render without errors', async () => {
    render(<App />);

    expect(screen.queryByText('Courses')).toBeInTheDocument();
  });
});
