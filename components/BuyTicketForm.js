import { Button, Form, Input, Radio } from "antd";
import React, { useState } from "react";

const BuyTicketForm = ({ loading, event }) => {
  const [vipTickets, setVipTickets] = useState(0);
  const [regularTickets, setRegularTickets] = useState(0);
  const [componentSize, setComponentSize] = useState("default");
  const [mobileNumber,setPhoneNumber] = useState("")
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  let date = new Date();

  let timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  let currentDate = date.getTime();
  let token
  let totalAmount = 0;
  const conditionedPricingVIP =
    parseInt(
      (new Date(
        `${event.early_booking_end_date}`.split("-").join("/")
      ).getTime() -
        currentDate) /
        (1000 * 60 * 60 * 24)
    ) > 0
      ? event.early_booking_price_vip
      : event.vip_price;

  const conditionedPricingRegular =
    parseInt(
      (new Date(
        `${event.early_booking_end_date}`.split("-").join("/")
      ).getTime() -
        currentDate) /
        (1000 * 60 * 60 * 24)
    ) > 0
      ? event.early_booking_price_regular
      : event.regular_price;

  const vipTicketCount = event.tickets.reduce(
    (previousTicketCount, currentTicketCount) =>
      previousTicketCount + currentTicketCount.number_of_vip_tickets,
    0
  );

  const regularTicketCount = event.tickets.reduce(
    (previousTicketCount, currentTicketCount) =>
      previousTicketCount + currentTicketCount.number_of_regular_tickets,
    0
  );

  totalAmount =
    vipTickets * conditionedPricingVIP +
    regularTickets * conditionedPricingRegular;

  let ticketNumber = vipTicketCount + regularTicketCount;

  const password = new Buffer.from(
    process.env.SHORTCODE + process.env.PASSKEY + timestamp
  ).toString("base64");

  const number = mobileNumber.substring(1)

  //middleware function to generate token
  const generateToken = (req, res, next) => {
    const secret = process.env.SECRETKEY;
    const consumer = process.env.CONSUMERKEY;
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
    fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    ).then((response) => {
      console.log(response.data.access_token);
      token = response.data.access_token 
      next();
    }).catch(error => {console.log(error)
    });
  };
  generateToken()
  function handleClick() {
    console.log(token)
    fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",{
      method: "POST",
      header:{
        Authorization: `Bearer ${token}`,
      },body: JSON.stringify({
        BusinessShortCode: process.env.SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        Amount: totalAmount,
        PartyA: `254${number}`,
        PartyB: `process.env.shortCode`,
        PhoneNumber: `254${number}`,
        CallBackURL:"https://mydomain.com/pat",  
        AccountReference: `254${number}`,
        TransactionDesc: "ETickets"  
      })
    }).then((response)=> {
      console.log(response)
    response.status(200).json(data)}).catch((error)=>
    {console.log(error.message)})   
  }

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Ticket No:">
        <label>{`GamCOD` + `${ticketNumber + 1}`}</label>
      </Form.Item>
      <Form.Item label="VIP">
        <label>Tickets Remaining</label>
        <Form.Item label={event.vip_no_of_tickets - vipTicketCount}></Form.Item>
        <Form.Item label="Price">
          <Form.Item label={conditionedPricingVIP}>
            <Input
              type="number"
              placeholder="book vip seat"
              min="0"
              onChange={(event) => setVipTickets(event.target.value)}
            />
          </Form.Item>
        </Form.Item>
      </Form.Item>
      <Form.Item label="Regular">
        <label>Tickets Remaining</label>
        <Form.Item
          label={event.regular_no_of_tickets - regularTicketCount}
        ></Form.Item>
        <Form.Item label="Price">
          <Form.Item label={conditionedPricingRegular}>
            <Input
              placeholder="booked regular number of seats "
              type="number"
              min="0"
              onChange={(event) => setRegularTickets(event.target.value)}
            />
          </Form.Item>
        </Form.Item>
      </Form.Item>
      <Form.Item label="Amount">
        <Input type="number" value={totalAmount} />
      </Form.Item>
      <Form.Item label="Mobile no">
        <Input placeholder="phone number" onChange={(event)=>setPhoneNumber(event.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={handleClick}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default BuyTicketForm;
