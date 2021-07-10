import React, { useContext } from 'react';
import AuthContext from '../../contexts/user-context';
import ProfileForm from '../Profile/ProfileForm';
import ApiContext from '../../contexts/api-context';
import { Redirect } from 'react-router';

const Home = () => {

  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  
  const apiCtx = useContext(ApiContext);


  return (
    <>
      {apiCtx.isLoading && <p>Loading...</p>}
      {!apiCtx.isLoading && !apiCtx.profile.userId && <ProfileForm />}
      {!apiCtx.isLoading && apiCtx.profile.userId && <Redirect to="/dashboard" />}
    </>
  );
};

export default Home;
