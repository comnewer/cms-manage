import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import { LoginApi } from 'request/api';
import React from 'react';
import "login.less"

const logo = require("assets/images/logo.png");

interface ILogin{
  username:string,
  password:string
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: ILogin) => {
    let {username, password} = values;

    LoginApi({username, password}).then(
      (res:any) => {
        if(res.errcode===0){
          //登录成功
          message.success('登陆成功，即将跳转到首页', 1.5);
          //保存用户信息
          localStorage.setItem('username', res.data.username);
          localStorage.setItem('cms-token', res.data['cms-token']);
          localStorage.setItem('avatar', res.data.avatar);
          //登陆成功，跳转
          setTimeout(()=>navigate('/'),1500);
        }
      }
    )

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