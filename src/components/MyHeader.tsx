import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { DownOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space, message } from 'antd';

import "./less/MyHeader.less"

const logo = require("assets/images/logo.png");
const default_avatar = require("assets/images/avatar.jpg");

export default function App() {
    const [avatar, setAvatar] = useState(default_avatar);
    const [username, setUsername] = useState('匿名用户');
    const navigate = useNavigate();

    useEffect(()=>{
        let avatar_stored = process.env.SERVER_HOST_PORT+'/'+localStorage.getItem('avatar')
        ||default_avatar;
        let username_stored = localStorage.getItem('username')||'匿名用户';
        setAvatar(avatar_stored);
        setUsername(username_stored);
    },[]);

    //修改资料
    const goMeans = () => {
        let token = localStorage.getItem("cms-token");
        if(!token){
            message.warning('登陆已过期，请重新登录',1.5);
            setTimeout(()=>navigate("/login"),1500);
        }
        navigate('/modify');
    }
    //退出登录
    const logout = () => {
        localStorage.removeItem('cms-token');
        localStorage.removeItem('username');
        localStorage.removeItem('avatar');
        localStorage.removeItem('player');
        localStorage.removeItem('editable');
        message.warning('即将退出，跳转到登陆页',1.5);
        setTimeout(()=>navigate("/login"),1500);
    }

    const menu = (
        <Menu
          items={[
            {
                key: '1',
                label: <div onClick={goMeans}>修改资料</div>,
            },
            {
                type: 'divider',
            },
            {
                key: '2',
                label: <div onClick={logout}>退出登录</div>,
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
                    <img src={avatar} alt="avatar" width={50} height={50} style={{borderRadius: "50%"}}/>
                    {username}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>        
    </header>
    )
}