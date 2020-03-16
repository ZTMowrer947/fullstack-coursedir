// Imports
import { render } from "@testing-library/react";
import React from "react";

import Root from "./Root";

// Test Suite
describe("Root component", () => {
    it("should render without crashing", () => {
        // Render component
        const { unmount } = render(<Root />);

        // Unmount component
        unmount();
    });
});
