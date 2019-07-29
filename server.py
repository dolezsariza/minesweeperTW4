from flask import Flask, request, redirect, render_template, url_for

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route('/game')
def game():
    return render_template("game.html",row_num=12, col_num=12)


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )