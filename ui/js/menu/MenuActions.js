
export const MenuActions = {
  OPEN: 'MENU_OPEN',
  CLOSE: 'MENU_CLOSE'
};

export function open() {
  return {
    type: MenuActions.OPEN,
  };
}

export function close() {
  return {
    type: MenuActions.CLOSE,
  };
}
