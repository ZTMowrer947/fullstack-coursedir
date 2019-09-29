// Imports
import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import AuthContext from "../context/AuthContext";
import "./MainNav.scss";

// Component
const MainNav: React.FC = () => {
    // Get user from context
    const { user } = useContext(AuthContext);

    return (
        <Nav className="d-inline-flex justify-content-end align-items-center flex-grow-1">
            {!!user ? (
                <>
                    <Nav.Item>
                        <span>
                            Welcome {`${user.firstName} ${user.lastName}`}!
                        </span>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/signout" exact>
                            <Nav.Link className="signout">Sign Out</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </>
            ) : (
                <>
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
                </>
            )}
        </Nav>
    );
};

// Export
export default MainNav;
