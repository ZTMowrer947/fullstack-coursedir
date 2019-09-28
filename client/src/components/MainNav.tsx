// Imports
import React from "react";
import Nav from "react-bootstrap/Nav";
import "./MainNav.scss";

// Component
const MainNav: React.FC = () => {
    return (
        <Nav className="d-inline-flex justify-content-end align-items-center flex-grow-1">
            <Nav.Item>
                <Nav.Link className="signup" href="/signup">
                    Sign Up
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="signin" href="/signin">
                    Sign In
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

// Export
export default MainNav;
