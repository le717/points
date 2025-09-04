import { addPlayer, resetGame, loadGame, decreasePoints, increasePoints, setPlayerName, getCurrentState } from "./state.js";
import { findParent } from "./find-parent.js";


let qMain = document.querySelector("main");


async function createPlayerControls(playerId) {
  let html = await fetch("partials/player.html").then(r => r.text());
  html = html.replace(/{{ id }}/gi, playerId);
  qMain?.insertAdjacentHTML("beforeend", html);
}

function registerPlayerNameChange(player) {
  player.querySelector("input").addEventListener("blur", function(ev) {
    setPlayerName(player.dataset.playerId, ev.target.value.trim());
  });
}

/**
 * Load an existing stored game upon page load.
 */
document.addEventListener("DOMContentLoaded", async function() {
  // Go ahead and allow the first player's name to be persisted
  let player = qMain?.querySelector(".player:first-of-type");
  registerPlayerNameChange(player);

  // Load the game state and board
  loadGame();
  getCurrentState().forEach(async function(data, index) {
    index += 1;
    let player = qMain?.querySelector(`.player[data-player-id="${index}"]`);

    // If this player's controls are not in the board yet (which it will not be),
    // add them first
    if (player === null) {
      await createPlayerControls(index);
      player = qMain?.querySelector(`.player[data-player-id="${index}"]`);
      registerPlayerNameChange(player);
    }

    // Stet the player's info
    player.querySelector("input").value = data.name;
    player.querySelector(".points").textContent = data.points;
  });
});

/**
 * Add a new player to the game.
 */
document.querySelector("button.player-add")?.addEventListener("click", async function () {
  await createPlayerControls(addPlayer());

  // Once the player is added, allow their name to be persisted
  let player = qMain?.querySelector(".player:last-of-type");
  registerPlayerNameChange(player);
});


/**
 * Reset the game and all players.
 */
document.querySelector("button.reset")?.addEventListener("click", async function () {
  // Reset the stored game state
  resetGame();

  qMain?.querySelectorAll(".player").forEach(function(ele, index) {
      // If this is player 1, reset the points and player name
    if (ele.dataset.playerId === "1") {
      ele.querySelector(".points").textContent = "0";
      ele.querySelector("input").value = "";

    // All other players, remove them completely
    } else {
      ele.remove();
    }
  });
});


/**
 * Increase/decrease points for a player
 */
qMain?.addEventListener("click", function (ev) {
  let btnPointDown = findParent(ev.target, ".point-down");
  let btnPointUp = findParent(ev.target, ".point-up");

  // Handle points down button
  if (btnPointDown !== null) {
    let player = findParent(btnPointDown, ".player");
    player.querySelector(".points").textContent = decreasePoints(player.dataset.playerId);
    return;
  }

  // Handle points up button
  if (btnPointUp !== null) {
    let player = findParent(btnPointUp, ".player");
    player.querySelector(".points").textContent = increasePoints(player.dataset.playerId);
    return;
  }
});
