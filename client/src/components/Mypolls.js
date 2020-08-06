import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Typography, Card, Button } from 'antd';
import { UserContext } from '../App';
import axios from 'axios';



function Mypolls() {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [posts, setPosts] = useState([]);

    const { Content } = Layout;
    const { Title } = Typography;

    useEffect(() => {
        axios.get("/api/mypolls", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            setPosts(res.data.polls.reverse())
        })
            .catch(err => console.log(err));
    }, []);



    function logoutHandler() {
        localStorage.clear();
        dispatch({ type: "CLEAR" })
        history.push("/");
    }


    return (
        <Content>
            <div className="site-layout-content site-card-border-less-wrapper signpage">

                <Title style={{ color: "#1c94fc" }} level={1}>{state ? state.username : "loading"}</Title>
                <Button style={{ margin: "20px" }} onClick={() => logoutHandler()}>Logout</Button>
                <Title style={{ color: "white", textAlign: "center" }} level={4}>My Polls</Title>

                {
                    posts.length !== 0 ? posts.map(element => {
                        let link = "/polls/" + element._id;
                        let title = element.title;
                        return (
                            <Card key={element._id} className="card-style">
                                <Link style={{ color: "black" }} to={link}> {title}
                                    <p className="card-link"> Click to expand </p>
                                </Link>
                            </Card>
                        )
                    }) :
                        (<div>
                            <p>So empty :(</p>
                            <br />
                            <Link to="/createpoll">Create a poll now</Link>
                        </div>)
                }
            </div>
        </Content>
    )
}

export default Mypolls;