export const getInfo = () => {
  return function action(dispatch) {
    return fetch('http://localhost:3000/exercises?userId=1')
      .then(response => response.json())
      .then(data => {
        const val = JSON.stringify(data.map(v => v['entity']));
        console.log(val);
        dispatch(getInfoComplete(val));
      });
  };
};

function getInfoComplete(data) {
  return dispatch => {
    dispatch({
      type: 'RETRIEVE_EXERCISES_COMPLETE',
      payload: {
        exercises: data,
      },
    });
  };
}

const exe = JSON.stringify({
  data: {
    createdAt: '2020-05-10T03:59:56+0000',
    score: 18,
    startTime: '2020-05-10T03:59:56+0000',
    endTime: '2020-05-10T04:59:56+0000',
    roundId: 2,
    seqId: 1,
    n: 2,
    stageId: 1,
  },
  userId: '1',
  version: '2020-05-12T02:59:56+0001',
  entity: 'Exercise#4a966026-93c8-11ea-bb37-0242ac130002',
});

export const addExercise = () => ({
  type: 'ADD_EXERCISES_REQUEST',
  payload: {
    exercises: exe,
  },
  meta: {
    offline: {
      // the network action to execute:
      effect: {
        url: 'http://localhost:3000/exercises?userId=1',
        method: 'POST',
        json: {exe},
      },
      // action to dispatch when effect succeeds:
      commit: {type: 'ADD_EXERCISE_COMMIT', meta: {}},
      // action to dispatch if network action fails permanently:
      rollback: {type: 'ADD_EXERCISE_ROLLBACK', meta: {}},
    },
  },
});

const session = JSON.stringify({
  data: {
    sessionType: 'SHAM',
  },
  entity: 'SessionType',
  userId: '1',
  version: '2020-03-12T02:52:56+0001',
});

export const updateSessionType = () => ({
  type: 'UPDATE_SESSIONTYPE_REQUEST',
  payload: {
    sessionType: session,
  },
  meta: {
    offline: {
      // the network action to execute:
      effect: {
        url: 'http://localhost:3000/sessionType?userId=1',
        method: 'POST',
        json: { session },
      },
      // action to dispatch when effect succeeds:
      commit: {type: 'UPDATE_SESSIONTYPE_COMMIT', meta: {}},
      // action to dispatch if network action fails permanently:
      rollback: {type: 'UPDATE_SESSIONTYPE_ROLLBACK', meta: { sessionType: '' }},
    },
  },
});
