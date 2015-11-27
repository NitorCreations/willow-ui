import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, Shell, NotFound } from 'containers';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="Shell" component={Shell}/>
        <Route path="*" component={NotFound} status={404}/>
    </Route>
);
