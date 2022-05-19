import { useReducer, useCallback } from 'react';

function httpReducer(state, action) {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      status: 'pending',
    };
  }
  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      status: 'completed',
    };
  }
  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      status: 'completed',
    };
  }
  return state;
}

function useHttp(requestFunction, startWithPending = false) {

  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      // console.log()
      dispatch({ type: 'SEND' });
      console.log('calling sendRequest');
      try {
        const responseData = await requestFunction(requestData);
        // console.log(requestFunction)
        dispatch({ type: 'SUCCESS', responseData });
      } catch (error) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  //without callback this function will run into infinite loop

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
