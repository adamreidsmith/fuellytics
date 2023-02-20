from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

if __name__ == '__main__':
    socketio.run(app)


@app.route('/')
def hello():
    return '<h1>Hello, World!</h1>'


@socketio.on('message')
def handle_message(data):
    print('received message: ', data)
    send(data)
