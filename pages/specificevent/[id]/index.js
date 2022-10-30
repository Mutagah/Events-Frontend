import { Col, Row, Modal } from "antd";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import BuyTicketForm from "../../../components/BuyTicketForm";
import Script from 'next/script';
import { gapi } from 'gapi-script';

const SpecificEvent = () => {
  var date = new Date();
  var currentDate = date.getTime();

  var CLIENT_ID = "447222188463-85lhlk9i68pmspkinnergh07j228n2i7.apps.googleusercontent.com";
  var API_KEY = "AIzaSyDSu0IfbznPAlKhL8LKY6YZuwItkfLwLvE";
  var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  var SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  const [eventOne, setEventOne] = useState({});
  const router = useRouter();
  const {id} = router.query;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  useEffect(()=>{
      fetch(`http://localhost:3000/events/${id}`).then((response)=> response.json()).then((data)=> setEventOne(data))
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

  const handleAdd = () => {
    gapi.load("client:auth2", () => {

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })

      gapi.client.load('calendar', 'v3',)

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {

        var event = {
          'summary': eventOne.title,
          'location': eventOne.location,
          'description': eventOne.description,
          'colorId': '6',
          'start': {
            'dateTime': new Date(eventOne.event_date),
            'timeZone': 'Africa/Nairobi'
          },
          'end': {
            'dateTime': new Date(eventOne.event_date),
            'timeZone': 'Africa/Nairobi'
          },
        };

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event
        })

        request.execute(event => {
          window.open(event.htmlLink)
        })
      })
    })
  }

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
    <Script src="https://apis.google.com/js/api.js" type="text/javascript"/>

    <Row justify="center" align="middle">
      <Col span={24}>
        <picture>
        <img 
        src={eventOne.banner_img}
        alt="Tech"
        style={{
          width: "100%",
          height: "405px",
          display: "block"
        }}
        />
        </picture>
      </Col>

      <br />
      
      <Col span={24}>
        <Row justify="center" align="middle">
          <Col span={12}>
            <Row justify="center" align="middle">
              <div >
                <h1 style={{fontWeight: "bolder", fontFamily: "nunito", fontSize: 60}}>{eventOne.title}</h1>
              </div>
            </Row>    
          </Col>
          <Col span={12}>
            <Row justify="center" align="middle" style={{marginTop: 30}}>
              <div style={{ textAlign: "center", border: 1, borderStyle: "solid", cursor: "pointer", borderRadius: 10, width: "40%"}}>
                <h3 style={{fontWeight: "bold"}}>Early Booking Timer</h3>
                <p>{parseInt(((new Date(`${eventOne.early_booking_end_date}`.split("-").join("/")).getTime()) - currentDate )/(1000 * 60 * 60 * 24)) + " days remaining"}</p>
              </div>
            </Row>
          </Col>
        </Row>
      </Col>

      <br />

      <Col span={24}>
        <Row>
          <Col span={12}>
            <Row justify="center" align="middle">
              <Col span={6}>
                <div style={{ textAlign: "left", fontFamily: "nunito" }}>
                  <h4 style={{fontWeight: "regular", fontSize: 25}}>Date</h4>
                  <p>{eventOne.event_date}</p>
                </div>
              </Col>
              <Col span={6}>
                <div style={{textAlign: "right", fontFamily: "nunito" }}>
                  <h4 style={{fontWeight: "regular", fontSize: 25}}>Location</h4>
                  <p>{eventOne.location}</p>
                </div> 
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row justify="center" align="middle">
              <div>
                <p style={{fontWeight: "bold"}}><i>Allow Pop ups on your browser to add events to calendar</i></p>
              </div>
            </Row>
            <Row justify="center" align="middle">
              <br />
                <div style={{ textAlign: "center", border: 1, borderStyle: "solid", cursor: "pointer", borderRadius: 10, width: "40%"}}>
                  <h3 style={{fontWeight: "bold"}}>Add To Calendar</h3>
                  <button
                  style={{backgroundColor: "#0786f2", cursor: "pointer", width: "70%", margin: 20, color: "#fff", borderRadius: 10, height: 40, border: "none"}}
                  onClick={handleAdd}
                  >
                    Add
                  </button>
                </div>
              </Row>
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
              <p>{eventOne.description}</p>
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
                    <BuyTicketForm loading={confirmLoading} onClick={handleOk} event={eventOne}/>
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
                    <picture>
                      <img 
                      src={eventOne.image_url1}
                      alt="Tech"
                      style={{
                        width: "100%",
                        height: "405px",
                        display: "block",
                        paddingTop: 30
                      }}
                      />
                      </picture>
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col span={12}>
                <div style={{display: "inline-flex", fontFamily: "nunito", width: "100%", justifyContent: "center", textAlign: "center"}}>
                  <Row justify="center" align="middle">
                    <Col >
                    <picture>
                      <img 
                      src={eventOne.image_url2}
                      alt="Tech"
                      style={{
                        width: "100%",
                        height: "405px",
                        display: "block",
                        paddingTop: 30
                      }}
                      />
                      </picture>
                    </Col>
                  </Row>
                </div>
              </Col>
            </div>
          </Row>
        </Col>
      </Row>

    </Row>
  </>
  )
}

export default SpecificEvent;