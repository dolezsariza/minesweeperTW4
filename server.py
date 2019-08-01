from flask import Flask, request, redirect, render_template, url_for
import data_manager
app = Flask(__name__)


@app.route('/', methods = ["GET","POST"])
def hello_world():
    if request.method == "POST":
        name = request.form["name"]
        score = request.form["score"]
        difficulty = request.form["difficulty"]
        data_manager.addScore(name,score,difficulty)
    return render_template("index.html", scores=data_manager.getScores())


@app.route('/game', methods = ["GET","POST"])
def game():
    difficulty = request.form["difficulty"]

    if difficulty == "easy":
        row_num = 5
        col_num = 5
    elif difficulty == "medium":
        row_num = 12
        col_num = 12
    else:
        row_num = 20
        col_num = 20

    return render_template("game.html",row_num=row_num, col_num=col_num, difficulty=difficulty)

@app.route('/game-ended', methods=["GET","POST"])
def save_score():
    score = request.form["score"]
    difficulty = request.form["difficulty"]
    return render_template("win.html", score=score, difficulty=difficulty)

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )