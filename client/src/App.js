// Imports
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";

// Component
class App extends React.Component {
    // Render to DOM
    render() {
        return (
            <Layout>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact={true} component={Courses} />
                        <Route path="/courses/:id" exact={true} component={CourseDetail} />
                    </Switch>
                </BrowserRouter>
            </Layout>
        );
    }
}

// Export
export default App;
