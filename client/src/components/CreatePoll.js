import React, { useState } from 'react';
import { Layout, Card, message, Typography, Switch, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import qs from 'qs'
const { Content } = Layout;
const { Title } = Typography;

function CreatePoll() {
    const history = useHistory();

    function handleCheck() {
        setPrivatePoll(prev => !prev);
    }

    function handleSubmit() {

        const reqBody = {
            title,
            option1,
            option2,
            option3,
            option4,
            public: !privatePoll
        };

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }

        axios.post("api/createpoll", qs.stringify(reqBody), config)
            .then(res => {
                if (res.data.error) {
                    message.error(res.data.error);
                } else {
                    message.success(res.data.message);
                    history.push("/polls/" + res.data.id)
                }
            }).catch(err => console.log(err));
    }


    const [title, setTitle] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [privatePoll, setPrivatePoll] = useState(false);


    const inputStyle = {
        padding: "20px", borderWidth: "2px", borderColor: "black", width: "100%", margin: "4px 0"
    }



    return (<Content>
        <div className="site-layout-content signpage site-card-border-less-wrapper">
            <Card title={<Title level={1}>Create A Poll</Title>} style={{ height: "auto" }} className="sign" >
                <input type="text" style={inputStyle} placeholder="ENTER POLL TITLE" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br /><br />
                <input type="text" style={inputStyle} placeholder="ENTER OPTION1" value={option1} onChange={(e) => { setOption1(e.target.value) }} />
                <input type="text" style={inputStyle} placeholder="ENTER OPTION2" value={option2} onChange={(e) => { setOption2(e.target.value) }} />
                <input type="text" style={inputStyle} placeholder="ENTER OPTION3" value={option3} onChange={(e) => { setOption3(e.target.value) }} />
                <input type="text" style={inputStyle} placeholder="ENTER OPTION4" value={option4} onChange={(e) => { setOption4(e.target.value) }} />
                <Row className="private-toggle" >
                    <Col span="16">
                        <p>Do you want the poll to be private?</p>
                    </Col>
                    <Col span="6">
                        <Switch onChange={handleCheck} />
                    </Col>
                </Row>
                <Button onClick={() => handleSubmit()}>Create Now</Button>
            </Card>
        </div>
    </Content>)
}

export default CreatePoll;