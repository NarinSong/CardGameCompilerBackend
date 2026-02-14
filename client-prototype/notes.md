This is a prototype client connecting to the game server.
For now, a lot of functionality is skipped in favor of testing the server code.

What this client should do:
1. Connect to the server and be assigned a unique id
2. Render a New Game button which, when click, will send socket.emit('newGame')
3. The server will handle creating the game and placing the client into the game, then send back the gameState via socket message 'gamestate'
4. The client will then need to render the gamestate, whose definition is described as follows:

Gamestate {
    players Players[]
    board Board
}

Player {
    piles Pile[]
    counters Counter[]
}

Board {
    piles Pile[]
    counters Counter[]
}

Pile {
    Card[]
    label string
    visiblity - FACE_UP, FACE_DOWN, NOT_VISIBLE (enum, so actually 0,1,2)
}

Counter {
    label string
    value number
}

Card {
    suit string
    rank string
}

5. Each rendered pile should have a click function that calls elementClick(label) where label is that pile's label
6. elementClick should call socket.emit('playerClickEvent', label) so that the server can handle the click event
7. The client should expect a new gamestate to be passed after every event. While it's bad in practice, this is a prototype, so we should delete and re-render everything on every update