import React, { createContext, useReducer } from 'react';
import { INITIAL_BOXES } from '../constants/colors';

export const BoxContext = createContext();

const initialBoxState = {
  boxes: INITIAL_BOXES,
  loading: false,
  error: null
};

const boxReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOXES':
      return { ...state, boxes: action.payload, error: null };
    
    case 'ADD_BOX':
      return {
        ...state,
        boxes: [action.payload, ...state.boxes],
        error: null
      };
    
    case 'UPDATE_BOX':
      return {
        ...state,
        boxes: state.boxes.map(box =>
          box.id === action.payload.id ? { ...box, ...action.payload.updates } : box
        ),
        error: null
      };
    
    case 'DELETE_BOX':
      return {
        ...state,
        boxes: state.boxes.filter(box => box.id !== action.payload),
        error: null
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

export const BoxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boxReducer, initialBoxState);

  const addBox = (box) => {
    dispatch({ type: 'ADD_BOX', payload: box });
  };

  const updateBox = (id, updates) => {
    dispatch({ type: 'UPDATE_BOX', payload: { id, updates } });
  };

  const deleteBox = (id) => {
    dispatch({ type: 'DELETE_BOX', payload: id });
  };

  const setBoxes = (boxes) => {
    dispatch({ type: 'SET_BOXES', payload: boxes });
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const getStats = () => {
    return {
      total: state.boxes.length,
      approved: state.boxes.filter(b => b.status === 'approved').length,
      pending: state.boxes.filter(b => b.status === 'pending').length,
      rejected: state.boxes.filter(b => b.status === 'rejected').length
    };
  };

  return (
    <BoxContext.Provider
      value={{
        ...state,
        addBox,
        updateBox,
        deleteBox,
        setBoxes,
        setLoading,
        setError,
        clearError,
        getStats
      }}
    >
      {children}
    </BoxContext.Provider>
  );
};
