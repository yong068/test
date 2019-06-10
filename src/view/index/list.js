import React, {Component} from "react";
import {List,Avatar} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
import TxtTag from "../txtTag";

class IndexList extends Component{
    constructor(arg){
        super(arg);
        this.isStart = true;
        this.state = {
            page:1
        };
        this.getData(this.props.tab,this.state.page);//分页
    }
    //生命周期组件更新函数,监听组件是否发生改变
    shouldComponentUpdate(nextProps,nextState){
        this.isStart = false;
        //分页跳转
        if(this.state.page !== nextState.page){
            this.getData(nextProps.tab,nextState.page);
            return false;
        }
        if(this.props.tab !==nextProps.tab){
            this.state.page = 1;
            this.getData(nextProps.tab,1);
            return false;
        }
        return true;
    }
    //当组件更新时收到新的props
    getData(tab,page){
        this.props.dispatch((dispatch)=>{
            dispatch({
                type:"LIST_UPDATA"
            })
            axios.get(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=10`)
            .then((res)=>{
                dispatch({
                    type:"LIST_UPDATA_SUCC",
                    data: res.data
                })
            })
            .catch((error)=>{
                console.log(error);
                dispatch({
                    type:"LIST_UPDATA_ERROR",
                    data:error
                })
            })
        })
    }
    render(){
        //loading状态,data,tab,page
        let {loading,data} = this.props;
        //分页组件配置
        let pagination = {
            current: this.state.page,//当前页
            pageSize: 10,//每页10条
            total: 1000,//1000条
            //变化好更新的当前页
            onChange:((current)=>{
                this.setState({
                    page: current
                });
            })
        };
        return(
            <List
            loading = {loading}
            dataSource = {data}
            pagination = {this.isStart?false:pagination}
            renderItem = {item =>(
                <List.Item
                actions={[
                    "回复:"+item.reply_count,
                    "访问"+item.visit_count
                ]}
                key = {item.id}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.author.avatar_url} />}
                        title = {<div>
                            <TxtTag data={item}/>
                            <Link to={"/details/"+item.id}>
                                {item.title}
                            </Link>
                        </div>}
                        description = {(<p><Link to={"/uesr/"+item.author.loginname}>
                            {item.author.loginname}
                            </Link>
                            发表于:{item.create_at.split("T")[0]}
                            </p>)}
                     /> 
                </List.Item>)}
            >
            </List>
        )
    }
}
export default connect(state=>state.list)(IndexList);