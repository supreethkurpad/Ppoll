import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts'
import axios from 'axios';
import { Card, Button, Layout, Typography, Radio, message, Tabs, Popconfirm } from 'antd';
import qs from 'qs';
import { useHistory, Link } from 'react-router-dom';


function Pollroute(props) {
    const history = useHistory();
    const [voted, setVoted] = useState(false);
    const { Title } = Typography;
    const { match } = props
    const { Content } = Layout
    const string1 = "ppoll-web.herokuapp.com/polls/" + match.params.id;
    const [poll, setPoll] = useState({});
    const [option, setOption] = useState(0);
    const { TabPane } = Tabs;
    const radioStyle = {
        width: "100%",
        height: "70px",
        padding: "5% 0",
        margin: "5px",
        verticalAlign: "center",
        fontSize: "20px",
        fontFamily: "Montserrat",
        color: "black"
    };

    function confirm() {
        axios.post("/api/deletepoll", qs.stringify({ id: poll._id }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((res) => {
            if (res.data.error) {
                message.error(res.data.error)
            } else {
                message.success(res.data.message);
                history.goBack();
            }
        })
    }

    function cancel() {
        return;
    }

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }
    function voteHandler() {
        if (option === 0) {
            message.error("Select an option");
            return;
        }
        axios.post("api/votehandler", qs.stringify({ pollId: match.params.id, option }), config)
            .then(res => {
                if (res.data.error)
                    message.error(res.data.error);
                else {
                    message.success("Vote recorded");
                    setOption(0);
                    setVoted(true);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const [user, setUser] = useState({});
    const [usersVoted, setUsersVoted] = useState([]);
    const [postedBy, setPostedBy] = useState({});

    useEffect(() => {
        axios({
            method: 'get', url: "/api/".concat(match.params.id), headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then((res) => {
                setPoll(res.data.found);
                setUser(res.data.user);
                setUsersVoted(res.data.found.usersVoted)
                setPostedBy(res.data.found.postedBy)
            })
            .catch(err => console.log(err))
    }, [match.params.id, voted])



    return (
        <Content>
            <div className="site-layout-content site-card-border-less-wrapper signpage">
                {poll ?
                    (<Tabs style={{ color: "white" }} defaultActiveKey="1">
                        <TabPane tab="Poll" key="1">


                            <Card className="sign card-title" style={{ textAlign: "center", height: "auto", width: "auto", margin: "auto" }} >
                                <Title level={3}>{poll.title}</Title>
                                <p>Posted By : <Link to={"/users/".concat(postedBy._id)} >{postedBy.username} </Link> </p>
                            </Card>


                            <Card style={{ textAlign: "center", height: "auto", width: "auto", marginTop: "0" }} className="sign">
                                <Radio.Group buttonStyle="solid" size="large">
                                    <Radio.Button style={radioStyle} onClick={(e) => { setOption(e.target.value) }} value={1}>{poll.option1}</Radio.Button>
                                    <Radio.Button style={radioStyle} onClick={(e) => { setOption(e.target.value) }} value={2}>{poll.option2}</Radio.Button>
                                    <Radio.Button style={radioStyle} onClick={(e) => { setOption(e.target.value) }} value={3}>{poll.option3}</Radio.Button>
                                    <Radio.Button style={radioStyle} onClick={(e) => { setOption(e.target.value) }} value={4}>{poll.option4}</Radio.Button>
                                    <Radio.Button style={{ ...radioStyle, width: "100%", color: "white", backgroundColor: "#142850" }} onClick={() => voteHandler()} >Submit Vote</Radio.Button>
                                </Radio.Group>
                            </Card>


                            <Card style={{ textAlign: "center", height: "auto", margin: "30px auto" }} className="sign">
                                <Title level={4}> Copy the link and share the poll </Title>
                                <textarea defaultValue={string1} className="text-area-style" readOnly />
                            </Card>


                            {

                                (user._id === postedBy._id) ?
                                    <Card style={{ textAlign: "center", padding: "0", height: "100px", margin: "30px auto" }} className="sign">
                                        <Popconfirm title="Delete Poll?"
                                            onConfirm={() => {
                                                confirm();
                                            }}
                                            onCancel={cancel}
                                            okText="Delete"
                                            cancelText="Cancel">
                                            <Button style={{ height: "100%", width: "100%" }} type="danger">Delete Poll</Button>
                                        </Popconfirm>
                                    </Card> : ""
                            }
                        </TabPane>
                        <TabPane tab="Results" key="2">
                            <Card className="sign">
                                {
                                    (usersVoted.includes(user.username)) ? (
                                        <div>
                                            <Title level={4}>Poll Results</Title>
                                            <p>Pie Chart representing votes</p>

                                            <Chart

                                                height={'100%'}
                                                width={'100%'}
                                                chartType="PieChart"

                                                loader={<div>Loading Chart</div>}
                                                data={[
                                                    ['Option', 'Number of Votes'],
                                                    [poll.option1, poll.votes[0]],
                                                    [poll.option2, poll.votes[1]],
                                                    [poll.option3, poll.votes[2]],
                                                    [poll.option4, poll.votes[3]],
                                                ]}

                                            />
                                        </div>

                                    ) : (<h1>Vote on the poll to access results</h1>)
                                }
                            </Card>
                        </TabPane>
                    </Tabs>) : "Loading"}
            </div>
        </Content >

    )
}

export default Pollroute;
