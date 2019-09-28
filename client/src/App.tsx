import React from "react";
import "./App.scss";
import Layout from "./components/Layout";
import { Switch, Redirect, Route } from "react-router-dom";
import Courses from "./components/pages/Courses";
import CourseDetail from "./components/pages/CourseDetail";

const App: React.FC = () => {
    return (
        <Layout>
            <Switch>
                <Redirect from="/" to="/courses" exact />
                <Route path="/courses" exact component={Courses} />
                <Route path="/courses/:id" exact component={CourseDetail} />
            </Switch>
        </Layout>
    );
};

export default App;
