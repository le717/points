import { Game, Player } from "./state.js";
import { findParent } from "./find-parent.js";

let qMain = document.querySelector("main");
const game = new Game();

async function createPlayerControls(player) {
  let html = await fetch("partials/player.html").then((r) => r.text());
  html = html.replace(/{{ id }}/gi, player.id);
  qMain?.insertAdjacentHTML("beforeend", html);
}

function registerPlayerNameChange(qPlayer, player) {
  qPlayer.querySelector("input").addEventListener("blur", function (ev) {
    player.name = ev.target.value.trim();
    game.save();
  });
}

/**
 * Start a new game, or load an existing game, upon page load.
 */
document.addEventListener("DOMContentLoaded", async function () {
  // Load the game state and board
  game.load();

  // If there's no players yet, invisibly add one to the game state
  if (Object.keys(game.players).length === 0) {
    game.addPlayer();
  }

  for (const player of Object.values(game.players)) {
    // Add all of the player's controls to the board and allow their name to be persisted
    await createPlayerControls(player);
    let qPlayer = qMain?.querySelector(
      `.player[data-player-id="${player.id}"]`
    );
    registerPlayerNameChange(qPlayer, player);

    // Set the player's info
    qPlayer.querySelector("input").value = player.name;
    qPlayer.querySelector(".points").textContent = player.points;
  }
});

/**
 * Add a new player to the game.
 */
document
  .querySelector("button.player-add")
  ?.addEventListener("click", async function () {
    let player = game.addPlayer();
    await createPlayerControls(player);
    let qPlayer = qMain?.querySelector(
      `.player[data-player-id="${player.id}"]`
    );
    registerPlayerNameChange(qPlayer, player);
  });

/**
 * Reset the game and all players.
 */
document
  .querySelector("button.reset")
  ?.addEventListener("click", async function () {
    // Reset the stored game state
    game.reset();

    qMain?.querySelectorAll(".player").forEach(function (ele, index) {
      ele.remove();
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
    let qPlayer = findParent(btnPointDown, ".player");
    let p = game.players[qPlayer.dataset.playerId];
    p.pointDown();
    game.save();
    qPlayer.querySelector(".points").textContent = p.points;
    return;
  }

  // Handle points up button
  if (btnPointUp !== null) {
    let qPlayer = findParent(btnPointUp, ".player");
    console.log(game.players[qPlayer.dataset.playerId]);
    let p = game.players[qPlayer.dataset.playerId];
    p.pointUp();
    game.save();
    qPlayer.querySelector(".points").textContent = p.points;
    return;
  }
});
