import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import firebase from '../../firebase';
import {useRouter} from 'next/router';

const DEFAULT_STATE = {
  user: null,
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, loading: true };
    case 'setUser':
      return { user: action.payload, loading: false, error: null };
    case 'logout':
      return { ...state, loading: true };
    case 'setError':
      return { error: action.payload, loading: false, user: null };
    default:
      return DEFAULT_STATE;
  }
};

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  const router = useRouter();

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async user => {
      console.log(`onAuthStateChanged called with user=${user}`);
      console.log(user);
      try {
        if (user) {
          const { uid, displayName, email, photoURL } = user;
          dispatch({
            type: 'setUser',
            payload: { uid, displayName, email, photoURL },
          });
        } else {
          dispatch({ type: 'setUser', payload: null });
        }
      } catch (error) {
        console.log('error');
        dispatch({ type: 'setError', payload: error });
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, [dispatch]);

  const login = useCallback(
    ({ email, password }) => {
      dispatch({ type: 'login' });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => dispatch({ type: 'setError', payload: error }));
    },
    [dispatch],
  );

  const logout = useCallback(
    () => {
      dispatch({ type: 'logout' });
      firebase.auth().signOut();
    },
    [dispatch],
  );

  return (
    <UserContext.Provider value={{ login, logout, ...state }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
