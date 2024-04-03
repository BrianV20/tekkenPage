const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");

const jsonDirectory = path.join(__dirname, "data");
let charactersJsons = [];
const PORT = process.env.PORT || 3001;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function cutArray(array) {
  let newArray = [];
  for(let i = 0; i < 10; i++){
    newArray.push(array[i]);
  };
  return newArray;
}

app.use(cors());

app.get("/", async (req, res) => {
  charactersJsons = [];

  await fs.readdirSync(jsonDirectory).forEach((file) => {
    if (path.extname(file) === ".json") {
      const json = require(path.join(jsonDirectory, file));
      // const temp = path.basename(file).toString();
      // charactersJsons.push(temp)
      const name = file.split(".json")[0];
      charactersJsons.push({ characterName: name, data: json });
    }
  });
  res.send(charactersJsons);
});

app.get("/api", (req, res) => {
  res.json({ message: "hola desde el servidor!" });
});

app.get("/search/:searchText", async (req, res) => {
  const searchText = req.params.searchText;

  charactersJsons = [];
  filteredCharacters = [];
  filteredMoves = [];

  await fs.readdirSync(jsonDirectory).forEach((file) => {
    if (path.extname(file) === ".json") {
      const json = require(path.join(jsonDirectory, file));
      // const temp = path.basename(file).toString();
      // charactersJsons.push(temp)
      const name = file.split(".json")[0];
      charactersJsons.push({ characterName: name, data: json });
    }
  });

  if (searchText == "") {
    res.send(charactersJsons);
  } else {
    //filter para lso personajes
    // filteredCharacters = await fs.readdirSync(jsonDirectory).filter(char => path.basename(char).toLowerCase().includes(searchText.toLowerCase()));
    filteredCharacters = charactersJsons.filter((char) =>
      char.characterName.toLowerCase().includes(searchText.toLowerCase())
    );

    //filter para los movimientos
    charactersJsons.map((jsonFile) => {
      jsonFile.data.map((move, i) => {
        if (move.command != undefined) {
          if (move.command.toLowerCase().includes(searchText.toLowerCase())) {
            // console.log("\nCharacter: " + jsonFile.characterName + "\nMove: " + move.command);
            filteredMoves.push({
              characterName: jsonFile.characterName,
              characterImg: jsonFile.data[0].img,
              move: move,
            });
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
      });
    });
    // res.json(filteredMoves);
    res.json({ characters: filteredCharacters, moves: filteredMoves });
  }
});

app.get('/:characterName/:selectedMove', async (req, res) => {
    const { characterName, selectedMove } = req.params;
    charactersJsons = [];
    filteredMoves = [];
    let requestedCharacterJson = "";
    let requestedMove = "";
    // const filePath = path.join(jsonDirectory, fileName);

    // const requestedCharacterFile = fs.readdirSync(jsonDirectory).find((file) => path.basename(file) == characterName + ".json");
    // const requestedMove = fs.readdirSync(jsonDirectory).find((file) => path.basename(file) == characterName + ".json").find(m => m.command == selectedMove);
    // console.log("EL REQUESTED MOVE: " + requestedMove);

  // if (requestedCharacterFile) {
  //   const requestedCharacter = require(path.join(jsonDirectory, requestedCharacterFile));
  // };

    await fs.readdirSync(jsonDirectory).forEach((file) => {
      if (path.extname(file) === ".json") {
        const json = require(path.join(jsonDirectory, file));
        if(file.split('.json')[0] === characterName) {
          requestedCharacterJson = json;
        }
        else {
          // const temp = path.basename(file).toString();
          // charactersJsons.push(temp)
          const name = file.split(".json")[0];
          charactersJsons.push({ characterName: name, data: json });
        }
      }
    });

    //map para agregar los movimientos que sean igual al ingresado.
    charactersJsons.map((jsonFile) => {
      jsonFile.data.map((move, i) => {
        if (move.command != undefined) {
          if (move.command.toLowerCase() == (selectedMove.toLowerCase())) {
          // if (move.command.toLowerCase().includes(selectedMove.toLowerCase())) {
            // console.log("\nCharacter: " + jsonFile.characterName + "\nMove: " + move.command);
            filteredMoves.push({
              characterName: jsonFile.characterName,
              characterImg: jsonFile.data[0].img,
              move: move,
            });
          }
        }
      });
    });

    //map para agregar los movimientos que contengan en su command el ingresado. Esto se ejecuta en caso de que no se hayan encontrado 10 movimientos en el map anterior.
    if(filteredMoves.length < 10) {
      charactersJsons.map((jsonFile) => {
        jsonFile.data.map((move, i) => {
          if (move.command != undefined) {
            if (move.command.toLowerCase().includes(selectedMove.toLowerCase())) {
              if(filteredMoves.find(m => m.move.command == move.command) != null){
                // console.log(jsonFile.characterName + ": " + move.command + " YA SE ENCUENTRA EN filteredMoves");
              }
              else {
                filteredMoves.push({
                  characterName: jsonFile.characterName,
                  characterImg: jsonFile.data[0].img,
                  move: move,
              });
              }
            }
          }
        });
      });
    }
    
    //map para buscar el movimiento con el command ingresado.
    requestedCharacterJson.map((m) => {
      if(m.command == selectedMove){
        console.log("ESTE ES EL MOVIMIENTO BUSCADO: " + m.command);
        requestedMove = m;
      };
    });

    filteredMoves = cutArray(shuffleArray(filteredMoves));

    let newFilteredMoves = [];
    filteredMoves.map((m, i) => {
      if(filteredMoves[i] != null){
        newFilteredMoves.push(filteredMoves[i]);
      };
    });

    res.json({ requestedMove: requestedMove, characterImg: requestedCharacterJson[0].img, moves: newFilteredMoves });
    // res.json({ reqq: selectedMove })
});

app.get("/:characterName", (req, res, next) => {
  const characterName = req.params.characterName;

  if (characterName === "search") {
    next();
  }
  else {
      const requestedCharacterFile = fs
        .readdirSync(jsonDirectory)
        .find((file) => path.basename(file) == characterName + ".json");
    
      if (requestedCharacterFile) {
        const requestedCharacter = require(path.join(
          jsonDirectory,
          requestedCharacterFile
        ));
        res.send(requestedCharacter);
      } else {
        res.status(404).send({ message: "Character not found" });
      }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
