import { useEffect, useState } from 'react';
import { PageHeader, Button, message } from 'antd';
import E from 'wangeditor'
import {ArrowLeftOutlined} from '@ant-design/icons'; 
import {useLocation, useParams} from "react-router-dom";
import MyModal from './MyModal';
import moment from "moment";
import {GetArticleByIdApi, EditArticleApi, AddArticleApi} from 'request/api';

let editor = null
const Editor = () => {
  const [content, setContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("标题");
  const [modalSubTitle, setModalSubTitle] = useState("副标题");
  const location = useLocation();
  const {id} = useParams();

  const showModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const submitArticleEdit = (res) => {
    if(id){
      EditArticleApi({
        title:res.title,
        subTitle:res.subTitle,
        id:id,
        content:content,
      }).then(
        res => {
          if(res.errcode===0){
            message.success("文章提交成功",1.5);
          }else{
            message.error("文章提交失败",1.5);
          };
        }
      )}
    else{
      AddArticleApi({title:res.title,subTitle:res.subTitle,content:content}).then(
        res => {
          if(res.errcode===0){
            message.success(res.message,1.5);
          }else{
            message.error(res.message,1.5);
          }
        }
      )}
  }

  useEffect(() => {
    // 实例化
    editor = new E("#myeditor")

    editor.config.onchange = (newHtml) => {
      setContent(newHtml);
    }

    // 创建
    editor.create()

    //获取文章并渲染
    if(id){
      //id存在,编辑文章
      GetArticleByIdApi({id}).then(res => {
        if (res.errcode===0) {
          //获取成功，渲染文章内容
          message.success('文章获取成功',1.5);
          //setContent(res.data.content);
          editor.txt.html(res.data.content);
          setModalTitle(res.data.title);
          setModalSubTitle(res.data.subTitle);
        }else if(res.errcode===1){
          message.error('登录已过期',1.5);
        }else{
          message.error('文章获取失败',1.5);
        }
        
      })
    }else{
      //id不存在,添加文章
    }

    return () => {
      // 组件销毁时销毁编辑器
      editor.destroy()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="editor">
      <PageHeader
        style={{padding: 0, marginBottom: '20px'}}
        ghost={false}
        backIcon={location.pathname==='/edit'?false:<ArrowLeftOutlined/>}
        onBack={() => window.history.back()}
        title="文章编辑"
        subTitle={`当前日期：${moment().format("YYYY-MM-DD")}`}
        extra={[
          <Button key="3" type="primary" onClick={showModal}>提交文章</Button>,
        ]}
      ></PageHeader>
      <div id="myeditor"></div>
      <MyModal
        isModalVisible={isModalVisible}
        onClose={closeModal} 
        title={modalTitle}
        subTitle={modalSubTitle}
        submitArticleEdit={submitArticleEdit}
      />
    </div>
  );
}

export default Editor;
