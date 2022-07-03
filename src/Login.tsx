import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import React from 'react';
import "login.less"

const logo = require("assets/images/logo.png");

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
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

      <Form.Item name="remember" valuePropName="checked">
        <Link to={"/register"}>还没有账号？立即注册</Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size='large'>
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;