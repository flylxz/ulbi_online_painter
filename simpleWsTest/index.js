const btn = document.getElementById('btn');
const socket = new WebSocket('ws://localhost:5000/');

socket.onopen = () => {
  socket.send(
    JSON.stringify({
      message: 'Hello',
      id: '555',
      userName: 'Alex',
      method: 'connection',
    })
  );
};

socket.onmessage = (e) => {
  console.log('Receive message: ', e.data);
};
// console.log(btn);
btn.addEventListener('click', () => {
  console.log('click');
  socket.send(
    JSON.stringify({
      message: 'Hello',
      id: '555',
      userName: 'Alex',
      method: 'message',
    })
  );
});
