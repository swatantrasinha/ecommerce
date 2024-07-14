import { useReducer, useEffect } from 'react';
import { ActionType, StateType } from '../types/ecommerce';

 // Custom Hook for Aysnc Data fecth

const dataFetchReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true };
        case 'SUCCESS':
            return { ...state, data: action.payload, loading: false };
        case 'ERROR':
            return { ...state, error: action.payload, loading: false };
        default:
            throw new Error();
    }
}
const initialState=     {
    data: [],
    loading: false,
    error: null
}

const useDataFetchQuery = (url: string) => {
    const [state, dispatch] = useReducer(dataFetchReducer, initialState);

    useEffect(() => {
        let didCancel = false;

        async function performAsyncTask() {
            dispatch({ type: 'LOADING' });

            try {
                const response = await fetch(url);
                if (!didCancel) { 
                    const data = await response.json();
                    dispatch({ type: 'SUCCESS', payload: data });
                }
            } catch ( error ) {
                if (!didCancel) {
                    dispatch({ type: 'ERROR', payload: error  as Error});
                }
            }
        }

        performAsyncTask();

        return () => {
            didCancel = true;
        };
    }, [url]);

    return { ...state };
}

export default useDataFetchQuery;