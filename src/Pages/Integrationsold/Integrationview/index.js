import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
// Tables

//import Integrationitem from './multisteps/index.js';
import integration from './view.js';
// Layout

import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';
import AppFooter from '../../../Layout/AppFooter';


const Integrationsview = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/view?id=:id`} component={integration}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Integrationsview;