import React,{Component} from "react";
import {Link} from "react-router-dom";
import {Card, List, Avatar} from "antd";
class ReplyList extends Component{
    render(){
        let {loading,replyCount,replies} = this.props;
   //    reply_count = replyCount?replyCount+"条":"";
        return (<Card
            loading = {loading}
            title = {replyCount + "条回复"}
            type = "inner"
        >
            <List
                className = "replyList"
                dataSource={replies}
                itemLayout = "vertical"
                renderItem = {item=>{
                    return (
                        <List.Item
                            key={item.id}
                            extra={item.ups.length>0?(<span>有{item.ups.length}个人赞了这条回复</span>):""}
                        >
                              <List.Item.Meta
                                  avatar={<Avatar src={item.author.avatar_url}/>}
                                  description = {<span><Link to={"/user/"+item.author.loginname}>{item.author.loginname}</Link>
                                  发表于: {item.create_at.split("T")[0]}</span> }
                              />
                                <div
                                    dangerouslySetInnerHTML={
                                    {
                                        __html: item.content
                                    }
                                }>

                                </div>
                        </List.Item>
                    );
                }}
            >
            </List>
        </Card>);
    }
}
export default ReplyList;