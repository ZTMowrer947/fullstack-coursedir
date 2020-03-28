// Imports
import { act, render } from '@testing-library/react';
import React from 'react';

import Loading from './Loading';

// Use fake timers
jest.useFakeTimers();

// Test Suite
describe('Loading component', () => {
    it('should render a spinner only after its delay has expires', () => {
        // Set delay
        const delay = 750;

        // Render component
        const { queryByTestId } = render(<Loading delay={delay} />);

        // Query for spinner
        let spinner = queryByTestId('spinner');

        // Expect spinner to not be present yet
        expect(spinner).toBeNull();

        // Advance timer to show spinner
        act(() => {
            jest.advanceTimersByTime(delay);
        });

        // Query for spinner again
        spinner = queryByTestId('spinner');

        // Expect spinner to now be present in document
        expect(spinner).toBeInTheDocument();
    });
});
