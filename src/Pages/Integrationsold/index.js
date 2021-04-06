import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
// Tables

//import Integrationitem from './multisteps/index.js';
import integration from './Inte/index.js';
// Layout
import integrationoverview from '../Integrations/Integrationview/view.js';

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';


const Integrations = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={integration}/>
                    <Route path={`${match.url}/intgview?id=:id`} component={integrationoverview}/>
                {/* <Route path={`${match.url}/view?id=:id`} component={integrationoverview}/> */}
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Integrations;