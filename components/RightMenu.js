import React from 'react';
import { Menu, Avatar, Grid } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

const RightMenu = () => {
    
    const { md } = useBreakpoint();

    return (
    <Menu overflowedIndicator mode={md ? "horizontal" : "inline"}>
       <Menu.Item >
          <a href="/"><b>Home</b></a>
        </Menu.Item>
        <Menu.Item >
          <a href="/createvent"><b>Create an Event</b></a>
        </Menu.Item>
        <Menu.Item >
          <a href="/about"><b>About Us</b></a>
        </Menu.Item>
        <Menu.Item >
          <a href="/login"><b>Login</b></a>
        </Menu.Item>
        <Menu.Item>
          <div>
              <Avatar size={35} icon={<UserOutlined />} />
          </div>
        </Menu.Item>
    </Menu>
    );
}

export default RightMenu;