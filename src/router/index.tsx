import App from "App";
import List from "pages/List"
import Modify from "pages/Modify"
import Edit from "pages/Edit"
import Register from "Register"
import Login from "Login"
import React, { lazy, Suspense } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Loading from "components/Loading";

interface Iroute {
    path: string,
    element: React.FC|any,
    children?: Iroute[]
}

const router_arr:Iroute[] = [
    {path: "/", element:App, children:[
            {path:"/list", element:lazy(() => import("pages/List"))},
            {path:"/edit", element:lazy(() => import("pages/Edit"))},
            {path:"/modify", element:lazy(() => import("pages/Modify"))},
            {path:"/namelist", element:lazy(() => import("pages/NameList"))},
        ]
    },
    {path: "/register", element:lazy(() => import("Register"))},
    {path: "/login", element:lazy(() => import("Login"))}
]

const MyRouter = () => {
    return (
        <BrowserRouter>
        <Suspense fallback={<Loading/>}>
        <Routes>
            {router_arr.map((item,index) => {
                return (
                    item.children?
                    <Route key={index} path={item.path} element={<item.element/>}>
                        {item.children.map((e, i) => (<Route key={i} path={e.path} element={<e.element/>}></Route>))}        
                    </Route>
                    :
                    <Route key={index} path={item.path} element={<item.element/>}></Route>        
                )
            })}
            <Route path="/" element={<App/>}>
                <Route path="/list" element={<List/>}></Route>
                <Route path="/edit" element={<Edit/>}></Route>
                <Route path="/modify" element={<Modify/>}></Route>
            </Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>
        </Suspense>
        </BrowserRouter>
    )
}

export default MyRouter;