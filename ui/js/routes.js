import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, Settings, NotFound } from 'containers';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="home" component={Home}/>

        <Route path="settings" component={Settings}/>
        <Route path="*" component={NotFound} status={404}/>
    </Route>
);
