const container = document.querySelector(".main-container");
const resetGrid = document.querySelector("#resetGrid");
const changeGrid = document.querySelector("#changeGrid");
const color = document.querySelector("#color");
const randomiseColor = document.querySelector("#randomiseColor")
const darkening = document.querySelector("#darkening");
let randomColorSelected = false;
let colorSelected = color.value;
let progressiveDarkening = false;
let gridSize = 16;

const findSquareSize = (sideLenght) => {
    return Math.floor(480 / sideLenght);
}
randomiseColor.addEventListener("change", (e) => {
    randomColorSelected = e.target.checked;
})
const fillContainer = (sideLenght = gridSize) => {
    if (container.childElementCount != 0) {
        clearContainer();
    }
    let squareSize = findSquareSize(sideLenght);
    for (y = 0; y < sideLenght; y++) {
        const column = document.createElement("div");
        column.classList.add("flex");
        column.addEventListener("mouseover", hoverColor);
        for (x = 0; x < sideLenght; x++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.darkening = 0;
            square.style.width = `${squareSize}px`
            square.style.height = `${squareSize}px`
            column.appendChild(square);
        }
        container.appendChild(column);

    }
}

const clearContainer = () => {
    container.textContent = "";
}
resetGrid.addEventListener("click", () => {
    clearContainer();
    fillContainer();
})

const hoverColor = (e) => {
    if (randomColorSelected) {
        e.target.style.backgroundColor = randomRGB();
    } else { e.target.style.backgroundColor = colorSelected; }
    if (progressiveDarkening) {
        if (+e.target.dataset.darkening < 100) {
            let opacity = e.target.dataset.darkening = +e.target.dataset.darkening + 10;
            e.target.style.backgroundImage = `linear-gradient(rgba(0,0,0,${+opacity}%) 0 0)`;
            console.log(e.target.style);
        }
    } else {
        e.target.dataset.darkening = 0;
        e.target.style.backgroundImage = "";
    }

}
darkening.addEventListener("change", (e) => {
    progressiveDarkening = e.target.checked;
})

const verifyProvidedGridSize = (input) => {
    input = +input;
    if (typeof input === "number" && !isNaN(input)) {
        gridSize = input;
        return false
    } else {
        return true;
    }
}

const askGridSize = () => {
    let answer = prompt("What size would you like ? from 4 up to 100", 16);
    let keepGoing = verifyProvidedGridSize(answer);
    while (keepGoing) {
        answer = prompt(`Invalid answer ${answer} is not from 4 up to 100`, 16);
        keepGoing = verifyProvidedGridSize(answer);
    }
    fillContainer();
}
changeGrid.addEventListener("click", askGridSize)



const randomRGB = () => {
    return `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`;

}

const randomNumber = (maximum) => {
    return Math.floor(Math.random() * maximum + 1);
}
const colorPickerWatcher = (e) => {
    colorSelected = e.target.value;
}
color.addEventListener("input", colorPickerWatcher);

fillContainer();
