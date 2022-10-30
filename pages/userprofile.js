import { Col, Row ,Card} from 'antd';
import { AntDesignOutlined,EditOutlined,LogoutOutlined } from '@ant-design/icons';
import { Avatar,Button } from 'antd';
import {LeftSquareOutlined} from  '@ant-design/icons';
import UserCard from '../components/UserCard';
import {useEffect,useState} from 'react'
function Userprofile() {
const [userData,setUserData] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:3000/users/2`)
    .then(response => response.json())
    .then((data)=> {
  setUserData(data)
     
    })
    },[])
  


  return (
  <div
  style={{width: "100%" ,
  textAlign: "center",
  }}
  >



  
<Row 
style={{width: "100%" ,
textAlign: "center",
justifyContent:"center"
}}> 
 <Card
    hoverable
    style={{
      background: "grey",
      borderRadius: "50%",
      width: "100px",
      height: "100px",
      }}>
        avatar image
     </Card>
     

</Row>
<br></br>
<Row
style={{width: "100%" ,
textAlign: "center",
justifyContent:"center"
}}> 
{userData.username}

</Row>

<Row>
  <UserCard userData={userData}/>
</Row>
<br></br>
<Row>
<Button 

style={{width: "100%" ,
textAlign: "center",
justifyContent:"center"
}}

type="primary" icon={<LogoutOutlined />} size="large"/>

</Row>
</div>
    

  )
}

export default Userprofile