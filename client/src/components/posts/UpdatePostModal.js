import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useState ,useEffect} from 'react'
import { PostContext } from '../../contexts/PostContext'
const UpdatePostModal = () => {

    const {showUpdatePostModal,setShowUpdatePostModal,updatePost,setShowToast,postState:{post}} = useContext(PostContext)
    
    const [updatedPost,setUpdatedPost] = useState(post)

    useEffect(()=> setUpdatedPost(post),[post])

    const {title,description,url,status} = updatedPost

    const onChangeUpdatedPostForm = event => setUpdatedPost({...updatedPost,[event.target.name]:event.target.value})
    
    const closeDialog = () =>{
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
        
    }

    const onSubmit = async event =>{
        event.preventDefault()
        const {success,message} = await updatePost(updatedPost)
        setShowUpdatePostModal(false)
        setShowToast({show:true,message,type:success ? 'success':'danger'})
    }
    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress</Modal.Title>
            </Modal.Header>
            <Form onSubmit = {onSubmit}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Control type = 'text' placeholder='Title' name='title' value={title} onChange={onChangeUpdatedPostForm} required></Form.Control>
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control as='textarea' rows={3} placeholder='Description' value={description} onChange={onChangeUpdatedPostForm} name='description'></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control type='text' placeholder='Youtube Tutorial URL' name='url' value={url} onChange={onChangeUpdatedPostForm}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Select  value={status} name='status' onChange={onChangeUpdatedPostForm}>
                            <option value="TO WATCH">TO WATCH</option>
                            <option value="WATCHING">WATCHING</option>
                            <option value="WATCHED">WATCHED</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>Watch</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal
