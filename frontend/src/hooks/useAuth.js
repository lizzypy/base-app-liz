import { useEffect } from 'react';
import { useUser } from './useUser';

export const useAuth = () => {
    const { user, addUser, removeUser } = useUser();

    useEffect(() => {
        if (user) {
            addUser(JSON.parse(user));
        }
    }, []);

    const login = (user) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    return { user, login, logout };
};