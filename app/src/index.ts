// import { io } from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io-client');

import './index.scss';

const domain = 'http://localhost:5000';
const socketIo = io(domain);

socketIo.on('connect', () => {
  console.log('socket.io connected');
  socketIo.on('massage', (data) => {
    console.log('Socket connected', data);
  });
});

function clickComplete(): void {
  const button = document.createElement('button');
  button.innerText = 'Mark as Completed';
  button.addEventListener('click', function (e) {
    socketIo.emit('another event', { completed: true, id: 20 });
  });
  document.body.appendChild(button);
}

clickComplete();

function printHelloWorld(): void {
  const greeting = document.createTextNode('Hello World!');

  document.body.appendChild(greeting);
}

printHelloWorld();
