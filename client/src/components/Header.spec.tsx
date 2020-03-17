// Import
import { render } from '@testing-library/react';
import React from 'react';
import { StaticRouter } from 'react-router-dom';

import Header from './Header';

// Test Suite
describe('Header component', () => {
    it('should render signup and signin links', () => {
        // Render component
        const { getByTestId } = render(
            <StaticRouter>
                <Header />
            </StaticRouter>
        );

        // Get links to test
        const signupLink = getByTestId('signup');
        const signinLink = getByTestId('signin');

        // Expect link hrefs to link to correct pages
        expect(signupLink).toHaveAttribute('href', '/signup');
        expect(signinLink).toHaveAttribute('href', '/signin');
    });
});
