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