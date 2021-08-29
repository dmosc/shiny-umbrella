import React from 'react';
import PropTypes from 'prop-types';
import {Layout} from 'antd';
import Navbar from './navbar';
import {Content} from './elements';

const MainLayout = ({children}) => {
  return (
    <Layout>
      <Navbar />
      <Content>{children}</Content>
    </Layout>
  );
};

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainLayout;
