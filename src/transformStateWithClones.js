'use strict';

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const prevState = Object.assign(
      currentState,
      stateHistory[stateHistory.length - 1],
    );

    switch (action.type) {
      case 'addProperties':
        Object.assign(prevState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete prevState[key];
        }
        break;

      case 'clear':
        for (const elem of Object.keys(prevState)) {
          delete prevState[elem];
        }
        break;
    }

    const cloneState = Object.assign({}, prevState);

    stateHistory.push(cloneState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
