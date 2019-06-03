// Imports
import React from "react";
import PropTypes from "prop-types";

// Component
const Layout = props => (
    <>
        <header className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                {/* TODO: Add nav */}
            </div>
        </header>
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
