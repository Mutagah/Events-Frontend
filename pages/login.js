import Link from "next/link"
import {useState} from "react"
import { Form, Input, Button, Checkbox, Col } from 'antd';


function Login(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState([])
  const loginData = { username: username, password: password}
  function handleSubmit(){
    fetch("http://localhost:3000/login",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body :JSON.stringify(loginData)
    }).then((res)=> {
      if(res.ok){
        res.json().then((user)=>console.log(user)).finally(setUsername(""),setPassword(""))
      } else{
        res.json().then((e)=> setError([e.error])).finally(setUsername(""),setPassword(""))
      }
    })
}
    return (
        <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login"/>
        </div>
        
     

      <Col xs={24} md={12}>
      <Form 
          name="login-form"
        >
          <p className="form-title">LOG IN</p>
          <Form.Item
            name="username"
            rules={[{required: true, message: 'Please input your username!'}]}
          >
            <Input
              placeholder="Input username"
              name="username"
              value={loginData.username}
              onChange={(event)=> setUsername(event.target.value)}
            />
          </Form.Item>

          <Form.Item
          placeholder="input password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password 
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={(event)=> setPassword(event.target.value)}
            />
          </Form.Item>

          {error.length > 0 && (
                                <ul style={{color:"red"}}className="fs-5">
                                    {error.map(error => <li key={error}>{error}</li>)}
                                </ul>
                            )}

          <Form.Item>
            <Button className="login-form-button" onClick={handleSubmit}>
              LOGIN
            </Button>
          </Form.Item>
          <p>If you dont have an account?<Link href="/signup"> Click me!</Link></p>
        </Form>
      </Col>
      </div>
      </div>
    )
    }
    export default Login