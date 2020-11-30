// import { io } from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io-client');

import './index.scss';

const domain = 'http://localhost:5000';
const socketIo = io(domain);

socketIo.on('connect', () => {
  console.log('socket.io connected');
});

function clickComplete(): void {
  const button = document.createElement('button');
  button.innerText = 'Mark as Completed';
  button.addEventListener('click', function () {
    socketIo.emit('mark task completed', {
      challengeId: '1',
      currentTaskId: '2',
      completed: true,
    });
  });
  document.body.appendChild(button);
}

clickComplete();

socketIo.on('update achievements', (data) => {
  console.log('achievements', data.achievements);
});
