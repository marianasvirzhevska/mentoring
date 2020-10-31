import './index.scss';

function printHelloWorld(): void {
  const greeting = document.createTextNode('Hello World!');

  document.body.appendChild(greeting);
}

printHelloWorld();
