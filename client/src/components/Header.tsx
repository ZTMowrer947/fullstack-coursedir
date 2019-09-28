// Imports
import React from "react";
import "./Header.scss";
import MainNav from "./MainNav";

// Component
const Header: React.FC = () => (
    <header className="header d-flex align-items-center">
        <h1 className="header-logo">Courses</h1>
        <MainNav />
    </header>
);

// Export
export default Header;
