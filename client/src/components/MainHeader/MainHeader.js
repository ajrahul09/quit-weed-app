import React, { useState } from 'react';
import Toolbar from './Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';

import './MainHeader.css';

const MainHeader = (props) => {

  const [sideDrawerOpen, setDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setDrawerOpen(prevState => {
      return !prevState.sideDrawerOpen;
    })
  }

  const backdropClickHandler = () => {
    setDrawerOpen(false);
  }

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />
  }

  return (
    <>
      <Toolbar drawerClickHandler={drawerToggleClickHandler} />
      <SideDrawer show={sideDrawerOpen} />
      {backdrop}
    </>
  );
};

export default MainHeader;
