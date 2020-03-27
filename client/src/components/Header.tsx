// Imports
import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

import AuthContext from '../context/AuthContext';

import './Header.scss';

// Component
const Header: React.FC = () => {
    // Get user data from AuthContext
    const { user } = useContext(AuthContext);

    return (
        <header className="main-header w-100 bg-primary">
            <Navbar variant="dark">
                <Navbar.Brand className="font-weight-bold">
                    Courses
                </Navbar.Brand>
                <Nav className="ml-auto">
                    {user ? (
                        <>
                            <Nav.Item
                                as="span"
                                className="m-2 text-center text-white"
                                data-testid="greeting"
                            >
                                Welcome {user.firstName} {user.lastName}!
                            </Nav.Item>
                            <LinkContainer to="/signout" exact>
                                <Nav.Link data-testid="signout">
                                    Sign Out
                                </Nav.Link>
                            </LinkContainer>
                        </>
                    ) : (
                        <>
                            <LinkContainer to="/signup" exact>
                                <Nav.Link data-testid="signup">
                                    Sign Up
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/signin" exact>
                                <Nav.Link data-testid="signin">
                                    Sign In
                                </Nav.Link>
                            </LinkContainer>
                        </>
                    )}
                </Nav>
            </Navbar>
        </header>
    );
};
// Export
export default Header;
