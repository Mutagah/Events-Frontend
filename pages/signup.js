import Link from "next/link";
import { Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/router";

function SignUp({ setLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isOrganizer, setIsOrganizer] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
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
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img
              src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
              alt="Login"
            />
          </div>
          <Form name="login-form">
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
                type="submit"
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
}
export default SignUp;
