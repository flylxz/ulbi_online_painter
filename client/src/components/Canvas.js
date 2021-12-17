import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Button } from 'react-bootstrap';

import canvasState from '../store/canvasState';
import Brush from '../tools/Brush';
import toolState from '../store/toolState';

import '../styles/canvas.scss';
import { useParams } from 'react-router-dom';
import Rect from '../tools/React';
import axios from 'axios';

export const Canvas = observer(() => {
  const canvasRef = useRef();
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState('');
  const { id } = useParams();

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const connectionHandler = () => {
    canvasState.setUsername(username);
    setShow(false);
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    axios.get(`http://localhost:5000/image/?id=${id}`).then((response) => {
      const img = new Image();
      img.src = response.data;
      img.onload = async () => {
        this.ctx.clearRect(
          0,
          0,
          canvasRef.current.canvas.width,
          canvasRef.current.canvas.height
        );
        this.ctx.drawImage(
          img,
          0,
          0,
          canvasRef.current.canvas.width,
          canvasRef.current.canvas.height
        );
        this.ctx.stroke();
      };
    });
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket('ws://localhost:5000/');
      canvasState.setSocket(socket);
      canvasState.setSessionId(id);
      toolState.setTool(new Brush(canvasRef.current, socket, id));

      socket.onopen = () => {
        const data = {
          id,
          username: canvasState.username,
          method: 'connection',
        };
        // console.log('open------', data);
        socket.send(JSON.stringify(data));
      };

      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        // console.log(event.data);
        switch (msg.method) {
          case 'connection':
            console.log(`User ${msg.username} has connected`);
            break;
          case 'draw':
            drawHandler(msg);
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const { figure } = msg;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y, figure.color);
        break;
      case 'rect':
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        );
        break;
      case 'finish':
        ctx.beginPath();
        break;
    }
  };

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const mouseUpHandler = () => {
    axios
      .post(`http:/localhost:5000/image?id=${id}`, {
        img: canvasRef.current.toDataURL,
      })
      .then((response) => console.log(response.data));
  };

  const inputHandler = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="canvas">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={username}
            onChange={(e) => inputHandler(e)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={() => mouseDownHandler()}
        onMouseUp={mouseUpHandler}
        ref={canvasRef}
        width={600}
        height={400}
      ></canvas>
    </div>
  );
});
