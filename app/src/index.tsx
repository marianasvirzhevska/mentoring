// import * as io from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io-client');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

socketIo.on('update achievements', (data: any) => {
  console.log('achievements', data.achievements);
});

function App() {
  return <div>Hello!</div>;
}

ReactDOM.render(<App />, document.getElementById('root'));
