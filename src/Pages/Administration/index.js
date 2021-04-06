import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Charts

import apifrom from "./Apis";
import vesselform from './Vessel/index.js';

// Layout
import AppHeader from '../../Layout/AppHeader/index'
import AppSidebar from '../../Layout/AppSidebar/index';
import AppFooter from '../../Layout/AppFooter/index';

const Administration = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">


                    <Route path={`${match.url}/api`} component={apifrom}/>
                    <Route path={`${match.url}/vessel`} component={vesselform}/>

                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Administration;