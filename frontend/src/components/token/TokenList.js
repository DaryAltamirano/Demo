

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
        GetRequest(`tokens/${user_id}`)
            .then((responseData) => setTokensList(responseData.body))
            .catch((error) => console.error(error));
    }, []);
    
    return (
        <div className='container mt-5'>

            <h2> User id: { user_id }</h2>
            <h3> Token List</h3>
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
                      <tr key={token.token_id}>
                        <td>{token.token}</td>
                        <td>{token.used ? "Used" : "No used"}</td>
                        <td>{converseDate(token.created_AT)}</td>
                        <td>{converseDate(token.expirate_AT)}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

const converseDate = (date) => {
    const fechaOriginal = new Date(date);
    const dia = fechaOriginal.getUTCDate();
    const mes = fechaOriginal.getUTCMonth() + 1;
    const anio = fechaOriginal.getUTCFullYear();

    return `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
}

export default TokenList;
