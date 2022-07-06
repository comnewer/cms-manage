import React, { useState } from 'react'
import { Button, Form, Input, message, Upload } from 'antd';
import { ChangeUserInfoApi } from "request/api";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import { useNavigate } from 'react-router-dom';

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

 function Modify(props:any) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    ChangeUserInfoApi(
      {
        username:values.username||'',
        password:values.password||'',
      }
    ).then((res:any)=>{
        console.log(res);
        if(res.errcode===0){
          message.success('修改成功',1.5);
          localStorage.setItem('username',res.data['username']);
          localStorage.setItem('cms-token',res.data['cms-token']);
          localStorage.setItem('avatar',res.data['avatar']);
          props.changeKeyFn();
        }
    })
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>|any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      if(info.file.response.errcode===0){
        message.success('头像修改成功',1.5);
        localStorage.setItem('avatar',info.file.response.data.avatar);
        localStorage.setItem('username',info.file.response.data.username);
        localStorage.setItem('cms-token',info.file.response.data['cms-token']);
        props.changeKeyFn();
      }else if(info.file.response.errcode===2){
        message.error('登录过期',1.5);
        setTimeout(()=>navigate('/login'),1500);
      }
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
    <Form
      name="basic"
      style={{width:'400px'}}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          修改
        </Button>
      </Form.Item>
    </Form>
    <Upload
    name="avatar"
    listType="picture-card"
    className="avatar-uploader"
    showUploadList={false}
    action="http://localhost:3001/manage/upload"
    headers = {{"cms-token": localStorage.getItem("cms-token") as string}}
    beforeUpload={beforeUpload}
    onChange={handleChange}
    >
    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  </div>
  );
}

const  mapDispatchToProps = (dispatch:Dispatch) => {
  return{
    changeKeyFn(){
      dispatch({type:'changeKey'});
    }
  }
}

export default connect(null,mapDispatchToProps)(Modify);