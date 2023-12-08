// GameManager.js
const Game = require('./Game');

class GameManager {
    constructor() {
        this.game_dict = {};
    }

    add_game(id_player, pseudo) {
        let new_game = new Game("Game_" + id_player, id_player, pseudo);
        new_game.add_player("Game_" + id_player, id_player, pseudo);
        this.game_dict["Game_" + id_player] = new_game;
        return new_game;
    }

    remove_game(id_game) {
        delete this.game_dict[id_game];
    }

    add_player_to_game(id_game, id_player, pseudo) {
        console.log(this.game_dict);
        console.log(id_game);
        if (this.game_dict[id_game]) {
            this.game_dict[id_game].add_player(id_game, id_player, pseudo);
            return this.game_dict[id_game];
        }
        return null;
    }

    
}

module.exports = GameManager;
