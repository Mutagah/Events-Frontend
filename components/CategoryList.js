import { Col, Row } from "antd";
import Link from "next/link";

function CategoryList({events}){
return (
    <Row>
      <Col span={24}>
        <div style={{ marginRight: 10, marginLeft: 10, borderRadius: 20, gap: 20, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row' }}>
          {events.map((event) => {
              return (
                <div key={event.id}>
                  <Link href={`/eventcategories/${event.id}`}>
                    <div style={{
                       textAlign: "center", 
                       border: 1, 
                       borderStyle: "solid", 
                       width: 280, 
                       height: 50, 
                       padding: 2, 
                       cursor: "pointer", 
                       borderRadius: 10,
                       boxShadow: "5px 5px #d1410a"
                       }}>
                      <p style={{marginTop: 10}}><b>{event.category}</b></p>
                    </div>
                  </Link>
                  &nbsp;
                  &nbsp;
                </div>
              );
          })}
        </div>
      </Col>
    </Row>
)
}
export default CategoryList