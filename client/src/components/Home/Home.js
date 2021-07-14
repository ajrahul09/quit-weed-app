import React, { useContext } from 'react';
import ProfileForm from '../Profile/ProfileForm';
import ApiContext from '../../contexts/api-context';
import { Redirect } from 'react-router';

import Progress from '../UI/Progress/Progress'

const Home = () => {
  
  const apiCtx = useContext(ApiContext);

  return (
    <>
      {apiCtx.isLoading && <Progress />}
      {!apiCtx.isLoading && !apiCtx.profile.userId && <ProfileForm />}
      {!apiCtx.isLoading && apiCtx.profile.userId && <Redirect to="/dashboard" />}
    </>
  );
};

export default Home;
