// Imports
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// State
const initialState = {
    error: null as Error | null,
};
type State = Readonly<typeof initialState>;

// Component
export default class ErrorBoundary extends React.PureComponent<{}, State> {
    readonly state: State = initialState;

    constructor(props: {}) {
        super(props);

        this.onReloadButtonClick = this.onReloadButtonClick.bind(this);
    }

    static getDerivedStateFromError<T extends Error = Error>(error: T): State {
        // Attach error into state for rendering fallback UI
        return { error };
    }

    onReloadButtonClick() {
        this.setState({ error: null });
    }

    render() {
        // If an error was caught,
        if (this.state.error) {
            // Render fallback UI
            return (
                <Container fluid className="h-100">
                    <Row className="h-100">
                        <Col xs={2} md={3} xl={4} />
                        <Col
                            xs={8}
                            md={6}
                            xl={4}
                            className="h-100 d-flex flex-column align-items-center"
                        >
                            <header className="mt-5 text-center">
                                <h1>Oh my!</h1>

                                <p>
                                    An unexpected error occurred in the
                                    application. Press the button below to
                                    reload the app.
                                </p>

                                <p>
                                    If this error recurs, please try again
                                    later.
                                </p>
                            </header>

                            <main className="d-flex flex-column align-items-center">
                                <Button
                                    variant="primary"
                                    onClick={this.onReloadButtonClick}
                                    className="mb-3"
                                >
                                    Reload App
                                </Button>

                                {process.env.NODE_ENV === 'development' ? (
                                    <pre>{this.state.error.stack}</pre>
                                ) : (
                                    <pre>
                                        {this.state.error.name}:{' '}
                                        {this.state.error.message}
                                    </pre>
                                )}
                            </main>
                        </Col>
                        <Col xs={2} md={3} xl={4} />
                    </Row>
                </Container>
            );
        }

        // Otherwise, render children
        return this.props.children;
    }
}
