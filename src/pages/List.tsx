import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table/Table";
import React from "react";

const ActionBtn = (
  <>
    <Button type="primary" style={{marginRight: "10px"}}>编辑</Button>
    <Button type="primary" danger>删除</Button>
  </>
)
const TitleCmp = (
  <>
    <div><a href="!#">title</a></div>
    <p style={{color: "#999"}}>subtitle</p>
  </>
)

interface DataType {
  key: React.Key;
  title: JSX.Element;
  time: string;
  action: JSX.Element;
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

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    title: TitleCmp,
    time: 'someday',
    action: ActionBtn,
  });
}

export default function App() {
  return (
    <Table columns={columns} dataSource={data} showHeader={false}/>
  )
}