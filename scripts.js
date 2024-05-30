const juegos = {
    wordScramble: {
        name: "Palabras Desordenadas",
        instructions: "Ordena las letras para formar la palabra correcta.",
        words: ["Zanahoria", "Cebolla", "Naranja", "Mandarina", "Limón"]
    },
    missingLetters: {
        name: "Letras Faltantes",
        instructions: "Escribe la letra que falta para completar la palabra. (Solo la letra)",
        words: [
            { word: "pájaro", missingLetter: "j" },
            { word: "cumpleaños", missingLetter: "ñ" },
            { word: "Baloncesto", missingLetter: "c" },
            { word: "agua", missingLetter: "g" },
            { word: "telaraña", missingLetter: "ñ" },
            { word: "paraguas", missingLetter: "u" },
            { word: "saltamontes", missingLetter: "o" }
        ]
    },
    matchImagesWords: {
        name: "Emparejar Imágenes y Palabras",
        instructions: "Escribe el nombre de las frutas en inglés.",
        images: ["imagenes/manzana.png", "imagenes/banano.jpg", "imagenes/naranja.jpg", "imagenes/uva.jpg", "imagenes/limon.jpg", "imagenes/kiwi.jpg", "imagenes/durazno.jpg", "imagenes/papaya.jpg", "imagenes/aguacate.jpg"],
        words: ["apple", "banana", "orange", "grapes", "lemon", "kiwi", "peach", "papaya", "avocado"]
    },
    triviaWords: {
        name: "Trivia de Palabras",
        instructions: "Responde las preguntas de trivia sobre palabras.",
        questions: [
            { question: "¿Cuál es el sinónimo de 'rápido'?", answer: "veloz" },
            { question: "¿Cuál es el antónimo de 'grande'?", answer: "pequeño" },
            { question: "¿Qué palabra describe a una persona que siempre dice la verdad?", answer: "honesto" },
            { question: "¿Cuál es el antónimo de 'luz'?", answer: "oscuridad" }, // Nueva pregunta
            { question: "¿Cuál es el sinónimo de 'alfabeto'?", answer: "abecedario" } // Nueva pregunta
        ]
    },
    riddles: {
        name: "Adivinanzas",
        instructions: "Resuelve las adivinanzas.",
        riddles: [
            { riddle: "¿Qué es lo que vuela pero no es un pájaro?", answer: "avión" },
            { riddle: "¿Qué tiene patas pero no puede caminar?", answer: "mesa" },
            { riddle: "¿Qué sube y baja pero nunca se mueve?", answer: "temperatura" },
            { riddle: "¿Qué tiene hojas pero no es un árbol?", answer: "libro" },
            { riddle: "¿Qué es lo que da vueltas sin moverse?", answer: "planeta" },
            { riddle: "¿Qué sube y baja pero siempre permanece en el mismo lugar?", answer: "ascensor" }
        ]
    },
    completePhrases: {
        name: "Completar Frases",
        instructions: "Completa las frases con la palabra correcta.<br><br> <b>Palabras:</b> perro, árboles, avispas, tierra, abejas, <br> ballena, gato, abejas, jardín, carro.",
        phrases: [
            { phrase: "El ______ es el lugar de la casa donde tenemos nuetras plantas.", answer: "jardín" },
            { phrase: "Los ______ tienen hojas verdes y producen oxígeno.", answer: "árboles" },
            { phrase: "El ______ es un animal que maulla y suele tener bigotes.", answer: "gato" },
            { phrase: "La ______ es el planeta donde vivimos.", answer: "tierra" },
            { phrase: "Las ______ son insectos que producen miel.", answer: "abejas" }
        ]
    }
};

function showMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('gameArea').classList.add('hidden');
}

function startGame(gameKey) {
    const game = juegos[gameKey];
    document.getElementById('gameArea').classList.remove('hidden');
    document.getElementById('gameContent').innerHTML = `
        <h2>${game.name}</h2>
        <p>${game.instructions}</p>
        ${generateGameContent(game)}
    `;
}

function generateGameContent(game) {
    switch (game.name) {
        case "Palabras Desordenadas":
            return game.words.map(word => {
                const scrambled = word.split('').sort(() => 0.5 - Math.random()).join('');
                return `<div>${scrambled} <input type="text" class="scrambleInput" data-answer="${word}"></div>`;
            }).join('');
        // case "Letras Faltantes":
        //     return game.words.map(wordObj => {
        //         const word = wordObj.word;
        //         const missingLetter = wordObj.missingLetter;
        //         const wordWithMissingLetter = word.replace('_', missingLetter);
        //         return `<div>${wordWithMissingLetter} <input type="text" class="missingInput" data-answer="${word}"></div>`;
        //     }).join('');
        case "Letras Faltantes":
        return game.words.map(wordObj => {
        const word = wordObj.word;
        const missingLetter = wordObj.missingLetter;
        const wordWithMissingLetter = word.split('').map(letter => letter === missingLetter ? '_' : letter).join('');
        return `<div>${wordWithMissingLetter} <input type="text" class="missingInput" data-answer="${missingLetter}"></div>`;
        }).join('');
        case "Emparejar Imágenes y Palabras":
            return generateMatchImagesWords(game.images, game.words);
        case "Trivia de Palabras":
            return generateTrivia(game.questions);
        case "Adivinanzas":
            return generateRiddles(game.riddles);
        case "Completar Frases":
            return generateCompletePhrases(game.phrases);
        default:
            return '';
    }
}

// function generateMatchImagesWords(images, words) {
//     return images.map((img, index) => {
//         return `
//             <div class="pair">
//                 <img src="${img}" alt="${words[index]}" class="matchImage">
//                 <input type="text" class="matchInput" data-answer="${words[index]}">
//             </div>
//         `;
//     }).join('');
// }

function generateMatchImagesWords(images, words) {
    let tableHtml = '<table class="tablaImagen">';
    for (let i = 0; i < 3; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        if (index < images.length) {
          tableHtml += `
            <td>
              <img src="${images[index]}" alt="${words[index]}" class="tamañoImagen">
              <input type="text" class="matchInput textoImagen" data-answer="${words[index]}">
            </td>
          `;
        } else {
          tableHtml += '<td></td>'; // agregar una celda vacía si no hay más imágenes
        }
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    return tableHtml;
  }

function generateTrivia(questions) {
    return questions.map((q, index) => {
        return `
            <div class="trivia">
                <p>${q.question}</p>
                <input type="text" class="triviaInput" data-answer="${q.answer}">
            </div>
        `;
    }).join('');
}

function generateRiddles(riddles) {
    return riddles.map((r, index) => {
        return `
            <div class="riddle">
            <p>${r.riddle}</p>
            <input type="text" class="riddleInput" data-answer="${r.answer}">
        </div>
    `;
}).join('');
}

function generateCompletePhrases(phrases) {
return phrases.map((p, index) => {
    return `
        <div class="phrase">
            <p>${p.phrase}</p>
            <input type="text" class="phraseInput" data-answer="${p.answer}">
        </div>
    `;
}).join('');
}

document.addEventListener('input', event => {
if (event.target.classList.contains('scrambleInput') || 
    event.target.classList.contains('missingInput') ||
    event.target.classList.contains('matchInput') || 
    event.target.classList.contains('triviaInput') ||
    event.target.classList.contains('riddleInput') ||
    event.target.classList.contains('phraseInput')) {
    
    const input = event.target;
    const answer = input.getAttribute('data-answer').toLowerCase();
    
    if (input.value.toLowerCase() === answer) {
        input.style.backgroundColor = '#00FF00'; // Verde puro si la respuesta es correcta
        input.style.color = '#000'; // Restaurar el color de texto a negro
    } else {
        input.style.backgroundColor = '#FF0000'; // Rojo puro si la respuesta es incorrecta
        input.style.color = '#FFF'; // Cambiar el color de texto a blanco
    }

}
});