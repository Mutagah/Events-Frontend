import Head from "next/head";
import HomePageEvents from "../components/HomePageEvents";
import CategoryList from "../components/CategoryList";
import { Col, Row } from "antd";
import { Carousel } from 'antd';

export const getStaticProps = async () => {
  const res1 = await fetch("http://localhost:3000/events");
  const res2 = await fetch("http://localhost:5000/eventcategories");
  const res3 = await fetch("http://localhost:3000/home_banners");
  const events = await res1.json()
  const categories = await res2.json()
  const homebanners = await res3.json()
  return {
    props: {
      events,
      categories,
      homebanners
    },
  };
};

export default function Home({ categories, events, homebanners }) {
  console.log(homebanners)
  
  return (
    <div>
      <Head>
        <title>Bomboclat Events</title>
      </Head>
      <Row >
        <Col span={24}>
          <Carousel 
          autoplay
          autoplaySpeed={3000}
          easing
          effect="scrollx"
          dots={false}
          draggable
          pauseOnHover={true}
          >
              {homebanners.map((banner) => {
                return(
                  <>
                    <img 
                      src={banner.image_url}
                      alt={banner.title}
                      style={{
                        width: "100%",
                        height: "405px",
                      }}
                    />
                  </>
                )
              })}
                
          </Carousel>
        </Col>
      </Row>

      <br />

      <Row>
        <Col span={24}>
          <div style={{fontWeight: "bolder", marginLeft: 40, fontSize: "30px"}}>
            <p>Check out trending categories</p>
          </div>
        </Col>
      </Row>

      <Row >
        <CategoryList events={categories}/>
      </Row>

      <br />

      <Row>
        <Col span={24}>
          <div style={{fontWeight: "bolder", marginLeft: 40, fontSize: "30px"}}>
            <p>Events available</p>
          </div>
        </Col>
      </Row>

      <Row justify="center" align="middle">
        <HomePageEvents events={events}/>
      </Row>

      <br />

    </div>
  );
}

