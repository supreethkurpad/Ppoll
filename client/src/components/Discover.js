import React, { useEffect, useState } from 'react';
import { Typography, Layout, Card } from 'antd'
import { Link } from 'react-router-dom'
import Axios from 'axios';
const { Title } = Typography;
const { Content } = Layout;



function Discover() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        Axios.get("api/discover", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => {
                setPosts(res.data.posts.reverse());
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Content>
            <div className="site-layout-content site-card-border-less-wrapper signpage">
                <Title className="title-style" level={1}>Discover</Title>
                <Title className="title-style" level={4}>Newest and latest polls</Title>
                {
                    posts.map(element => {
                        const link = "/polls/" + element._id;
                        const title = element.title;
                        return (
                            <Card key={element._id} className="card-style">
                                <Link style={{ color: "black" }} to={link}> {title}
                                    <p className="card-link"> Click to expand </p>
                                </Link>
                            </Card>
                        )
                    })
                }
            </div>
        </Content>
    )
}

export default Discover;