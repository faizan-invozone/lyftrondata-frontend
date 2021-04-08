import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";
import Loader from "react-loaders";

import { ToastContainer } from "react-toastify";

//New
const Dashboards = lazy(() => import("../../Pages/Dashboards"));
const Administration = lazy(() => import("../../Pages/Administration"));
const Integrations = lazy(() => import("../../Pages/Integrations"));
const Connections = lazy(() => import("../../Pages/Connections"));
const Logs = lazy(() => import("../../Pages/Logs"));
const SuperAdmin1 = lazy(() => import("../../Pages/SuperAdmin"));
const HomePage1 = lazy(() => import("../../Pages/Home"));
const Forms = lazy(() => import("../../Pages/Wizard"));
const LandingPage1 = lazy(() => import("../../Pages/LandingPage"));

// www
//const Gis = lazy(() => import('../../www/Gis'));

const AppMain = () => {
  return (
    <Fragment>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/Home" component={HomePage1} />
      </Suspense>
      {/*New*/}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/integrations" component={Integrations} />
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/administration" component={Administration} />
      </Suspense>
      {/* Forms */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-grid-cy" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/dashboard" component={Dashboards} />
      </Suspense>

      {/* Dashboards */}

      {/* Connections */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-grid-cy" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/connections" component={Connections} />
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-grid-cy" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/logs" component={Logs} />
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-grid-cy" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/SuperAdmin" component={SuperAdmin1} />
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-grid-cy" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/LandingPage" component={LandingPage1} />
      </Suspense>

      <Route exact path="/" render={() => <Redirect to="/LandingPage" />} />
      <ToastContainer />
    </Fragment>
  );
};

export default AppMain;
