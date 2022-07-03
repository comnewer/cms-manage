import React from "react";
import {LoadingOutlined} from '@ant-design/icons';
import "./less/Loading.less"

export default function App() {
  return (
    <div className="loading">
        <LoadingOutlined style={{color:"#40a9ff", fontSize:"80px"}}></LoadingOutlined>
    </div>
  )
}