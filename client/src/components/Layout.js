// Imports
import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";

// Component
const Layout = props => (
    <>
        <Header />
        <hr />
        <main className="bounds">
            {props.children}
        </main>
    </>
);

// Prop Types
Layout.propTypes = {
    children: PropTypes.element,
}

// Export
export default Layout;
