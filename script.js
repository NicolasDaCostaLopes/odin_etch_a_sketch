const container = document.querySelector(".container");

const findSquareSize = (sideLenght) => {
    return Math.floor(480 / sideLenght);
}

const fillContainer = (sideLenght) => {
    if (container.childElementCount != 0) {
        clearContainer();
    }
    let squareSize = findSquareSize(sideLenght);
    for (y = 0; y < sideLenght; y++) {
        const column = document.createElement("div");
        column.classList.add("flex");
        for (x = 0; x < sideLenght; x++) {
            const square = document.createElement("div");
            square.classList.add("square");
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