import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { supabase } from './services/supabase';
import { setSession } from './store/authSlice';
import RootNavigator from './navigation/index';
import { useAppDispatch } from './store/hooks';

// This component will handle Supabase auth changes and dispatch to Redux
const AuthObserver = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  return <RootNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <AuthObserver />
    </Provider>
  );
}