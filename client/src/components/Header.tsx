// Imports
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

import './Header.scss';

// Component
const Header: React.FC = () => (
    <header className="main-header w-100">
        <Navbar variant="dark">
            <Navbar.Brand className="font-weight-bold">Courses</Navbar.Brand>
            <Nav className="ml-auto">
                <LinkContainer to="/signup" exact>
                    <Nav.Link data-testid="signup">Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signin" exact>
                    <Nav.Link data-testid="signin">Sign In</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    </header>
);

// Export
export default Header;
