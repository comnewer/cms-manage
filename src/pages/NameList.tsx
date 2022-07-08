import { Space, Table, Tag, Button, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { EditorApi, EditableApi} from 'request/api';
import React, { useEffect, useState } from 'react';

interface DataType {
    key:number;
    avatar: string;
    name: string;
    editable: number;
    btns: {id:number,fn:Function};
}

const closeEditable = (id:number,reRender:any)=>{
    const open:number = 0;
    EditableApi({id,open}).then(
        (res:any)=>{
            if(res.errcode===0){
                message.success(res.message,1.5);
                reRender();
            }else{
                message.error(res.message,1.5);
            }
        }
    )
};

const openEditable = (id:number,reRender:any)=>{
    const open:number = 1;
    EditableApi({id,open}).then(
        (res:any)=>{
            if(res.errcode===0){
                message.success(res.message,1.5);
                reRender();
            }else{
                message.error(res.message,1.5);
            }
        }
    )
};

const columns: ColumnsType<DataType> = [
    {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        render: url => <img src={url}  style={{width:"40px",height:"40px",borderRadius:"50%"}}  alt="头像" />,
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '编辑权限',
        dataIndex: 'editable',
        key: 'editable',
        render: (bool) => <div>{bool?'开通':'未开通'}</div>
    },
    {
        title: '权限操作',
        key: 'btns',
        dataIndex: 'btns',
        render: ({id,reRender}) => {
            
            return(
            <>
                <Button type='primary' onClick={()=>openEditable(id,reRender)}>开通编辑权限</Button>
                <Button type='primary' danger onClick={()=>closeEditable(id,reRender)}>取消编辑权限</Button>
            </>)
        },
    },
];

interface IUser{
    id:number,
    avatar:string,
    username:string,
    editable:number,
}

const Namelist = () => {
    const [data, setData] = useState<DataType[]>([]); 
    const [renderCount, setRender] = useState(0);
    useEffect(()=> {
        EditorApi().then(
            res => {
                const newdata:DataType[] = res.data.map((item:IUser)=>{
                    return{
                        key:item.id,
                        avatar:process.env.SERVER_HOST_PORT+'/'+item.avatar,
                        name:item.username,
                        editable:item.editable,
                        btns:{id:item.id,reRender:()=>setRender(renderCount+1)},
                    }
                })
                setData(newdata);
            }
        )
    },[renderCount]);
    return(
        <Table columns={columns} dataSource={data} pagination={false}/>
    )
}

export default Namelist;