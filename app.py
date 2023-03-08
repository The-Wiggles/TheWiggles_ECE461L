from flask import Flask
from flask.helpers import send_from_directory

app = Flask(__name__, static_folder='./fruit-salad/build', static_url_path='/')

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/test')
def test():
    return 'test'

if __name__ == '__main__':
    app.run()