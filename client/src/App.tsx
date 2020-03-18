// Imports
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';

import './App.scss';
import CourseDetail from './components/pages/CourseDetail';
import Courses from './components/pages/Courses';

// Component
const App: React.FC = () => (
    <>
        <Header />
        <Container fluid>
            <Switch>
                <Redirect from="/" to="/courses" exact />
                <Route path="/courses" exact component={Courses} />
                <Route path="/courses/:id" exact component={CourseDetail} />
            </Switch>
        </Container>
    </>
);

// Export
export default App;
