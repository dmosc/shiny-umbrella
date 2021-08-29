import React from 'react';
import {PageHeader} from 'antd';
import {NavbarContainer, Menu} from './elements';

const NavBar = () => {
  return (
    <NavbarContainer>
      <Menu
        mode="horizontal"
        style={{display: 'flex', justifyContent: 'flex-end'}}
      >
        <PageHeader
          style={{
            marginRight: 'auto',
            marginTop: 5,
            marginBottom: 5,
            padding: '0px 20px',
          }}
          title={
            <img
              style={{height: '40px'}}
              src="/static/logo.png"
              alt="Precise Fit"
            />
          }
        />
      </Menu>
    </NavbarContainer>
  );
};

export default NavBar;
