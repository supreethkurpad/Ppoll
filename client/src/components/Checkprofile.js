import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography, Card, Button } from 'antd';
import axios from 'axios';



function Checkprofile(props) {

    const [posts, setPosts] = useState([]);
    const [profileName, setProfileName] = useState("");
    const { match } = props
    const { Content } = Layout;
    const { Title } = Typography;

    useEffect(() => {
        axios.get("/users/".concat(match.params.id), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            setPosts(res.data.polls.reverse())
            setProfileName(res.data.user)
        })
            .catch(err => console.log(err));
    }, []);



    return (
        <Content>
            <div className="site-layout-content site-card-border-less-wrapper signpage">

                <Title style={{ color: "#1c94fc" }} level={1}>{profileName}</Title>
                <Title style={{ color: "white", textAlign: "center" }} level={4}>Polls</Title>

                {
                    posts.length !== 0 ? posts.map(element => {
                        const link = "/polls/" + element._id;
                        const title = element.title;
                        return (
                            <Card key={element._id} className="card-style">
                                <Link style={{ color: "black" }} to={link}> {title}
                                    <p className="card-link"> Click to expand </p>
                                </Link>
                            </Card>
                        )
                    }) :
                        (<div>
                            <p>No polls to show.</p>
                        </div>)
                }
            </div>
        </Content>
    )
}

export default Checkprofile;