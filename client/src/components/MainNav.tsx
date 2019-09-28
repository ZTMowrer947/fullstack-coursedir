// Imports
import React from "react";
import Nav from "react-bootstrap/Nav";
import "./MainNav.scss";
import { LinkContainer } from "react-router-bootstrap";

// Component
const MainNav: React.FC = () => {
    return (
        <Nav className="d-inline-flex justify-content-end align-items-center flex-grow-1">
            <Nav.Item>
                <LinkContainer to="/signup" exact>
                    <Nav.Link className="signup">Sign Up</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/signin" exact>
                    <Nav.Link className="signin">Sign In</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        </Nav>
    );
};

// Export
export default MainNav;
