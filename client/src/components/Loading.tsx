// Imports
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

// Prop Types
interface DefaultPropTypes {
    delay: number;
}

type PropTypes = Partial<DefaultPropTypes>;

// Component
const Loading: React.FC<PropTypes> = ({ delay }) => {
    // Initialize state
    const [shouldShow, setShouldShow] = useState(false);

    // Setup timer
    useEffect(() => {
        // If we are already displaying a spinner, do nothing else
        if (shouldShow) return;

        // Setup timer based on delay
        const timer = window.setTimeout(() => {
            // When timer expires, show spinner
            setShouldShow(true);
        }, delay);

        // On unmount,
        return () => {
            // Clear timer
            window.clearTimeout(timer);
        };
    }, [shouldShow]);

    // Show spinner when delay expires
    return shouldShow ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="border" data-testid="spinner" />
        </div>
    ) : null;
};

// Default props
Loading.defaultProps = {
    delay: 500,
};

// Export
export default Loading;
