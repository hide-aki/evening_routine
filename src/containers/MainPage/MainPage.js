import React, { Component, Suspense, lazy, Fragment } from 'react';   //destructuring (instead of React.Component)
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
    INITIAL_ROUTE,
    TODAY_ROUTE,
    HISTORY_ROUTE,
    MOTIVATION_ROUTE,
    GOALS_ROUTE
} from '../../constants'       //get constants form constants file


import Header from '../../components/Layout/Header/Header';
import Wrapper from '../../components/Layout/Wrapper/Wrapper'
import LoadingSpinner from '../../components/Layout/LoadingSpinner/LoadingSpinner';


import './MainPage.css'; //to import the appropriate css file for this component


const AsyncPageInitial = lazy(() => import('../../components/Pages/InitialPage/InitialPage'));

const AsyncPageToday = lazy(() => import('../../components/Pages/TodayPage/TodayPage'));

const AsyncPageHistory = lazy(() => import('../../components/Pages/HistoryPage/HistoryPage'));

const AsyncPageMotivation = lazy(() => import('../../components/Pages/MotivationPage/MotivationPage'));

const AsyncPageGoals = lazy(() => import('../../components/Pages/GoalsPage/GoalsPage'));

const AsyncPageImprint = lazy(() => import('../../components/Pages/Imprint/Imprint'));



const styles = theme => ({
    //toolbar: theme.mixins.toolbar,
    content: {
        [theme.breakpoints.down('sm')]: {
            marginTop: 56,
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: 64,
            marginLeft: 200,
        },
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});


class MainPage extends Component {   //class App will use the component lib / Component expects that there is a render function in this class

    constructor() {
        super();
        this.state = {
        };
    }

    getRouteComponent = (onRouteChange, route, classes) => {

        if (route === INITIAL_ROUTE) {
            return (
                <Suspense fallback={<LoadingSpinner />}>
                    <AsyncPageInitial onRouteChange={onRouteChange} />
                </Suspense>
            )
        } else if (route === TODAY_ROUTE) {
            return (
                <Suspense fallback={<LoadingSpinner />}>
                    <AsyncPageToday />
                </Suspense>
            )
        } else if (route === HISTORY_ROUTE) {
            return (
                <Suspense fallback={<LoadingSpinner />}>
                    <AsyncPageHistory />
                </Suspense>
            )
        } else if (route === MOTIVATION_ROUTE) {
            return (
                <Suspense fallback={<LoadingSpinner />}>
                    <AsyncPageMotivation />
                </Suspense>
            )
        } else if (route === GOALS_ROUTE) {
            return (
                <Suspense fallback={<LoadingSpinner />}>
                    <AsyncPageGoals />
                </Suspense>
            )
        }
    }
    render() {
        const { route, onRouteChange, onDarkModeChange, darkMode } = this.props;
        let page = this.getRouteComponent(onRouteChange, route);

        return (
            <Fragment>
                {<Header onRouteChange={onRouteChange} onDarkModeChange={onDarkModeChange} darkMode={darkMode} route={route} />}
                <Wrapper>
                    {page}
                </Wrapper>
            </Fragment>
        )
    }
}

MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);
