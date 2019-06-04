// Imports
import React from "react";
import Nav from "./Nav";

// Component
const Header = () => (
    <header className="header">
        <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <Nav />
        </div>
    </header>
);

// Export
export default Header;
