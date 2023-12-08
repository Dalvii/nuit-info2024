// Game.js
const Player = require('./Player');

class Game {
    constructor(id_game, id_player, pseudo) {
        this.players = [];
        this.id = id_game;
        let player = new Player(id_game, id_player, pseudo);
        this.admin = player;
        this.players.push(player);
        this.question_list = this.generate_question_lists();
        this.current_question_id = 0;
    }

    add_player(id_game, id_player, pseudo) {
        let found = this.players.some(p => p.id === id_player);
        if (!found) {
            this.players.push(new Player(id_game, id_player, pseudo));
        }
    }

    generate_question_lists() {
        // Implement your question generation logic here
        // get all questions from the questions.json
        let questions = require('./questions.json');
        return questions;
    }

    get_next_question() {
        this.current_question_id += 1;

        // transform answers array to {answer: "answer",id: (indexof)}
        let answers = this.question_list[this.current_question_id].answers;
        let new_answers = [];
        for (let i = 0; i < answers.length; i++) {
            new_answers.push({ text: answers[i], id: i });
        }
        let question=structuredClone(this.question_list[this.current_question_id]);
        question.answers = new_answers;
        return question;
    }

    check_answer() {
        // return if good_answers in json is correct
        return this.question_list[this.current_question_id].good_answers;
        
    
    }

    players_to_json() {
        return this.players.map(player => player.pseudo);
    }
}

module.exports = Game;
