import { Button, Modal, Form, Input} from 'antd';
import React, { useState } from 'react';

interface IPropos{
  isModalVisible:boolean,
  onClose:Function,
  title:string,
  subTitle:string,
  submitArticleEdit:Function
}

const MyModal = ({isModalVisible,onClose,title,subTitle,submitArticleEdit}:IPropos) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
          .validateFields()
          .then(values => {
            submitArticleEdit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
    onClose();
  };

  const handleCancel = () => {
    //setIsModalVisible(false);
    onClose();
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
        <Modal title="填写文章标题" 
             visible={isModalVisible}
             onOk={handleOk} 
             onCancel={handleCancel}
             zIndex={10001}
             cancelText="取消"
             okText="提交"
        >
            <Form
              form={form}
              name="basic"
              initialValues={{ 'title':title, 'subTitle':subTitle }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >  
              <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>        

              <Form.Item
                label="副标题"
                name="subTitle"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
            </Form>
        </Modal>
    </>
  );
};

export default MyModal;
