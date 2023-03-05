import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Welcome} from "./pages/Welcome";

const AppRouter = () => {

    return (
        <Router>
            {/*<Header loggedIn={logIn} setLogIn={setLogIn}/>*/}
            <Routes>
                <Route
                    path="/"
                    element={<Welcome />}
                />
            </Routes>
        </Router>
    );
}

export default AppRouter;