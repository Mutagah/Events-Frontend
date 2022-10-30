import Link from "next/link";
import { Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/router";

function SignUp() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isOrganizer, setIsOrganizer] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const [currentUser, setCurrentUser] = useState([])

  const signData = {
    username: username,
    password: password,
    isOrganizer: isOrganizer,
    emailAddress: emailAddress
  }

  function handleCheckBox(event){
    setIsOrganizer(event.target.value)
  }
  console.log(signData)

  function handleSubmit(e) {
    // e.preventDefault();

 fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
    // window.location("/login")
  }


  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <picture><img
              src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
              alt="Login"
            /></picture>
          </div>
          <Form 
            onFinish={handleSubmit} 
             name="login-form">
            <p className="form-title">SIGN UP </p>
            <Form.Item
              name="username"
              rules={[{ message: "Please input your username!" }]}
            >
              <Input
                id="username-signup-input"
                type="text"
                name="username"
                placeholder="Input Username"
                onChange={(event) =>setUsername(event.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ message: "Please input your email address!" }]}
            >
              <Input type="text" name="email" placeholder="Input Email Address" onChange={(event)=> setEmailAddress(event.target.value)} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ message: "Please input your password!" }]}
            >
              <Input.Password
                id="password-signup-input"
                type="password"
                name="password"
                placeholder="Input password"
                onChange={(event)=> setPassword(event.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Checkbox onChange={handleCheckBox} value="true">Is Organizer?</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
              
                htmlType="submit"
                className="login-form-button"
              >
                SIGN UP
              </Button>
            </Form.Item>
            <p>
              If you have an account?<Link href="/login">Log in</Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );

  };
export default SignUp;
