import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import React from 'react';
import { RegisterApi } from 'request/api';
import "login.less"

const logo = require("assets/images/logo.png");

interface IRegister{
  username:string,
  password:string,
  passwordAck:string
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: IRegister) => {
    let {username, password, passwordAck} = values;
    if(password!==passwordAck){
      message.error('请输入相同的密码',1.5);
      return;
    }

    RegisterApi({username, password}).then(
      (res:any) => {
        if(res.errcode===0){
          //提示成功
          message.success('注册成功，即将跳转到登录页', 1.5);
          //注册成功，跳转到登录页面
          setTimeout(()=>navigate('/login'),1500);
        }
      }
    )
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login_box'>
    <img src={logo} alt="logo" className='logo' />
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input placeholder='请输入用户名' prefix={<UserOutlined />}/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password placeholder='请输入密码' prefix={<LockOutlined/>}/>
      </Form.Item>

      <Form.Item
        name="passwordAck"
        rules={[{ required: true, message: '请确认密码!' }]}
      >
        <Input.Password placeholder='请确认密码' prefix={<LockOutlined/>}/>
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Link to={"/login"}>已有账号？返回登陆</Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size='large'>
          注册账号
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;