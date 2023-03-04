import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";

export function AuthProvider({setAuth, children}) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);

    useEffect(() => {
        usersApi.getCurrentUser()
            .then((user) => setUser(user))
            .catch((_error) => {})
            .finally(() => setLoadingInitial(false));
    }, []);

    // Flags the component loading state and posts the login
    // data to the server.
    //
    // An error means that the email/password combination is
    // not valid.
    //
    // Finally, just signal the component that loading the
    // loading state is over.
    function login(email, password) {
        setLoading(true);

        sessionsApi.login({ email, password })
            .then((user) => {
                setUser(user);
                history.push("/");
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    function signUp(email, password) {
        setLoading(true);

        usersApi.signUp({ email, password })
            .then((user) => {
                setUser(user);
                history.push("/");
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    function logout() {
        sessionsApi.logout().then(() => setUser(undefined));
    }

    // Make the provider update only when it should.
    // We only want to force re-renders if the user,
    // loading or error states change.
    //
    // Whenever the `value` passed into a provider changes,
    // the whole tree under the provider re-renders, and
    // that can be very costly! Even in this case, where
    // you only get re-renders when logging in and out
    // we want to keep things very performant.
    setAuth(
        {
            user,
            loading,
            error,
            login,
            signUp,
            logout
        })
    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
    return useContext(AuthContext);
}