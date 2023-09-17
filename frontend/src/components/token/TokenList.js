

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import { GetRequest } from '../../common/api';


function TokenList() {
    const { user_id } = useParams()
    const [tokensList, setTokensList] = useState([]);

    useEffect(() => {
        GetRequest(`token/${user_id}`)
            .then((responseData) => setTokensList(responseData.body))
            .catch((error) => console.error(error));
    }, []);
    
    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-end mb-4'>
                <Link to={`/token/${user_id}`}>
                    <Button variant="info" className="mx-2">Virtual Token</Button>
                </Link>
            </div>

            <Table striped bordered hover variant="white">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>Used</th>
                        <th>Created </th>
                        <th>Expirate </th>
                    </tr>
                </thead>
                <tbody>
                {tokensList.map((token) => (
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TokenList;
