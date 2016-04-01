import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, Shell, Radiator, NotFound } from 'containers';

export default (
  <Route path="/ui/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/ui/Shell" component={Shell}/>
    <Route path="/ui/Radiator/:radiatorId" component={Radiator}/>
    <Route path="*" component={NotFound} status={404}/>
  </Route>
);
