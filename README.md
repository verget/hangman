# Hangman
```
     +---+
     |   |
     O   |
    /|\  |
    / \  |
         |
  =========
```


This project was made like a small challenge to demonstrate ability to make a maintainable, extendable and self documented app with proposed technology stack

This mono-repo system includes:

- A simple API for clients to play the game 
- An interface for users to play the game

## Challenge Rules

+ Chooses a random word out of 6 words: [3dhubs, marvin, print, filament, order, layer] + Display the spaces for the letters of the word (eg: '​_ _ _​ _ _' for 'order')
+ The user can choose a letter and if that letter exists in the chosen word it should be shown on the puzzle (eg: asks for 'r' and now it shows '​_ r _​ _ r' for 'order')
+ The user can only ask 5 letters that don't exist in the word and then it's game overIf the user wins, congratulate the user and save their high score (you are free to define what is a “high score”)

## Technology

- Angular9
- Python
- Django Rest Framework

## How to Use

### Run api

1. Go to `api` directory
2. `pip3 install -r requirements.txt`
4. Run server with `python3 manage.py runserver 8008`

### Run Angular interface

1.  Go to `ng-app` directory
2. Install interface dependency by `npm install`
3. Run `ng serve` for a dev server.

## Running unit tests

Run `ng test` in `ng-app` directory to execute the unit tests via [Karma](https://karma-runner.github.io).