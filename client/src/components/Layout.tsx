// Imports
import React from "react";
import Container from "react-bootstrap/Container";
import Header from "./Header";

// Component
const Layout: React.FC = props => {
    return (
        <>
            <Header />
            <Container fluid>{props.children}</Container>
        </>
    );
};

// Export
export default Layout;
