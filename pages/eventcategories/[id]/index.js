import {useRouter} from "next/router"
import { useEffect,useState } from "react"
import {Row,Col, Card} from "antd"
import Link from "next/link";

function Event(){
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const {id} = router.query;

  var date = new Date()
  var currentDate = date.getTime()

  useEffect(()=>{
  fetch(`http://localhost:3000/categories/${id}`)
  .then(response => response.json())
  .then((data)=> {
    setCategoryData(data)
    setIsLoading(false)
  })
  },[id])

  if(isLoading === true) return (
    <Row justify="center" align="middle">
      <div style={{marginTop: "25%"}}>
        <div className="loader"></div>
      </div>
    </Row>
  )

  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <Row>
          <Col span={12}>
            <div style={{ textAlign: "center", height: "405px", backgroundColor: "#d1410a"}}>
              <h1 style={{paddingTop: 150, color: "#fff", fontWeight: "bolder", fontSize: 60}}>{categoryData?.title}</h1>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <picture>
            <img 
              src={categoryData?.banner_img}
              alt="Tech"
              style={{
                width: "100%",
                height: "405px",
                display: "block"
              }}
              />
              </picture>
            </div>
          </Col>
        </Row>
      </Col>

      <br />

      <Col span={24}>
        <br />
        <Row justify="center" align="middle">
        <div style={{ marginRight: 10, marginLeft: 10, borderRadius: 20, gap: 20, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row' }}>
          {categoryData.events ?
          (
            categoryData.events.map((event) => {

              return (
                <Row key={event.id}>
                  <Link href={`/specificevent/${event.id}`}>
                      <div >
                        <Card style={{ 
                          textAlign: "left", 
                          width: 280, 
                          height: 420, 
                          padding: 2, 
                          cursor: "pointer",
                          }}
                          cover={<picture><img alt={event.title} src={event.image_url1} height="200px"/></picture>}
                          hoverable
                        >
                          <div>
                            <h1 style={{fontWeight: "bolder", fontSize: "15"}}>{event.title}</h1>
                            <p>{event.event_date}</p>
                            <p style={{color: "#d1410a"}}>{parseInt(((new Date(`${event.event_date}`.split("-").join("/")).getTime()) - currentDate )/(1000 * 60 * 60 * 24)) + " days remaining"}</p>
                            <p>{event.location}</p>
                          </div>
                          
                        </Card>
                      </div>
                  </Link>
                  &nbsp;
                </Row>
              )
            })
          ) : (
            <Col span={24}>
              <Row justify="center" align="middle">
                <div>
                  <h1>There are no available events currently</h1>
                </div>
              </Row>
            </Col>
          )
          }
        </div>
        </Row>
      </Col>
    </Row>
  )
}
export default Event