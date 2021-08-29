import React from 'react';
import {PageHeader} from 'antd';
import {NavbarContainer, Menu} from './elements';

const NavBar = () => {
  return (
    <NavbarContainer>
      <Menu
        mode="horizontal"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#363636',
        }}
      >
        <PageHeader
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 5,
            marginBottom: 5,
            padding: '0px 40px',
            backgroundColor: '#363636',
          }}
          title={
            <img
              style={{height: '80px'}}
              src="/static/spree-logo.png"
              alt="Precise Fit"
            />
          }
        />
      </Menu>
    </NavbarContainer>
  );
};

export default NavBar;
