// Initial State
const initialState = {
  sessionType: null,
  exercises: null,
};

const treatmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_EXERCISES_COMPLETE': {
      return {
        // State
        ...state,
        // Redux Store
        exercises: action.payload.exercises
      };
    }

    case 'ADD_EXERCISES_REQUEST': {
      return {
        // State
        ...state,
        // Redux Store
        exercises: action.payload.exercises,
      };
    }

    case 'ADD_EXERCISES_COMMIT': {
      return {
        // State
        ...state,
        // Redux Store
        // counter: action.payload.exercises,
      };
    }

    case 'ADD_EXERCISES_ROLLBACK': {
      return {
        // State
        ...state,
        // Redux Store
        // counter: action.payload.exercises,
      };
    }

    case 'UPDATE_SESSIONTYPE_REQUEST': {
        return {
          // State
          ...state,
          // Redux Store
          sessionType: action.payload.sessionType,
        };
      }
  
      case 'UPDATE_SESSIONTYPE_COMMIT': {
        return {
          // State
          ...state,
          // Redux Store
          // counter: action.payload.exercises,
        };
      }
  
      case 'UPDATE_SESSIONTYPE_ROLLBACK': {
        return {
          // State
          ...state,
          // Redux Store
          sessionType: action.meta.sessionType,
        };
      }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default treatmentReducer;
