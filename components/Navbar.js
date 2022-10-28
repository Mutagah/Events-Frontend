import React, { Component } from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { Drawer, Button, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
class Navbar extends Component {
	state = {
		current: 'mail',
		open: false
	}
	showDrawer = () => {
		this.setState({
			open: true,
		});
	};

	onClose = () => {
		this.setState({
			open: false,
		});
	};

	render() {
		return (
      <Row>
        <Col span={24}>
          <nav className="menuBar">
            <div className="menuCon" style={{marginTop: 10}}>
              <div className="leftMenu">
                <LeftMenu />
              </div>
              <div className="rightMenu">
                <RightMenu />
              </div>
              <div className='logoSmall'>
                <div style={{marginTop: 10, marginLeft: 25}}>
                    <div className='headerLogo' >
                        <p style={{fontWeight: "bolder", fontSize: 20, color: 'black', cursor: "pointer"}}>
                        Events
                        &nbsp;
                        <span style={{ color: "#d1410a", cursor: "pointer" }}>Bomboclat</span>
                        </p>
                    </div>
                </div>
              </div>
              <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
                <span className="barsBtn"></span>
              </Button>
              <Drawer
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.open}
              >
                <div style={{marginTop: 10, marginLeft: 25}}>
                  <div className='headerLogo' >
                      <p style={{fontWeight: "bolder", fontSize: 20, color: 'black', cursor: "pointer"}}>
                      Events
                      &nbsp;
                      <span style={{ color: "#d1410a", cursor: "pointer" }}>Bomboclat</span>
                      </p>
                  </div>
                </div>
                <div style={{marginTop: 10, marginLeft: 25}}>
                  <div style={{display: "inline-flex"}}>
                      <div>
                          <Input size="large" placeholder="search by tag ..." suffix={<SearchOutlined />} style={{width: "100%", borderRadius: 10}}/>
                      </div>
                    </div>
                </div>
                <RightMenu />
              </Drawer>
            </div>
          </nav>
        </Col>
    </Row>
			
		);
	}
}

export default Navbar;