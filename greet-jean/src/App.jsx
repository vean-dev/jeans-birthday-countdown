import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountdownOver, setIsCountdownOver] = useState(false);

  // Hard-coded date and time
  const targetDate = new Date('2024-10-15T23:59:59').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
        setIsCountdownOver(true);
        triggerConfetti();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-white" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
      {!isCountdownOver ? (
        <div className="text-center">
          <Table hover>
          <tbody>
            <tr>
              <td class='fs-1 text'>{timeLeft.days}</td>
              <td class='fs-1 text'>{timeLeft.hours}</td>
              <td class='fs-1 text'>{timeLeft.minutes}</td>
              <td class='fs-1 text'>{timeLeft.seconds}</td>
            </tr>
            <tr>
              <td>Days</td>
              <td>Hours</td>
              <td>Minutes</td>
              <td>Seconds</td>
            </tr>
          </tbody>
          </Table>
          

          {/* <Row className="justify-content-center">
            <Col xs={3} md={3}>
              <Card className="bg-light bg-opacity-20 text-center rounded">
                <Card.Body>
                  <Card.Title className="display-3">{timeLeft.days}</Card.Title>
                  <Card.Text style={{ fontSize: '1rem' }}>Days</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3} md={3}>
              <Card className="bg-light bg-opacity-20 text-center rounded">
                <Card.Body>
                  <Card.Title className="display-4">{timeLeft.hours}</Card.Title>
                  <Card.Text>Hrs</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3} md={3}>
              <Card className="bg-light bg-opacity-20 text-center rounded">
                <Card.Body>
                  <Card.Title className="display-4">{timeLeft.minutes}</Card.Title>
                  <Card.Text>Mins</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3} md={3}>
              <Card className="bg-light bg-opacity-20 text-center rounded">
                <Card.Body>
                  <Card.Title className="display-4">{timeLeft.seconds}</Card.Title>
                  <Card.Text>Secs</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          */}
          <h1 className="display-4 mb-4">Before your best day</h1>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="display-1 mb-4 animate-bounce">Happy Birthday Jean!</h1>
          <p className="display-5">God Bless You, Pakabait ka!!</p>
          <Button
            onClick={triggerConfetti}
            className="mt-3"
            variant="light"
            style={{ color: '#6f42c1' }} // Change text color to match your theme
          >
            More Confetti!
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
