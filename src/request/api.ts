import request from './request';

interface IRegisterLogin {
    username: string,
    password: string,
}
//注册接口
export const RegisterApi = (params:IRegisterLogin) => request.post('/register', params);
//登录接口
export const LoginApi = (params:IRegisterLogin) => request.post('/login', params);
//获取用户信息
export const UserInfoApi = () => request.get('/info');
//修改用户信息
export const ChangeUserInfoApi = (params:IRegisterLogin) => request.post('/info',params);
//获取文章列表
interface IGetArticleList{
current:number,
counts:number
}
export const GetArticleListApi = (params:IGetArticleList) => request.post('/article/list',params);
//获取指定文章
export const GetArticleByIdApi = (params:{id:number}) => request.get(`/article/info/${params.id}`);
//文章编辑接口
interface IArticle{
    id?:number, 
    title:string, 
    subTitle?:string, 
    content?:string
}
export const EditArticleApi = (params:IArticle) => request.post('/article/edit',params);
//文章删除
export const DeleteArticleApi = (params:{id:number}) => request.post('/article/delete',params);
//文章添加
export const AddArticleApi = (params:IArticle) => request.post('/article/add',params);
//获取小编列表
export const EditorApi = () => request.get('/namelist');
//修改编辑权限
export const EditableApi = (params:{id:number,open:number}) => request.post('/namelist',params);