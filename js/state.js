export function Player(id, name, points) {
  this.id = id || crypto.randomUUID();
  this.name = name || "";
  this.points = points || 0;
}
Player.prototype.pointUp = function () {
  this.points += 1;
};
Player.prototype.pointDown = function () {
  this.points -= 1;

  // Guard against negative points
  if (this.points < 0) {
    this.points = 0;
  }
};

export function Game() {
  // dict[str, Player]
  this.players = {};
}
Game.prototype.load = function () {
  let savedState = localStorage.getItem("game");
  if (savedState !== null) {
    for (const [key, value] of Object.entries(JSON.parse(savedState))) {
      this.players[key] = new Player(value.id, value.name, value.points);
    }
  }
};
Game.prototype.reset = function () {
  this.players = {};
  localStorage.clear();
};
Game.prototype.save = function () {
  localStorage.setItem("game", JSON.stringify(this.players));
};
Game.prototype.addPlayer = function () {
  let p = new Player();
  this.players[p.id] = p;
  this.save();
  return p;
};
