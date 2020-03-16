// Imports
import { render } from "@testing-library/react";
import React from "react";
import { StaticRouter } from "react-router-dom";

import App from "./App";

// Test Suite
describe("App component", () => {
    it("should render without crashing", () => {
        // Render app inside StaticRouter
        const { unmount } = render(
            <StaticRouter>
                <App />
            </StaticRouter>
        );

        // Unmount app
        unmount();
    });
});
