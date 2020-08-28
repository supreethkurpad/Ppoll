import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

function Home() {
    return (
        <Layout>
            <Content>
                <div className="site-layout-content site-card-border-less-wrapper signpage">
                    <Row type="flex">
                        <Col className="half1" xs={24} lg={12} xl={12}>Sign in to create polls now.
                            <p className="des">Enter the community now to join users in creating and answering polls. Create polls with privacy restrictions and use charts to analyze poll results.</p>
                        </Col>
                        <Col className="half" xs={24} lg={12} xl={12}>
                            <div className="container">
                                <div className="jumbotron">
                                    <h1 style={{ fontSize: "60px", color: "white", textAlign: "center" }}>Features</h1>
                                    <Link to="/signup" style={{ color: "white" }}><img className="feature" src="https://img.icons8.com/bubbles/100/000000/create-new.png" alt="Create" />
                                        <p className="desc">Create a poll</p></Link>
                                    <img className="feature" style={{ padding: "5px" }} src="https://img.icons8.com/color/96/000000/share.png" alt="Create" />
                                    <p className="desc">Share the link</p>
                                    <img className="feature" style={{ padding: "20px" }} src="https://img.icons8.com/cotton/64/000000/customer-insight.png" alt="Create" />
                                    <p className="desc">Gain insight</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    Supreeth Kurpad©2020
                </div>
            </Content>
        </Layout>
    )
}

export default Home;