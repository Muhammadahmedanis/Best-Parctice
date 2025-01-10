import { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,  
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
        return {
          user: action.payload,
          error: null,
        };

      case "AUTH_FAIL":
        return {
          user: null,
          error: action.payload,
        };
      
        case "AUTH_LOGOUT":{
          localStorage.removeItem("user");
          return INITIAL_STATE;
        }

    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const[state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user])
  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, error: state.error, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};