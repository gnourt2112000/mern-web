import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
const About = () => {
    return (
        <Row className='mt-5'>
            <Col className='text-center'>
                <Button variant='primary' href='https://github.com/gnourt2112000' size='lg'>
                    Visit my github for more projects
                </Button>
            </Col>
        </Row>
    )
}

export default About
