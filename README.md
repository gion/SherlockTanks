Sherlock Tanks
========

To run the game:
-------------
Run /dist/index.html on a web server (can be local, using XAMPP or similar) or just use Firefox (which supports AJAX locally).

All libraries are loaded from their respective CDNs, you will need a working Internet connection to run it.

About the game
-------------
Avoid colliding with the tanks and you'll live! Touch any of them and you're off the grid.
Your target is to eliminate all four enemies.


Controls
-------------
* Left, Right: Move
* Up: Jump (obviously, these are very versatile tanks)
* Space: Shoot

About the code
-------------
* js/game/services/LoopService.js: Handles game update frequency & functions
* js/game/directives and assets/templates: Directives and their templates connect the classes logic to what's shown on the screen
* js/game/classes: Files here contain the logic for all game world related aspects, including collision detection (World.js) and Entity behavior (Entity.js, Character.js, Hero.js, Boss.js)
