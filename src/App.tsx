import {SelectOutlined, ReadOutlined, EditOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd'; 
import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate} from "react-router-dom";
import MyHeader from "components/MyHeader";
import { connect } from 'react-redux';
import 'App.less'

const {Content, Sider } = Layout;

const items_normal = [
  {
    key:'1',
    icon:React.createElement(ReadOutlined),
    label:<Link to={'/list'}>查看文章列表</Link>,
  },
  {
    key:'2',
    icon:React.createElement(EditOutlined),
    label:<Link to={'/edit'}>文章编辑</Link>,
  },
  {
    key:'3',
    icon:React.createElement(UserOutlined),
    label:<Link to={'/modify'}>修改资料</Link>,
  },
];

const items_admistrator = [
  {
    key:'1',
    icon:React.createElement(ReadOutlined),
    label:<Link to={'/list'}>查看文章列表</Link>,
  },
  {
    key:'2',
    icon:React.createElement(EditOutlined),
    label:<Link to={'/edit'}>文章编辑</Link>,
  },
  {
    key:'3',
    icon:React.createElement(UserOutlined),
    label:<Link to={'/modify'}>修改资料</Link>,
  },
  {
    key:'sub1',
    popupClassName:'sub',
    icon:React.createElement(UnorderedListOutlined),
    label:<div >管理员</div>,
    children:[
      {
        key:'1-1',
        icon:React.createElement(SelectOutlined),
        label:<Link to={'/namelist'}>小编名单</Link>,
      }
    ]
  },
];


function App(props:{keyname:number}) {
  //定义侧边栏当前的值
  const [asideState, setAsideState]=useState('0');
  const [items, setitems]=useState(items_normal);
  const [breadText, setBreadText]=useState('');
  const location = useLocation();
  const navigate = useNavigate();
  //监听路由
  useEffect(()=> {
    switch(location.pathname){
      case'/':
        navigate('/list');
        break;
      case'/list': 
        setAsideState('1');
        setBreadText('文章列表');
        break;
      case'/edit': 
        setAsideState('2');
        setBreadText('文章编辑');
        break;
      case'/modify': 
        setAsideState('3');
        setBreadText('修改资料');
        break;
      case'/namelist': 
        setAsideState('1-1');
        setBreadText('小编名单');
        break;
      default: 
        setAsideState('0');
    };
  },[location.pathname]);
  useEffect(()=>{
    const isadm = localStorage.getItem('player')==='vip' ? true:false;
    if(isadm){
      setitems(items_admistrator);
    }else{
      setitems(items_normal);
    }
  },[])

  return (
    <Layout className='container'>
      <MyHeader key={props.keyname}/>
      <Layout className='content'>
        <Sider width={200} className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[asideState]}
            selectedKeys={[asideState]}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items}
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
            <Breadcrumb.Item> <Link to={'/'}>首页</Link> </Breadcrumb.Item>
            <Breadcrumb.Item>{breadText}</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="mycontent">
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state:{key:number})=> {
  return{
    keyname: state.key,
  }
}

export default connect(mapStateToProps)(App);