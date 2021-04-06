import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import integration from './list';
import Addintg from './add.js';
import integrationoverview from '../Integrations/view.js';
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
                    <Route path={`${match.url}/intg`} component={integration}/>
                    <Route path={`${match.url}/addintg`} component={Addintg}/>
                   <Route path={`${match.url}/view?id=:id`} component={integrationoverview}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Integrations;