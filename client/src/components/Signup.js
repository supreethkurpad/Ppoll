import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Card, Typography, Button, message } from 'antd';
const qs = require('qs');
const axios = require('axios');
const { Title } = Typography;


const { Content } = Layout

function Signup() {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function sign() {

        const reqBody = {
            username,
            password,
            email
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post("/signup", qs.stringify(reqBody), config)
            .then(res => {
                if (res.data.error) {
                    message.error(res.data.error);
                } else {
                    message.success(res.data.message);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    history.push("/signin")
                }
            }).catch(err => console.log(err));
    }
    return (
        <Content>
            <div className="site-layout-content site-card-border-less-wrapper signpage">
                <Card style={{ textAlign: "left" }} title={<Title level={1}>Sign Up</Title>} className="sign">
                    <input className="input-field" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br /><br />
                    <input className="input-field" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br /><br />
                    <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br /><br />
                    <Button onClick={() => sign()}>Sign Up</Button>
                </Card>
            </div>
        </Content>
    )
}

export default Signup;