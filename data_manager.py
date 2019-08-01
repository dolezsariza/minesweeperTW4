import datetime


def addScore(name, score, difficulty):
    with open("db/db.csv", "r+") as file:
        file.write(('\n' if len(file.read()) != 0 else '')
                   + str(datetime.datetime.now())[:-7] + ";" + name + ";" + str(score) + ";" + difficulty)


def getScores():
    with open("db/db.csv", "r") as file:
        rLines = file.readlines()

        if len(rLines) != 0:
            lines = {x.replace('\n', '') for x in rLines}
            items = [score.split(';') for score in lines]

            return sorted(items, key=lambda x: int(x[2]), reverse=True)

    return None
