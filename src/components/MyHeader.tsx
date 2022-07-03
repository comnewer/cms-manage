import React from "react";
import "./less/MyHeader.less"

import { DownOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';

const logo = require("assets/images/logo.png");
const default_avatar = require("assets/images/avatar.jpg");

export default function App() {

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
                    <img src={default_avatar} alt="avatar" width={50} style={{borderRadius: "50%"}}/>
                    匿名登录
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>        
    </header>
    )
}