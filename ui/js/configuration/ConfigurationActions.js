
export const ConfigurationActions = {
  SET_CONFIGURATION: 'SET_CONFIGURATION'
};

export function setConfiguration(configuration) {
  return {
    type: ConfigurationActions.SET_CONFIGURATION,
    payload: { configuration }
  };
}
