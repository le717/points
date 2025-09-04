/**
 * Object[str, Object[str, int | str]]
 */
const GAME_STATE = {
  "player-1": {
    name: "",
    points: 0
  }
};

/**
 * Increase a player's points by 1 point.
 * @param {Number} player
 */
export function increasePoints(player) {
  let points = GAME_STATE[`player-${player}`].points;
  points += 1

  GAME_STATE[`player-${player}`].points = points;
  save();
  return points;
}


/**
 * Decrease a player's points by 1 point.
 * @param {Number} player
*/
export function decreasePoints(player) {
  let points = GAME_STATE[`player-${player}`].points;
  points -= 1;

  // Guard against negative points
  if (points < 0) {
    points = 0;
  }
  GAME_STATE[`player-${player}`].points = points;
  save();
  return points;
}

/**
 * Set a player's name.
 * @param {Number} player
 * @param {String} name
 */
export function setPlayerName(player, name) {
  GAME_STATE[`player-${player}`].name = name;
  save();
}

/**
 * Add a new player to the game.
 */
export function addPlayer() {
  let newId = getNextPlayerId();
  GAME_STATE[`player-${newId}`] = {
    name: "",
    points: 0
  };
  save();
  return newId;
}

/**
 * Reset the game state.
 */
export function resetGame() {
  for (const key of Object.keys(GAME_STATE)) {
    delete GAME_STATE[key]
  }
  localStorage.clear();

  // Restore player 1's default info
  GAME_STATE["player-1"] = {
    name: "",
    points: 0
  };
}

/**
 * Save the game state.
*/
function save() {
  localStorage.setItem("game", JSON.stringify(GAME_STATE));
}

/**
 * Load a stored game state.
*/
export function loadGame() {
  let savedState = localStorage.getItem("game");
  if (savedState !== null) {
    for (const [key, value] of Object.entries(JSON.parse(savedState))) {
      GAME_STATE[key] = value;
    }
  }
}

/**
 * Resolve the next player ID.
 * @returns {String}
 */
function getNextPlayerId() {
  return (Math.max(...[...Object.keys(GAME_STATE)].map(function(key) {
    return Number.parseInt(key.split("-")[1], 10);
  })) + 1).toString();
}

export function getCurrentState() {
  return [...Object.values(GAME_STATE)]
}
