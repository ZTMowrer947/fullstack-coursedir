import React from "react";
import "./App.scss";
import Layout from "./components/Layout";
import { Switch, Route } from "react-router-dom";
import Courses from "./components/pages/Courses";

const App: React.FC = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Courses} />
            </Switch>
        </Layout>
    );
};

export default App;
