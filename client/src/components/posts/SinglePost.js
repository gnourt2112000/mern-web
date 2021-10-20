import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ActionButtons from './ActionButtons'
import Badge from 'react-bootstrap/Badge'
const SinglePost = ({post:{_id,status,title,description,url}}) => {
    return (
        <Card className='shadow' border={status === 'WATCHED' ? 'success' : status ==='WATCHING' ? 'warning' : 'danger'}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className='post-title'>{title}</p>
                            <Badge fill className='fw-bolder text-white' bg={status === 'WATCHED' ? 'success' : status ==='WATCHING' ? 'warning' : 'danger'}>
                                {status}
                            </Badge>
                        </Col>

                        <Col className='text-end'>
                            <ActionButtons url={url} _id={_id}></ActionButtons>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SinglePost
