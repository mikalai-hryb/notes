COLUMNS, ROWS = "ABCDEFG", range(6)
LINES = (
    [
        {(COLUMNS[i + k], ROWS[j]) for k in range(4)}
        for i in range(len(COLUMNS) - 3)
        for j in range(len(ROWS))
    ]
    + [
        {(COLUMNS[i], ROWS[j + k]) for k in range(4)}
        for i in range(len(COLUMNS))
        for j in range(len(ROWS) - 3)
    ]
    + [
        {(COLUMNS[i + k], ROWS[j + k]) for k in range(4)}
        for i in range(len(COLUMNS) - 3)
        for j in range(len(ROWS) - 3)
    ]
    + [
        {(COLUMNS[i + k], ROWS[j - k]) for k in range(4)}
        for i in range(len(COLUMNS) - 3)
        for j in range(3, len(ROWS))
    ]
)


def who_is_winner(pieces_positions):
    players = {}
    board = dict.fromkeys(COLUMNS, 0)
    for position in pieces_positions:
        column, player = position.split("_")
        pos = (column, board[column])
        board[column] += 1
        players.setdefault(player, set()).add(pos)
        print(players)
        if any(line <= players[player] for line in LINES):
            return player
    return "Draw"


print(
    who_is_winner(
        [
            "A_Yellow",
            "B_Red",
            "B_Yellow",
            "C_Red",
            "G_Yellow",
            "C_Red",
            "C_Yellow",
            "D_Red",
            "G_Yellow",
            "D_Red",
            "G_Yellow",
            "D_Red",
            "F_Yellow",
            "E_Red",
            "D_Yellow",
        ]
    )
)
print(LINES[0])


def addNumbers(a, b):
    sum = a + b
    return sum


num1 = int(input())
num2 = int(input())

print("The sum is", addNumbers(num1, num2))
