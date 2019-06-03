// Imports
import React from "react";
import "./App.css";
import Layout from "./components/Layout";

// Component
class App extends React.Component {
    // Render to DOM
    render() {
        return (
            <Layout>
                <div className="grid-33">
                    <h1>It works!</h1>
                </div>
            </Layout>
        );
    }
}

// Export
export default App;
