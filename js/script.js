//aggiungo event listener per il button
document.getElementById('generate-button').addEventListener('click', function(){

    //prendiamo la difficolta scelta dall'utente
    userPickedDifficulty = document.getElementById('difficulty').value;
    let grid = document.querySelector('.grid-container');
    
    //creo nuovo container
    let newGrid = (buildGrid(userPickedDifficulty));
    grid.parentNode.replaceChild(newGrid, grid);
})

function buildGrid(size) {
    //creo un div
    const thisGrid = document.createElement('div')
    thisGrid.classList.add('grid-container');
    let gridSize = '';
    switch (size) {
        case 'easy':
            gridSize = 100;
            break;
        case 'medium':
            gridSize = 81;
            break;
        case 'hard':
            gridSize = 49;
            break;
    }

    for (let i = 1; i <= gridSize; i++) {
        let newCell = document.createElement('div');
        newCell.innerHTML = `<span>${i}</span>`;
        newCell.classList.add('cell');
        newCell.classList.add(size);
        //aggiungo altro event listener
               newCell.addEventListener('click',
            function() {
                this.classList.toggle('active');
            }
        )
        thisGrid.append(newCell);
    }
    
    return thisGrid;
}

function cellClickHandler() {
    let thisCellNumber = parseInt(this.dataset.cellno);
    // se hai cliccato una bomba
    if (bombArray.includes(thisCellNumber)) {
        this.classList.add('bomb');
        gameEnd(false);
    }
    //se hai cliccato una cella pulita
    else {
        this.classList.add('active');
        let thisAdjacents = getAdjacents(thisCellNumber,Math.sqrt(gridSize),Math.sqrt(gridSize));
        console.log(thisAdjacents);
        let thisAdjacentBombs = countBombsInArray(thisAdjacents);
        if (thisAdjacentBombs > 0) {
            this.classList.add(`b${thisAdjacentBombs}`);
            this.querySelector('span').textContent = thisAdjacentBombs;
        }
        else {
            //inizio una funzione ricorsiva
            adjacentsDrilldown(thisAdjacents);
        }
        safeCellsClicked.push(thisCellNumber);
        console.log(`Safe cells clicked: ${safeCellsClicked.length} To win: ${gridSize - numberofBombs}`);
        if (safeCellsClicked.length >= gridSize - numberofBombs) {
            gameEnd(true);
        }
    }
    this.removeEventListener('click', cellClickHandler);

}

function cellRightClick(event) {
    event.preventDefault();
    console.log('blablabla');
    if (!event.target.classList.contains('active')) {
        console.log(event.target);
        event.target.classList.toggle('flag');
    }
    console.log(event.target);
}

function gameEnd(winLose) {
    let result = document.getElementById('result');
    let resultText = '';
    let pluralizedPoint = safeCellsClicked.length ===1 ? 'punto' : 'punti';
    if (winLose) {
        resultText = `Hai vinto!!`;
        safeCellsClicked.sort(function(a, b){return a - b})
        console.log(safeCellsClicked);
        console.log('recusion count:', recursiveCount);
    }
    else {
        resultText = `Hai perso. Hai fatto ${safeCellsClicked.length} ${pluralizedPoint} su ${gridSize - numberofBombs}`
    }
    result.textContent = resultText;
    result.classList.remove('hidden')

    //disattiviamo gli eventListener su tutte le celle
    cells = document.getElementsByClassName('cell')
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', cellClickHandler);
        cells[i].removeEventListener('contextmenu', cellRightClick);
        //se abbiamo perso, evidenziamo tutte le bombe
        if (!winLose && bombArray.includes(parseInt(cells[i].dataset.cellno))) {
            cells[i].classList.add('bomb');
        }
    }
}

function countBombsInArray(adjacentList) {
    let sumOfBombs = 0;
    for (let i = 0; i < adjacentList.length; i++) {
        if (bombArray.includes(adjacentList[i])) {
            sumOfBombs++;
        }
    }
    return sumOfBombs;
}
