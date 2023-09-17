import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { GetRequest, PostRequest, DeleteRequest, PutRequest } from '../../../common/api';

function UserList() {

    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [userList, setUserList] = useState([]);
    const [formData, setFormData] = useState({
        user_id: '',
        name: '',
        user_name: '',
        birthday_date: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const deleteElement = (user_id) => {
        DeleteRequest(`users/${user_id}`)
            .then(() => {
                setUserList(userList.filter((user) => user.user_id !== user_id));
            })
            .catch((error) => console.error(error));
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {

            if (newUser){
                PostRequest('users', formData)
                .then((responseData) => {
                    setUserList([...userList, responseData.body]);
                    setFormData({ name: '', user_name: '', birthday_date: '' });
                })
                .catch((error) => console.error(error));
            } else {
                PutRequest(`users/${formData.user_id}`, formData)
                .then((responseData) => {
                    setUserList([...userList, responseData.body]);
                    setFormData({ name: '', user_name: '', birthday_date: '' });
                })
                .catch((error) => console.error(error));
            }
            setShow(false);

            return
        }
        setValidated(true);
    };

    const handleClose = () => setShow(false);

    const handleShow = (user) => {
        setShow(true) 
        if (user != null)  {
            setFormData(user)
        }else { 
            setFormData({
                name: '',
                user_name: '',
                birthday_date: '',
            }) 
            setNewUser(true)
        }

    }

    useEffect(() => {
        GetRequest('users')
            .then((responseData) => setUserList(responseData.body))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <div className='container mt-5'>
                <div className='d-flex justify-content-end mb-4'>
                    <Button variant="primary" onClick={handleShow}>
                        Create User
                    </Button>
                </div>

                <Table striped bordered hover variant="white">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Dirthday Date</th>
                            <th className='d-flex justify-content-center'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.name}</td>
                                <td>{user.user_name}</td>
                                <td>{new Date(user.birthday_date).toLocaleDateString()}</td>
                                <td className="d-flex justify-content-center">
                                    <Button variant="warning"  onClick={() => handleShow(user)} >Edit</Button>
                                    <Button variant="danger" className="mx-2" onClick={() => deleteElement(user.user_id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>{newUser ? "Create User" : "Edit User"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Darien Altamirano"
                                    value={formData.name}
                                    name="name"
                                    onChange={handleInputChange}
                                    autoFocus
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>User</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="DaryPte"
                                    value={formData.user_name}
                                    name="user_name"
                                    onChange={handleInputChange}
                                    autoFocus
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid User.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Birthday Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={formData.birthday_date}
                                    name="birthday_date"
                                    onChange={handleInputChange}
                                    autoFocus
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </>
    );
}

export default UserList;
