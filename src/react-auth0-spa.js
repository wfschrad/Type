import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import Axios from 'axios';

import { apiBaseUrl } from "./config";

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({ children, onRedirectCallback = DEFAULT_REDIRECT_CALLBACK, ...initOptions }) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState();
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(initOptions);
            setAuth0(auth0FromHook);

            if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
                const { appState } = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(appState);
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isAuthenticated);


            if (isAuthenticated) {
                let user = await auth0FromHook.getUser();
                console.log('user40:', user);
                const token = await auth0FromHook.getTokenSilently();

                // localStorage.setItem("type_app_userObj", JSON.stringify(user));//not storing key in local storage 6.19.20?
                // localStorage.setItem("type_app_userTok", JSON.stringify(token));//not storing key in local storage 6.19.20?

                // check local storage before posting to db
                // const storedUser = JSON.parse(localStorage.getItem("type_app_userObj"));
                // console.log('storedUser: ', storedUser);

                // if (storedUser && storedUser !== "undefined") { buggy, what if diff users on same device?
                // console.log('inside storedUser conditional')

                // setUser(storedUser);

                // user = storedUser;
                if (false) {
                } else {
                    const USER_QUERY = `
                    mutation {
                    addUser(firstName: "${user.nickname}", email: "${user.email}", auth0Id: "${user.sub}", profilePhoto: "${user.picture}"){
                        id
                        profilePhoto
                        uploadedPhoto
                    }
                }`;
                    console.log('user query: ', USER_QUERY)
                    console.log('base url: ', apiBaseUrl)

                    console.log('posting user to db');
                    const res = await Axios({
                        url: apiBaseUrl,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        method: "post",
                        data: {
                            query: USER_QUERY,
                        },
                    });
                    console.log('res data: ', res.data.data);
                    const addUser = res.data.data.addUser;
                    if (addUser) {
                        user.id = addUser.id;
                        user.picture = addUser.uploadedPhoto ? addUser.uploadedPhoto : addUser.profilePhoto;
                        console.log('user after: ', user)
                        localStorage.setItem("type_app_userObj", JSON.stringify(user));//not storing key in local storage 6.19.20?
                        localStorage.setItem("type_app_userTok", JSON.stringify(token));//not storing key in local storage 6.19.20?
                    }

                    setUser(user);

                }
            }

            setLoading(false);
        };
        initAuth0();
    }, []);

    const loginWithPopup = async (params = {}) => {
        setPopupOpen(true);
        try {
            await auth0Client.loginWithPopup(params);
        } catch (error) {
            console.error(error);
        } finally {
            setPopupOpen(false);
        }
        const user = await auth0Client.getUser();

        setUser(user);

        localStorage.setItem("type_app_userObj", JSON.stringify(user));//not storing key in local storage 6.19.20?
        // localStorage.setItem("type_app_userTok", JSON.stringify(token));//not storing key in local storage 6.19.20?
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
        setLoading(true);
        await auth0Client.handleRedirectCallback();
        const user = await auth0Client.getUser();
        setLoading(false);
        setIsAuthenticated(true);

        setUser(user);

        localStorage.setItem("type_app_userObj", JSON.stringify(user));//not storing key in local storage 6.19.20?
        // localStorage.setItem("type_app_userTok", JSON.stringify(token));//not storing key in local storage 6.19.20?
    };
    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                popupOpen,
                loginWithPopup,
                handleRedirectCallback,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
                logout: (...p) => auth0Client.logout(...p)
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};
