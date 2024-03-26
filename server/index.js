const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

const jsonDirectory = path.join(__dirname, 'data');
let charactersJsons = [];
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get(('/'), async (req, res) => {
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

app.get(('/:characterName'), (req, res) => {
    const characterName = req.params.characterName;
    const requestedCharacterFile = fs.readdirSync(jsonDirectory).find(file => path.basename(file) == (characterName + '.json'));

    if (requestedCharacterFile) {
        const requestedCharacter = require(path.join(jsonDirectory, requestedCharacterFile));
        res.send(requestedCharacter);
    } else {
        res.status(404).send({ message: 'Character not found' });
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});