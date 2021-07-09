import React, { useContext, useEffect, useState, useCallback } from 'react';
import AuthContext from '../../store/user-context';
import ProfileForm from '../Profile/ProfileForm';
import Dashboard from '../Dashboard/Dashboard';

const Home = (props) => {

  const authCtx = useContext(AuthContext);

  const user = authCtx.user;

  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileHandler = useCallback(async () => {

    setIsLoading(true);

    try {
      const requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
          'auth-token': user.token,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      };

      const response =
        await fetch('http://localhost:3000/api/profiles/' + user.userId,
          requestOptions);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const profileData = await response.json();
      setProfile(profileData);

    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);

  }, [user.token, user.userId]);

  useEffect(() => {
    fetchProfileHandler();
  }, [fetchProfileHandler]);

  const profileSubmissionHandler = (submittedProfile) => {
    setProfile(submittedProfile);
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !profile.userId && <ProfileForm submitProfile={profileSubmissionHandler} />}
      {!isLoading && profile.userId && <Dashboard profile={profile} />}
    </>
  );
};

export default Home;
