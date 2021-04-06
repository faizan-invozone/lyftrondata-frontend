import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Tables

import connection from './Connection';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Connections = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/connection`} component={connection}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Connections;