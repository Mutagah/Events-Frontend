import React from 'react';
import { Menu, Avatar, Grid, Dropdown} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router'


const { useBreakpoint } = Grid;

const RightMenu = () => {
  // console.log(user)

  let router= useRouter()
   // condition base redirecting
function redirect() {
  router.push('/')
}

     const handleLogout = () => {
        fetch('http://localhost:3000/logout', {method: "DELETE"})
           .then(res => {
             if (res.ok) {
                sessionStorage.clear()
                 redirect()
              }
            })
     } 
  
    
    const { md } = useBreakpoint();

    const menu = (
      <Menu>
        <Menu.Item>
            <Link
              href="/login"
            >
              Login
            </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            href="/userprofile"
          >
            View Profile
          </Link>
        </Menu.Item>
         <Menu.Item>
          <Link
            onClick={handleLogout}
          >
            Logout 
          </Link>
        </Menu.Item>

      </Menu>
    );

    return (
    <Menu overflowedIndicator mode={md ? "horizontal" : "inline"}>
       <Menu.Item >
          <Link href="/"><b>Home</b></Link>
        </Menu.Item>
        <Menu.Item >
          <Link href="/createvent"><b>Create an Event</b></Link>
        </Menu.Item>
        <Menu.Item >
          <Link href="/about"><b>About Us</b></Link>
        </Menu.Item>
        <Menu.Item>
          <div>
          <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomLeft"
          >
            {/* <Link  href={`/userprofile`}> */}
              <Avatar size={35} icon={<UserOutlined />} />
              {/* </Link> */}
          </Dropdown>
          </div>
        </Menu.Item>
    </Menu>
    );
}

export default RightMenu;