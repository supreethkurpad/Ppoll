//jshint esversion: 6
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Card, Typography, Button, message } from 'antd';
import { UserContext } from '../App';
const qs = require('qs');
const axios = require('axios');
const { Title } = Typography;
const { Content } = Layout



function Signin() {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(UserContext);

    function sign() {

        const reqBody = {
            username,
            password,
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post("/signin", qs.stringify(reqBody), config)
            .then(res => {
                if (res.data.error) {
                    message.error(res.data.error);
                } else {
                    message.success("Signed In");
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    setUsername("");
                    setPassword("");
                    dispatch({ type: "USER", payload: (res.data.user) })

                    history.push("/discover");
                    // history.goBack();
                    // history.goBack();
                }
            }).catch(err => console.log(err));
    }
    return (
        <Content>
            <div className="site-layout-content site-card-border-less-wrapper signpage">
                <Card style={{ textAlign: "left" }} title={<Title level={1}>Sign In</Title>} className="sign">
                    <input className="input-field" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <br /><br />
                    <input className="input-field" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <br /><br />
                    <Button onClick={() => sign()}>Sign In</Button>
                </Card>
            </div>
        </Content>
    )
}

export default Signin;