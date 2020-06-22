import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <img src={user.picture} alt="Profile" width="120" height="120" />
            {/* /*style={{ 'border-radius': '50%' }} />*/}

            < h2 > {user.name}</h2>
            <p>{user.email}</p>
            <code>{JSON.stringify(user, null, 2)}</code>
        </Fragment >
    );
};

export default Profile;