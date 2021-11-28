import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { logout } from '../store/actions/userActions';

function Header() {
  const [activeItem, setActiveItem] = useState('login');
  const  color  = 'black';
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const handleSubmit = (e) => {
    dispatch(logout());
  };
  if (!userInfo) {
    return (
      <Menu color={color} inverted widths={3}>
        <Menu.Item
          as={Link}
          name='login'
          to='/login'
          active={activeItem === 'login'}
          onClick={(e) => setActiveItem(e.target.value)}
        >
          Login
        </Menu.Item>
        <Menu.Item
          as={Link}
          name='signup'
          to='/signup'
          active={activeItem === 'signup'}
          onClick={(e) => setActiveItem(e.target.value)}
        >
          Sign Up
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Menu color={color} inverted widths={3}>
      <Menu.Item
        as={Link}
        name='home'
        to='/'
        active={activeItem === 'home'}
        onClick={(e) => setActiveItem(e.target.value)}
      >
        Home
      </Menu.Item>

      <Menu.Item
        as={Link}
        name='profile'
        to={`profile/${userInfo.user.id}`}
        active={activeItem === 'profile'}
        onClick={(e) => setActiveItem(e.target.value)}
      >
        Profile
      </Menu.Item>

      <Menu.Item
        as={Link}
        name='logout'
        to='/'
        active={activeItem === 'logout'}
        onClick={handleSubmit}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
}

export default Header;
