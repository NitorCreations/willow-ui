import Immutable from 'immutable';
import {ConfigurationActions} from './ConfigurationActions';
import ClientConfiguration from '../domain/ClientConfiguration';

const mockJsonConfiguration = {
  "radiators" : {
    "group-1":  { //group-1 , unique
      "title": "Group 1", //Group 1
      "description": "Radiator for hosts in group 1", //Radiator for hosts in group 1
      "graphs" : [{
        "uid" : "1234-1234-1234-1234", //1234-1234-1234-1234
        "graph_type" : "horizon", // horizon
        "metrics": [{
          "instance_tag" : "host_foobar", //host_foobar
          "metric_key" : "cpu" // cpu, filesystem, io, ...
        }],  //Version 1 supports only 1 object in the metrics array configuration
        "configuration" : { "filter" : "only-exceptions" }  // {filter: "only-exceptions"}, graph specifig configurations belong here
      }]
    },
    "group-2":  { //group-1 , unique
      "title": "Group 2", //Group 1
      "description": "Radiator for hosts in group 2", //Radiator for hosts in group 1
      "graphs" : [{
        "uid" : "1235-1234-1234-1234", //1234-1234-1234-1234
        "graph_type" : "horizon", // horizon
        "metrics": [{
          "instance_tag" : "host_foobar", //host_foobar
          "metric_key" : "mem" // cpu, filesystem, io, ...
        }],  //Version 1 supports only 1 object in the metrics array configuration
        "configuration" : { "filter" : "only-exceptions" }  // {filter: "only-exceptions"}, graph specifig configurations belong here
      }]
    }
  }
};

const initialState = new ClientConfiguration(mockJsonConfiguration);

export function configurations(state = initialState, action) {
  switch (action.type) {
    case ConfigurationActions.SET_CONFIGURATION:
      return action.payload.configuration;
  }
  return state;
}
