// Imports
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Courses from "./pages/Courses";

// Component
class App extends React.Component {
    // Render to DOM
    render() {
        return (
            <Layout>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact={true} component={Courses} />
                    </Switch>
                </BrowserRouter>
            </Layout>
        );
    }
}

// Export
export default App;
