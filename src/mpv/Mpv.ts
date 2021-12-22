import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Socket } from 'net';

import MpvSocket from './MpvSocket';

class Mpv {
  private childProcess: ChildProcessWithoutNullStreams;
  private mpvSocket: MpvSocket;

  constructor(binary: string, ipcServer: string) {
    const args = [`--input-ipc-server=${ipcServer}`, '--idle=yes'];

    this.childProcess = spawn(binary, args);

    process.on('exit', () => this.kill());

    this.childProcess.on('exit', () => process.off('exit', () => this.kill()));
    this.childProcess.on('error', (error) => console.log(error));

    this.childProcess.stdout.setEncoding('utf8');
    this.childProcess.stdout.on('data', () => {
      return;
    });

    this.childProcess.stderr.setEncoding('utf8');
    this.childProcess.stderr.on('data', () => {
      return;
    });

    this.mpvSocket = new MpvSocket(ipcServer);
  }

  get socket(): Socket {
    return this.mpvSocket.socket;
  }

  async play(file: string) {
    await this.mpvSocket.send(['loadfile', file]);
  }

  kill() {
    this.childProcess.kill();
  }
}

export default Mpv;
