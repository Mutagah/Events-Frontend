import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import { Avatar, Card, Skeleton, Form,Input,Button,Select} from 'antd';
import { useState } from 'react';
const { Option } = Select;
const { Meta } = Card;



function  UserCard  ({userData})  {



const[full_name,setFullName]=useState('')
const [phone_number,setPhoneNumber]=useState('')
const [gender,setGender]=useState([])
const [bio , setBio]=useState([])
const[form,setForm]=useState(false)

function handleChange(e){
  setProfile({...profile, [e.target.name]: e.target.value});
}
const onChange = (value) => {
  console.log(`selected ${value}`);
  setGender(`${value}`)




}

function handleSubmit(e){
  e.preventDefault()
  fetch(`http://localhost:3000/user_profiles/2`, {
      method: "PUT",
      headers: {
          "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        full_name,
        gender,
        phone_number,
        bio
      }),
  })
  .then((r) => r.json())
  .then((data) => console.log(data))

  
}

  return (
<>

{ form ? 



<>

moz
<Card
      style={{
        marginTop: 16,
        width: "100%",
        boxShadow: "1px 1px 1px #888" ,
        borderTopStyle: "dashed"
      }}
   
    >
      
      <Form
      
   
      >
  
  <Form.Item  >
        <Input placeholder="input full name"  value={full_name} name="full_name" onChange={(e=>setFullName(e.target.value))} />
      </Form.Item>

      <Form.Item

>
<Input placeholder="input phone-number"  name="phone_number" value={phone_number} onChange={(e=>setPhoneNumber(e.target.value))}
/>
</Form.Item>

<Form.Item>

<Select
    placeholder="Select a gender"
    onChange={onChange}
    style={{width:"100%"}}
 >
    <Option value="male">male</Option>
    <Option value="female">female</Option>
    <Option value="n/a">prefer not to say</Option>
  </Select>

  </Form.Item>

<Form.Item>
<Input placeholder="input bio"  name="bio"  value={bio} onChange={(e=>setBio(e.target.value))}
/>
</Form.Item>



<Button type="submit"    onClick={handleSubmit} >
            Submit
          </Button>
     
      </Form>

    </Card>








</>
    :
 <>
 { userData.user_profile ? 
<>
   <Card
      style={{
        marginTop: 16,
        width: "100%",
        boxShadow: "1px 1px 1px #888" ,
        borderTopStyle: "dashed"
      }}
   
    >
      <div
      style={{ float:"left"}}
      >
      full name
      </div>

   
<div
style={{ float:"right"}}
>
{userData.user_profile.full_name}
</div>
   
    </Card>



   <Card
      style={{
        marginTop: 16,
        width: "100%",
        boxShadow: "1px 1px 1px #888" 
      }}
   
    >
      <div
      style={{ float:"left"}}
      >
    phone
      </div>
<div
style={{ float:"right"}}
>
{userData.user_profile.phone_number}
</div>
   
    </Card>



   <Card
      style={{
        marginTop: 16,
        width: "100%",
        boxShadow: "1px 1px 1px #888" 
      }}
   
    >
      <div
      style={{ float:"left"}}
      >
   
      </div>
<div
style={{ float:"right"}}
>
{userData.user_profile.gender}
</div>
   
    </Card>




   <Card
      style={{
        marginTop: 16,
        width: "100%",
        boxShadow: "1px 1px 1px #888", 
        borderTopStyle: "none"
      }}
   
    >
      <div
      style={{ float:"left"}}
      >
      bio
      </div>
<div
style={{ float:"right"}}
>
{userData.user_profile.bio}
</div>
   
    </Card>
    </>
    : <div> yes</div>}
</>
}</>

  )

}
export default UserCard