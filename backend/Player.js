// Player.js
class Player {
    constructor(id_game, id_player, pseudo) {
        this.id = id_player;
        this.pseudo = pseudo;
        this.game_id = id_game;
        this.score = 0;
        this.question_to_answer = {};
    }

    update_score(points) {
        this.score += points;
    }
}

module.exports = Player;
