import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
const AddPostModal = () => {

    const {showAddPostModal,setShowAddPostModal,addPost,setShowToast} = useContext(PostContext)
    
    const [newPost,setNewPost] = useState({
        title:'',
        description:'',
        url:'',
        status:'TO WATCH'
    })

    const {title,description,url} = newPost

    const onChangeNewPostForm = event => setNewPost({...newPost,[event.target.name]:event.target.value})
    const closeDialog = () =>{
        setNewPost({title:'',description:'',url:'',status:'TO_WATCH'})
        setShowAddPostModal(false)
    }

    const onSubmit = async event =>{
        event.preventDefault()
        const {success,message} = await addPost(newPost)
        setNewPost({title:'',description:'',url:'',status:'TO WATCH'})
        setShowAddPostModal(false)
        setShowToast({show:true,message,type:success ? 'success':'danger'})
    }
    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to watch</Modal.Title>
            </Modal.Header>
            <Form onSubmit = {onSubmit}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Control type = 'text' placeholder='Title' name='title' value={title} onChange={onChangeNewPostForm} required></Form.Control>
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control as='textarea' rows={3} placeholder='Description' value={description} onChange={onChangeNewPostForm} name='description'></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control type='text' placeholder='URL' name='url' value={url} onChange={onChangeNewPostForm}></Form.Control>
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

export default AddPostModal
