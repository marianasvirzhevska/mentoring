/* eslint-disable @typescript-eslint/ban-ts-comment */
import http from 'http';
import socketIo from 'socket.io';
import config from 'config';
import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import { AUTHENTICATION_ERROR } from '../constants';

const secret = config.get('secret');
const url: string = config.get('clientConfig.url');

export const initSocket = (server: http.Server): socketIo.Server => {
  const io: socketIo.Server = new socketIo.Server(server, {
    cors: {
      origin: url,
      credentials: true,
    },
  });

  io.use(function (socket: socketIo.Socket, next: NextFunction) {
    //@ts-ignore
    const { query, token } = socket.handshake;

    if (query && token) {
      jwt.verify(token, secret, function (error, decoded) {
        if (error) return next(new Error(AUTHENTICATION_ERROR));
        //@ts-ignore
        socket.decoded = decoded;
        next();
      });
    } else {
      // next(new Error(AUTHENTICATION_ERROR));
      next();
    }
  });

  io.on('connect', (socket) => {
    console.log('socket.io connected');
    socket.on('mark task completed', function (data) {
      console.log(data);
    });
  });

  return io;
};
