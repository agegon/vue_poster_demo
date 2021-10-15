export function createAction(type) {
  return function (payload) {
    return {
      type,
      payload,
    };
  };
}

export { createAction as createMutation };
