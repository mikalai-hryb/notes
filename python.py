#!/usr/bin/env python3

import json
import os
import requests

print("# download a file and write it to the local machine")
url = "https://raw.githubusercontent.com/mikalai-hryb/notes/main/cors.md"
file_basename = os.path.basename(__file__)
file_basename_stem = os.path.splitext(file_basename)[0]
new_file_basename = f"{file_basename_stem}.txt"
response = requests.get(url)
with open(new_file_basename, mode="wb") as file:
    file.write(response.content)
print(f"download a file to {new_file_basename}")


try:
    response = requests.get(url)
except requests.RequestException as exc:
    print(f"something happened {exc}")

with open("abc.txt", "wb") as file:
    file.write(response.content)
    print("file is written")

print("# try/except/else/finally")
try:
    print(1)
except Exception:
    print(2)
else:
    print(3)
finally:
    print(4)

print("# json")
python_structure = [1, 2, 3, {"4": 5, "6": 7}]
r = json.dumps(python_structure)  # json encoding
print(r)

json_string = '["foo", {"bar":["baz", null, 1.0, 2]}]'
r = json.loads(json_string)  # json decoding
print(r)

print("# if condition")
v = 1
if v == 1:
    print("yes")
elif v == 2:
    print("yes yes")
else:
    print("no")

print("# for loop")
for i in range(10):
    print(i**i)

print("# for loop with dict")
d = {"a": 5, "b": 4}
for k, v in d.items():
    d[k] += 2
print(d)

print("# functions")


def do_something(arg1, arg2, arg3=4):
    return min(arg1, arg2, arg3)


print(do_something(20, 15, 10))
print(do_something(20, 15))

print("# __name__")
if __name__ == "__main__":
    print("running as a program")

# docstring in Python
# scopes in Python

PEOPLE = [
    {
        "name": "Jane Smith",
        "age": ...,
        "languages": ["Python", "Go", "C"],
        "salary": 100,
    },
    {
        "name": "Gaurav Agarwal",
        "age": 35,
        "languages": ["PhP", "python3", "python2", "yaml. it's a language!"],
        "salary": 140,
    },
    {"name": "Jagdeep Gaur", "age": 28, "languages": ["c++", "c"], "salary": 110},
    {
        "name": "Alex Schmitz",
        "age": 75,
        "languages": ["\u2728 \U0001f370 \u2728"],
        "salary": 25,
    },
]
print(PEOPLE)
