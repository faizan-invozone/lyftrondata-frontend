import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
// Tables
import multistep from './multistep/index.js';
// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';


const Forms = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/wizard-3`} component={multistep}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Forms;