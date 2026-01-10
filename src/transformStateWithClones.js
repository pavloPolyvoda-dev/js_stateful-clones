'use strict';

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const prevState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const currentState = Object.assign(
      prevState,
      stateHistory[stateHistory.length - 1],
    );

    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }

    if (action.type === 'clear') {
      for (const elem of Object.keys(currentState)) {
        delete currentState[elem];
      }
    }

    const cloneState = Object.assign({}, currentState);

    stateHistory.push(cloneState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
