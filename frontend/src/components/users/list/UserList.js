import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { GetRequest, PostRequest, DeleteRequest, PutRequest } from '../../../common/api';
import { Link } from 'react-router-dom';

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

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {

            if (newUser) {
                await PostRequest('users', formData)
                    .then((responseData) => {
                        setFormData({ user_id: '', name: '', user_name: '', birthday_date: '' });
                    })
                    .catch((error) => console.error(error));
            } else {
                await PutRequest(`users/${formData.user_id}`, formData)
                    .then((responseData) => {
                        setFormData({ user_id: '', name: '', user_name: '', birthday_date: '' });
                    })
                    .catch((error) => console.error(error));
            }
            GetRequest('users')
                .then((responseData) => setUserList(responseData.body))
                .catch((error) => console.error(error));
            setShow(false);

            return
        }
        setValidated(true);
    };

    const handleClose = () => setShow(false);

    const handleShow = (user) => {
        setFormData(user);
        setShow(true);

        setNewUser(user.name === '');

    }
    const converseDate = (date) => {
        const fechaOriginal = new Date(date);
        const dia = fechaOriginal.getUTCDate();
        const mes = fechaOriginal.getUTCMonth() + 1;
        const anio = fechaOriginal.getUTCFullYear();

        return `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        GetRequest('users')
            .then((responseData) => setUserList(responseData.body))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <div className='container mt-5'>
                <h2> User List</h2>

                <div className='d-flex justify-content-end mb-4'>
                    <Button variant="primary" onClick={() => handleShow({ user_id: '', name: '', user_name: '', birthday_date: '' })}>
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
                                <td>{converseDate(user.birthday_date)}</td>
                                <td className="d-flex justify-content-center">
                                    <Link to={`/token/list/${user.user_id}`}>
                                        <Button variant="info" className="mx-2">Tokens</Button>
                                    </Link>

                                    <Button variant="warning" onClick={() => handleShow(user)} >Edit</Button>
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
                                    value={converseDate(formData.birthday_date)}
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
