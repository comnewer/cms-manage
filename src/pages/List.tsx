import { Button, message, Table } from "antd";
import { ColumnsType } from "antd/lib/table/Table";
import React, { useEffect, useState } from "react";
import { GetArticleListApi, DeleteArticleApi } from "request/api";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ActionBtn = ({id, updateList, current, counts}:{id:number,updateList:Function,current:number, counts:number}) => {
  const navigate = useNavigate();
  //跳转到编辑页面
  const goToEdit = () => {
    navigate(`/edit/${id}`);
  }
  const deleteFn = () => {
    DeleteArticleApi({id}).then(
      (res:any) => {
        console.log(res);
        if(res.errcode===0){
          message.success('删除成功', 1.5);
          updateList(current,counts);
        }else{
          message.error('删除失败', 1.5);
        }
      }
    )
  }
  return(
  <>
    <Button type="primary" style={{marginRight: "10px"}} onClick={goToEdit}>编辑</Button>
    <Button type="primary" danger onClick={deleteFn}>删除</Button>
  </>)
}
const TitleCmp = ({title,subTitle}:{title:string,subTitle?:string}) =>(
  <>
    <div><a href="!#">{title}</a></div>
    <p style={{color: "#999"}}>{subTitle||""}</p>
  </>
)

interface DataType {
  key: React.Key;
  title: JSX.Element;
  time: string;
  action: JSX.Element;
}

interface IItem {
  id: number,
  title: string,
  subTitle?: string,
  date: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: '60%'
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: '20%'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: '20%'
  },
];

export default function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [total, setTotal] = useState(10);
  const [current,setCurrent] = useState(1);
  const [counts,setcounts] = useState(10);

  const updateList = (page:number,pageSize:number) => {
    GetArticleListApi({current:page,counts:pageSize}).then((res:any) => {
      if(res.errcode===0){
        const newdata:DataType[] = res.data.arr.map((item:IItem) => {
          return {
            key:item.id,
            title: TitleCmp({title:item.title,subTitle:item.subTitle}),
            time:moment(item.date).format('YYYY-MM-DD hh:mm:ss'),
            action:<ActionBtn id={item.id} updateList={updateList} current={page} counts={pageSize} />
          }          
        })
        setData(newdata);
        setTotal(res.data.total);
        if(res.data.arr.length===0)
          setCurrent(current-1);
      }
    })
  };
  const onPagechange = (page:number, pageSize:number ) => {
    setCurrent(page);
    setcounts(pageSize);
    updateList(page,pageSize);
  }
  useEffect(()=>{
    updateList(current,counts);
  },[]);
  useEffect(()=>{
    updateList(current,counts);
  },[current]);
  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      showHeader={false}
      pagination={{total:total ,onChange:onPagechange}}
    />
  )
}