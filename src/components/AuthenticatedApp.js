import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Card, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import {
  HomeOutlined,
  MessageOutlined,
  SearchOutlined,
  SettingOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { logout } from '../api/auth';
import cookies from 'js-cookie';
import Recipes from './Recipes';
import Home from './Home';
import Inventory from './Inventory';
import styled from 'styled-components';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;

const StyledMenuItem = styled(Menu.Item)`
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const AuthenticatedApp = (props) => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider style={{ background: '#f2f3f5' }} width={'20%'}>
            <Menu
              style={{
                minHeight: '100%',
                width: '20%',
                alignItems: 'center',
                justifyContent: 'flex-start',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
              }}
            >
              <StyledMenuItem icon={<HomeOutlined />}>
                <Link to="/Home">Home</Link>
              </StyledMenuItem>
              <StyledMenuItem icon={<BookOutlined />}>
                <Link to="/recipes">Recipe</Link>
              </StyledMenuItem>
              <StyledMenuItem icon={<HomeOutlined />}>
                <Link to="/inventory">Inventory</Link>
              </StyledMenuItem>
              <StyledMenuItem icon={<MessageOutlined />}>
                <Link to="/messages">Messages</Link>
              </StyledMenuItem>
              <StyledMenuItem icon={<SearchOutlined />}>
                <Link to="/explore">Explore</Link>
              </StyledMenuItem>
              <StyledMenuItem icon={<SettingOutlined />}>
                <Link to="/settings">Settings</Link>
              </StyledMenuItem>
              <Button
                style={{
                  marginTop: 'auto',
                  marginBottom: '20px',
                  minHeight: '100%',
                }}
                type="primary"
                shape="round"
                onClick={() => {
                  console.log('logging out...');
                  logout(user.token).then((res) => {
                    cookies.remove('user');
                    setUser({});
                  });
                }}
              >
                Logout
              </Button>
            </Menu>
          </Sider>
          <Content style={{ background: '#f2f3f5', width: '65%' }}>
            <Switch>
              <Route path="/recipes" component={Recipes} />
              <Route path="/home" component={Home} />
              <Route path="/inventory" component={Inventory} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </>
  );
};

export default AuthenticatedApp;
