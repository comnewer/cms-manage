import {SelectOutlined, ReadOutlined, EditOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd'; 
import React from "react";
import { Outlet } from "react-router-dom";
import MyHeader from "components/MyHeader";

import 'App.less'

const {Content, Sider } = Layout;

const items2 = [
  {
    key:'1',
    icon:React.createElement(ReadOutlined),
    label:'查看文章列表',
  },
  {
    key:'2',
    icon:React.createElement(EditOutlined),
    label:'文章编辑',
  },
  {
    key:'3',
    icon:React.createElement(UserOutlined),
    label:'修改资料',
  },
  {
    key:'sub1',
    icon:React.createElement(UnorderedListOutlined),
    label:'管理员',
    children:[
      {
        key:'1-1',
        icon:React.createElement(SelectOutlined),
        label:'小编名单',
      }
    ]
  },
  
]


export default function App() {
  return (
    <Layout className='container'>
      <MyHeader/>
      <Layout className='content'>
        <Sider width={200} className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="mycontent">
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}