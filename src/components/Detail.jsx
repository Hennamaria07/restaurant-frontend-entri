import { Col, Container, Row, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

export const Detail = () => {
  const rest = useSelector((state) => state.data.restaurants)
  const { id } = useParams();
  console.log(id);

  const newRest = rest.find((data) => data._id == id);
  console.log(newRest);
  return (
    <Container>
      {newRest && <Row>
        <Col className='mt-4'>
          <Card className="text-center">
            <Card.Header className='fs-4'>{newRest.name}</Card.Header>
            <Card.Body>
              <Card.Title>About Us</Card.Title>
              <Card.Text className='pb-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi necessitatibus doloribus similique tenetur, repudiandae magni in inventore totam blanditiis, unde perspiciatis soluta esse laudantium, quibusdam dignissimos officiis delectus alias quas.. Earum officia, dignissimos, veniam eligendi illo minus modi facilis porro tempora, maxime dolorum impedit adipisci aperiam doloremque. Rerum doloribus dignissimos possimus repudiandae.
              </Card.Text>
            </Card.Body> 
            <Card.Footer className="text-muted">{newRest.address}</Card.Footer>
          </Card>
        </Col>
      </Row>}
      {newRest && <Container>
        <Row>
          {/* <h2 className='text-center my-4'>Reviews</h2> */}
          {/* {newRest && newRest.reviews && newRest.reviews.map((review, index) => (
            <Col md={4} key={review.id} className='mb-4'>
              <Card>
                <Card.Header className='text-center fs-5'>{review.name}</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote fs-6 mb-0">
                    <p style={{ height: '250px' }}>{review.comments}</p>
                    <footer className="blockquote-footer">{review.date}</footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
          ))} */}
        </Row>
      </Container>}
    </Container>
  )
}
