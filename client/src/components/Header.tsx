// Imports
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Header.scss';

// Component
const Header: React.FC = () => (
    <header className="main-header w-100">
        <Navbar variant="dark">
            <Navbar.Brand className="font-weight-bold">Courses</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link>Sign In</Nav.Link>
                <Nav.Link>Sign Up</Nav.Link>
            </Nav>
        </Navbar>
    </header>
);

// Export
export default Header;
