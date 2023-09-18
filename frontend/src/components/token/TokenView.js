
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const SERVER_URL = process.env.BACKEND_URL_SOCKET || 'http://localhost:4000';

function TokenView() {
  const [virtualToken, setVirtualToken] = useState(0);
  const [timeToken, setTimeToken] = useState(0);
  const { user_id } = useParams()

  let socket;

  useEffect(() => {
    socket = io(SERVER_URL);

    socket.emit('getToken', user_id);

    socket.on('pushToken', (data) => {
      setVirtualToken(data.token);
      setTimeToken(data.time);
    });

    return () => {
      socket.disconnect();
    };

  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Virtual Token:</h1>

      <h2 className=" mt-5  pt-5 text-center text-xxl">{virtualToken}</h2>

      <ProgressBar min="0" max="60" now={timeToken} label={`${timeToken} segundos`} />
      <Link className="d-flex flex-row-reverse p-5" to={`/token/list/${user_id}`}>
        <Button variant="secondary" className="mx-2" >Back</Button>
      </Link>
    </div>
  );
}


export default TokenView;
