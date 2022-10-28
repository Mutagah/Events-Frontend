import { Col, Row, Button, Modal } from "antd";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import BuyTicketForm from "../../../components/BuyTicketForm";

const SpecificEvent = () => {
  var date = new Date()
  var currentDate = date.getTime()
  const [event, setEvent] = useState({});
  const router = useRouter();
  const {id} = router.query;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  useEffect(()=>{
      fetch(`http://localhost:3000/events/${id}`).then((response)=> response.json()).then((data)=> setEvent(data))
  },[])
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <img 
        src={event.banner_img}
        alt="Tech"
        style={{
          width: "100%",
          height: "405px",
          display: "block"
        }}
        />
      </Col>

      <br />
      
      <Col span={24}>
        <Row>
          <Col span={12}>
            <div style={{ marginLeft: 40, width: "100%"}}>
              <h1 style={{fontWeight: "bolder", fontFamily: "nunito", fontSize: 60}}>{event.title}</h1>
            </div>    
          </Col>
          
        </Row>
      </Col>

      <br />

      <Col span={24}>
        <Row>
          <Col span={12}>
            <Row >
              <Col span={6}>
                <div style={{ textAlign: "left", marginLeft: 40, fontFamily: "nunito", width: "100%"}}>
                  <h4 style={{fontWeight: "regular", fontSize: 30}}>Date</h4>
                  <p>{event.event_date}</p>
                </div>
              </Col>
              <Col span={6}>
                <div style={{textAlign: "center", marginLeft: 100, fontFamily: "nunito", width: "100%"}}>
                  <h4 style={{fontWeight: "regular", fontSize: 30}}>Location</h4>
                  <p>{event.location}</p>
                </div> 
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <br />
            <div style={{textAlign: "center", width: "100%" }}>
              <Row justify="center" align="middle" style={{marginTop: 30}}>
                <div style={{ border: 1, borderStyle: "solid", cursor: "pointer", borderRadius: 10, width: "40%"}}>
                  <h3 style={{fontWeight: "bold"}}>Early Booking Timer</h3>
                  <p>{parseInt(((new Date(`${event.early_booking_end_date}`.split("-").join("/")).getTime()) - currentDate )/(1000 * 60 * 60 * 24)) + " days remaining"}</p>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>

      <br />

      <Col span={24}>
        <br />
        <Row>
          <Col span={12}>
            <div style={{textAlign: "center", marginLeft: 40, width: "100%", fontFamily: "nunito"}}>
              <h2 style={{fontWeight: "bold", fontSize: 30}}>Event Details</h2>
              <br />
              <p>{event.description}</p>
            </div>
          </Col>

          <Col span={12}>
          <div style={{textAlign: "center", width: "100%" }}>
              <Row justify="center" align="middle">
                <div style={{ border: 1, borderStyle: "solid", cursor: "pointer", borderRadius: 10, width: "40%"}}>
                  <h3 style={{fontWeight: "bold"}}>Attend Event</h3>
                  <button
                  style={{backgroundColor: "#d1410a", cursor: "pointer", width: "70%", margin: 20, color: "#fff", borderRadius: 10, height: 40, border: "none"}}
                  onClick={showModal}
                  >
                    Buy Ticket
                  </button>
                  <Modal
                    title="Pay with Mpesa"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer="Bomboclat Events"
                  >
                    <BuyTicketForm loading={confirmLoading} onClick={handleOk} event={event}/>
                  </Modal>
                </div>
              </Row>
            </div>
          </Col>   
        </Row>
      </Col>
      
      <Row justify="center" align="middle" >
        <Col span={24}>
          <Row justify="center" align="middle" >
            <div style={{ marginRight: 40, marginLeft: 40, borderRadius: 20, gap: 20, justifyContent: "center", display: "inline-flex", flexDirection: 'row' }}>
              <Col span={12}>
                <div style={{display: "inline-flex", fontFamily: "nunito", width: "100%", justifyContent: "center", textAlign: "center"}}>
                  <Row justify="center" align="middle">
                    <Col >
                      <img 
                      src={event.image_url1}
                      alt="Tech"
                      style={{
                        width: "100%",
                        height: "405px",
                        display: "block",
                        paddingTop: 30
                      }}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col span={12}>
                <div style={{display: "inline-flex", fontFamily: "nunito", width: "100%", justifyContent: "center", textAlign: "center"}}>
                  <Row justify="center" align="middle">
                    <Col >
                      <img 
                      src={event.image_url2}
                      alt="Tech"
                      style={{
                        width: "100%",
                        height: "405px",
                        display: "block",
                        paddingTop: 30
                      }}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </div>
          </Row>
        </Col>
      </Row>

    </Row>
  )
}

export default SpecificEvent;