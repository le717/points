# Points Tracker
> Keep track of players and their points

## History
I needed a way to easily keep track of players in a game and their scores. Previously, I would call
on an assistant to keep track, but they would have to determine a tracking method each time, and
let's be honest, keeping track of points in your Notes app is not easy.

So, one afternoon, I made this quick webapp to keep track of players and their points. Now, I or
an assistant can keep track from our phones in an easy and obvious manner.

## Usage
1. Visit [le717.github.io/points](https://le717.github.io/points)
1. Add players (names optional, but recommended)
1. Keep track of their scores

## Technical details
1. Fully powered by JavaScript. If you're one of those people who disable JS execution, sorry.
1. All players and their scores are persisted via
[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). This means
that if you accidentally reload the page, you don't lose everything.
1. Tapping score up or down, at least on iPhone, causes a viewport zoom. It's a bug that I've not
solved yet.

## License
[MIT](LICENSE)
