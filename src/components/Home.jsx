import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const rest = useSelector((state) => state.data.restaurants)
  return (
    <Container>
      {/* <Button onClick={activated} >State</Button> */}
        <Row>
        { rest && rest.map((data) => (
                                      <Col md = {3} key={data._id} >
                                      <Card className='my-3' style={{height: '500px'}}>
                                        {console.log(data.photograph)}
                                <Card.Img variant="top" src= {process.env.REACT_APP_SERVER_URL + data.photograph} style={{height: '250px'}}/>
                                <Card.Body>
                                  <Card.Title>{data.name}</Card.Title>
                                  <Card.Subtitle className='py-2 fs-6'>{data.address}</Card.Subtitle>
                                  <Card.Text>
                                    {/* {data.} */}
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                  </Card.Text>
                                  <Button as={Link} to={`/details/${data._id}`} variant="warning">Go somewhere</Button>
                                </Card.Body>
                              </Card>
                                      </Col>
        )) }

        </Row>
    </Container>
  )
}

export default Home;