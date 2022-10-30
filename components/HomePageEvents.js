import Link from "next/link";
import { Col, Card, Row } from "antd";

const HomePageEvents = ({ events }) => {
  var date = new Date();
  var currentDate = date.getTime();
    console.log(events)
  const filteredDates = (Array.isArray(events) ? events : []).filter(
    (event) =>
      parseInt(
        (new Date(`${event.event_date}`.split("-").join("/")).getTime() -
          currentDate) /
          (1000 * 60 * 60 * 24)
      ) > 0
  );

  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <div
          style={{
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 20,
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
            display: "inline-flex",
            flexDirection: "row",
          }}
        >
          {(Array.isArray(filteredDates) ? filteredDates : []).map((event) => {
            return (
              <>
                <Link href={`/specificevent/${event.id}`}>
                  <div>
                    <Card
                      style={{
                        textAlign: "left",
                        width: 280,
                        height: 420,
                        padding: 2,
                        cursor: "pointer",
                      }}
                      cover={
                        <picture>
                        <img
                          alt={event.title}
                          src={event.image_url1}
                          height="200px"
                        />
                        </picture>
                      }
                      hoverable
                    >
                      <div>
                        <h1 style={{ fontWeight: "bolder", fontSize: "15" }}>
                          {event.title}
                        </h1>
                        <p>{event.event_date}</p>
                        <p style={{ color: "#d1410a" }}>
                          {parseInt(
                            (new Date(
                              `${event.event_date}`.split("-").join("/")
                            ).getTime() -
                              currentDate) /
                              (1000 * 60 * 60 * 24)
                          ) + " days remaining"}
                        </p>
                        <p>{event.location}</p>
                      </div>
                    </Card>
                  </div>
                </Link>
                &nbsp;
              </>
            );
          })}
        </div>
      </Col>
    </Row>
  );
};
export default HomePageEvents;
