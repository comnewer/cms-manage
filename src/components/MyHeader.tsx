import React, { useEffect, useState } from "react";
import "./less/MyHeader.less"

import { DownOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';

const logo = require("assets/images/logo.png");
const default_avatar = require("assets/images/avatar.jpg");

export default function App() {
    const [avatar, setAvatar] = useState(default_avatar);
    const [username, setUsername] = useState('匿名用户');

    useEffect(()=>{
        let avatar_stored = localStorage.getItem('avatar')||default_avatar;
        let username_stored = localStorage.getItem('username')||'匿名用户';
        setAvatar(avatar_stored);
        setUsername(username_stored);
    },[]);

    const menu = (
        <Menu
          items={[
            {
                key: '1',
                label: '修改资料',
            },
            {
                type: 'divider',
            },
            {
                key: '2',
                label: '退出登录',
            },
          ]}
        />
      );

    return (
    <header>
        <img src={logo} height={50} alt="logo"/>
        <Dropdown overlay={menu}>
            <a href="!#" onClick={e => e.preventDefault()} >
                <Space>
                    <img src={process.env.SERVER_HOST_IMG+avatar} alt="avatar" width={50} style={{borderRadius: "50%"}}/>
                    {username}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>        
    </header>
    )
}