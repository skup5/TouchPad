from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import pyautogui as robot

PORT = 3000

app = Flask('FlaskServer')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


# @app.route('/')
# def index():
#     return render_template('index.html')


@socketio.on('connected')
def connected(val):
    print('connected ', val)


@socketio.on('hey')
def test_message(message):
    print('received: ', message)
    emit('hey', {'data': 'Hey, Im Python'})


@socketio.on('moveRel')
def move_rel(coordinates):
    print(coordinates)
    robot.moveRel(coordinates.get("x"), coordinates.get("y"), 2)


if __name__ == '__main__':
    socketio.run(app, port=PORT)
