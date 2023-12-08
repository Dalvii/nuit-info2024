// main.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const GameManager = require("./GameManager");
const Player = require("./Player");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});

let gameManager = new GameManager();

io.on("connection", (socket) => {
    console.log("connect ", socket.id);

    socket.on("disconnect", () => {
        console.log("disconnect ", socket.id);
    });

    socket.on("send_answer", (json_arg) => {
        json_arg = JSON.parse(json_arg);
        let question_id = json_arg.question_id;
        let answer_id = json_arg.answer_id;
        if (!answer_id || !question_id) {
            return;
        }
        let player = Player.id_to_player.get(socket.id);
        player.question_to_answer[question_id] = answer_id;

        console.log(`player ${socket.id} sent answer ${json_arg}`);
    });

    socket.on("start_game", async (json_param) => {
        let nb_of_questions = 5;
        let id_game = json_param.id_game;
        console.log(`INFO : The game ${id_game} has started`);
        let current_game = gameManager.game_dict[id_game];
        if (socket.id !== current_game.admin.id) {
            console.log("error");
            return;
        }

        function sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }

        for (let i = 0; i < nb_of_questions; i++) {
            let question = current_game.get_next_question();
            console.log(
                `The question "${question.question}" has been sent to the players in game ${id_game}`
            );
            let room_name = "room_" + current_game.admin.id;
            io.to(room_name).emit("next_question", question);
            console.log(room_name);
            //wait 20 sec

            await sleep(1000);
            let players = current_game.players;
            console.log("Envoie des reponses aux joueurs");

            let answer = current_game.check_answer( question.id);
            io.to(room_name).emit("result", answer);
            await sleep(2000);

        }
    });

    socket.on("create_game", (json_param) => {
        let pseudo = json_param.pseudo;
        console.log(`INFO : ${pseudo} joined game ${socket.id}`);
        let game = gameManager.add_game(socket.id, pseudo);
        let room_name = "room_" + game.admin.id;
        socket.join(room_name);
        // return the id of the game to the client
        io.to(room_name).emit("game_created", { id_game: game.id });
    });

    socket.on("join_game", (json_param) => {
        let id_game = json_param.id_game;
        let pseudo = json_param.pseudo;
        console.log(json_param);
        console.log(`INFO : ${pseudo} joined game ${id_game}`);
        let game = gameManager.add_player_to_game(id_game, socket.id, pseudo);
        let room_name = "room_" + game.admin.id;
        console.log(room_name);
        socket.join(room_name);
        // if the game exists
        if (game) {
            // return the id of the game and the list of the players in the game to the client
            io.to(room_name).emit("game_joined", {
                id: id_game,
                players: game.players_to_json(),
            });
        } else {
            // the game does not exist
            io.to(socket.id).emit("game_joined", { id: -1, players: [] });
        }
    });
});

server.listen(5001, () => {
    console.log("listening on *:5001");
});
