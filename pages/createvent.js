import { useRouter } from 'next/router'
import {Button,Cascader,DatePicker,TimePicker,Form,Input,InputNumber,Radio,Select,Switch,TreeSelect} from 'antd';
import  { useEffect } from 'react';
import moment from 'moment';
const { option } = Select;

const Createvent= () => {

  let router= useRouter()

   // condition base redirecting
  //   function redirect() {
  //     router.push('/login')
  //   }


  useEffect(()=>{
		fetch('http://localhost:3000/auth')
		.then(res=>{
			if(res.status === 401){
				router.push('/login')
			}
		})
  });
  


  // const [formData, setFormData] = useState({
  //   event_date: '',
  //   event_time: '',
  //   early_booking_end_date: '',
  //   early_booking_end_time: '',
  //   early_booking_price_regular: '',
  //   early_booking_price_vip: '',
  //   location: '',
  //   regular_price: '',
  //   vip_price: '',
  //   vip_no_of_tickets: '',
  //   regular_no_of_tickets: '',
  //   banner_img: '',
  //   description:'',
  //   image_url1:'',
  //   image_url2:'',
  //   category_id:'',
  //   title:''
  //   })

  //   function handleSubmit(e){
  //     e.preventDefault()
  //     fetch(`http://localhost:3000/events`, {
  //         method: "POST",
  //         headers: {
  //             "Content-Type" : "application/json"
  //         },
  //         body: JSON.stringify(formData),
  //     })
  //     .then((r) => r.json())
  //     .then((data) => console.log(data))
  //     setFormData(
  //         {
  //           event_date: '',
  //           event_time: '',
  //           early_booking_end_date: '',
  //           early_booking_end_time: '',
  //           early_booking_price_regular: '',
  //           early_booking_price_vip: '',
  //           location: '',
  //           regular_price: '',
  //           vip_price: '',
  //           vip_no_of_tickets: '',
  //           regular_no_of_tickets: '',
  //           banner_img: '',
  //           description:'',
  //           image_url1:'',
  //           image_url2:'',
  //           category_id:'',
  //           title:''
  //         }
  //     )
  // }

  //     // function for handling input of data.
  //     function handleChange(e){
  //       setFormData({...formData, [e.target.name]: e.target.value});
  //   }
    


  return (
    <p>hello</p>
//     <div className='create'>
//     <Form
//       labelCol={{
//         span: 4,
//       }}
//       wrapperCol={{
//         span: 14,
//       }}
//       onSubmit={handleSubmit}
     
//     >
     
  
//       <Form.Item label="category" >
//       <select onChange={handleChange}name="category_id" >
//       <option value="1">Music</option>
//       <option value="2">Business</option>
//       <option value="3">Games</option>
//       <option value="4">Hobbies</option>
//       <option value="5">Food & Drink</option>
//       <option value="6">Performing Arts</option>
//       <option value="7">Sciences</option>
//       <option value="8">Sport & Fitness</option>
//     </select>
//       </Form.Item>

//       <Form.Item label="title">
//         <Input onChange={handleChange}name='title' value={formData.title}/>
//       </Form.Item>

//       <Form.Item label="event_date">
//         <input type='date' onChange={handleChange}name='event_date' value={formData.event_date}/>
//       </Form.Item>

//       <Form.Item label="event_time">
     
//         <input type='time' value={formData.event_time} size="large" onChange={handleChange}name='event_time' />

//       </Form.Item>

//       <Form.Item label="early_booking_end_date">
//       <input type='date'  onChange={handleChange}name='early_booking_end_date'/>
//       </Form.Item>

//       <Form.Item label="early_booking_end_time">
//       <input type='time' value={formData.early_booking_end_time} onChange={handleChange}name='early_booking_end_time' />
//       </Form.Item>
   
     
//       <Form.Item label="Early_booking_price_regular">
//         <input  type='integer' value={formData.early_booking_price_regular}  onChange={handleChange}name='early_booking_price_regular'/>
//       </Form.Item>

        
//       <Form.Item label="Early_booking_price_vip">
//         <input value={formData.early_booking_price_vip}  onChange={handleChange} name='early_booking_price_vip'/>
//       </Form.Item>
      
   

//       <Form.Item label="location">
//       <Input value={formData.location} onChange={handleChange} name='location'/>
//       </Form.Item>

    

// <Form.Item label="Regular ticket price">
//         <input value={formData.regular_price} onChange={handleChange}name='regular_price'/>
//       </Form.Item>

//       <Form.Item label="vip ticket price">
//         <input value={formData.vip_price}onChange={handleChange}name='vip_price'/>
//       </Form.Item>

      
 

// <Form.Item label="vip_no_of_tickets">
//   <input value={formData.vip_no_of_tickets} onChange={handleChange}name='vip_no_of_tickets' />
// </Form.Item>

// <Form.Item label="regular_no_of_tickets">
//   <input value={formData.regular_no_of_tickets} onChange={handleChange}name='regular_no_of_tickets' />
// </Form.Item>


//       <Form.Item label="banner_img">
//       <Input  value={formData.banner_img}onChange={handleChange}name='banner_img' />
//       </Form.Item>

//       <Form.Item label="description">
//       <Input  value={formData.description}onChange={handleChange} name='description'/>
//       </Form.Item>


//       <Form.Item label="image_url1">
//       <Input  value={formData.image_url1}onChange={handleChange}name='image_url1'/>
//       </Form.Item>

//       <Form.Item label="image_url1">
//       <Input value={formData.image_url2} onChange={handleChange}name='image_url2'/>
//       </Form.Item>
      
      
//       <Form.Item>
//         <Button type="Submit" onClick={handleSubmit}>Submit
//         </Button>
//         </Form.Item>
//     </Form>
    
//    </div>
//   )
// }
  )}
export default Createvent;

