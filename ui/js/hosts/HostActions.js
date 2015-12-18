
export const HostActions = {
  HOSTS_SET: 'HOSTS_SET'
};

export function setHosts(hosts) {
  return {
    type: HostActions.HOSTS_SET,
    payload: { hosts }
  };
}