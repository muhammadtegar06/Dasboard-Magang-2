import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialAuthState = {
  userRole: null,
  username: '',
  password: '',
  isAuthenticated: false
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userRole: action.payload.role,
        username: action.payload.username,
        password: action.payload.password,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return initialAuthState;
    case 'UPDATE_USERNAME':
      return { ...state, username: action.payload };
    case 'UPDATE_PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = (username, password, role) => {
    dispatch({
      type: 'LOGIN',
      payload: { username, password, role }
    });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUsername = (username) => {
    dispatch({ type: 'UPDATE_USERNAME', payload: username });
  };

  const updatePassword = (password) => {
    dispatch({ type: 'UPDATE_PASSWORD', payload: password });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateUsername,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
