const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

const jsonDirectory = path.join(__dirname, 'data');
let charactersJsons = [];
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/', async (req, res) => {
    charactersJsons = [];

    await fs.readdirSync(jsonDirectory).forEach(file => {
        if(path.extname(file) === '.json') {
            const json = require(path.join(jsonDirectory, file));
            // const temp = path.basename(file).toString();
            // charactersJsons.push(temp)
            const name = file.split('.json')[0];
            charactersJsons.push({ characterName: name, data: json });
        }
    });
    res.send(charactersJsons);
});

app.get('/api', (req, res) => {
    res.json({ message: "hola desde el servidor!" });
});

app.get('/:characterName', (req, res, next) => {
    const characterName = req.params.characterName;

    if(characterName === 'search'){
        next();
    }

    const requestedCharacterFile = fs.readdirSync(jsonDirectory).find(file => path.basename(file) == (characterName + '.json'));

    if (requestedCharacterFile) {
        const requestedCharacter = require(path.join(jsonDirectory, requestedCharacterFile));
        res.send(requestedCharacter);
    } else {
        res.status(404).send({ message: 'Character not found' });
    }
});

app.get('/search/:searchText', async (req, res) => {
    const searchText = req.params.searchText;

    charactersJsons = [];
    filteredCharacters = [];
    filteredMoves = [];

    await fs.readdirSync(jsonDirectory).forEach(file => {
        if(path.extname(file) === '.json') {
            const json = require(path.join(jsonDirectory, file));
            // const temp = path.basename(file).toString();
            // charactersJsons.push(temp)
            const name = file.split('.json')[0];
            charactersJsons.push({ characterName: name, data: json });
        }
    });

    if(searchText == ""){
        res.send(charactersJsons);   
    }

    //filter para lso personajes
    // filteredCharacters = await fs.readdirSync(jsonDirectory).filter(char => path.basename(char).toLowerCase().includes(searchText.toLowerCase()));
    filteredCharacters = charactersJsons.filter(char => char.characterName.toLowerCase().includes(searchText.toLowerCase()));

    //filter para los movimientos
    charactersJsons.map((jsonFile) => {
        jsonFile.data.map((move, i) => {
            if(move.command != undefined) {
                if(move.command.toLowerCase().includes(searchText.toLowerCase())){
                    // console.log("\nCharacter: " + jsonFile.characterName + "\nMove: " + move.command);
                    filteredMoves.push({ characterName: jsonFile.characterName, characterImg: jsonFile.data[0].img, move: move });
                }
            }
            // if(move.command.toLowerCase().includes(searchText.toLowerCase())) {
            //     console.log(char);
            //     // filteredMoves.push()
            // }
            // if(i == 2){
            //     console.log(move);
            // }
            // console.log(move);
        })
    })
    // res.json(filteredMoves);
    res.json({ characters: filteredCharacters, moves: filteredMoves });
})


// app.get('/:characterName/:selectedMove', async (req, res) => {
//     const { characterName, selectedMove } = req.params;
//     const fileName = `${characterName}.json`;
//     const filePath = path.join(jsonDirectory, fileName);

//     if (fs.existsSync(filePath)) {
//         const characterData = require(filePath);
//         const selectedMoves = selectedMove.split(',');

//         const filteredMoves = characterData.filter(move => selectedMoves.includes(move.command));

//         res.send(filteredMoves);
//     } else {
//         res.status(404).send({ message: 'Character not found' });
//     }
// });


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});