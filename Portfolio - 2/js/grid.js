// Grid functions

function createGridArray() {
    // Create and return a grid array
    return [ ["xy", "y", "y", "y", "y", "y", "y", "y", "y", "y", "y"],
             ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ];
}

function createNonogram() {
    // Create and return a random Nonogram
    for (let n = 0; n <= 99; n++) {
        gameSample.push(n);
    }
    for (let n = 1; n <= 50; n++) {
        gameSample.splice(Math.floor(Math.random() * gameSample.length), 1)
    } 
    for (let n = 1; n <= 100; n++) {
        game.push(0);
    }
    for (let n = 0; n <= 49; n++) {
        game[gameSample[n]] = 1;
    }
    return [["xy", "y", "y", "y", "y", "y", "y", "y", "y", "y", "y"],
            ["x", game[0], game[1], game[2], game[3], game[4], game[5], game[6], game[7], game[8], game[9] ],
            ["x", game[10], game[11], game[12], game[13], game[14], game[15], game[16], game[17], game[18], game[19]],
            ["x", game[20], game[21], game[22], game[23], game[24], game[25], game[26], game[27], game[28], game[29]],
            ["x", game[30], game[31], game[32], game[33], game[34], game[35], game[36], game[37], game[38], game[39]],
            ["x", game[40], game[41], game[42], game[43], game[44], game[45], game[46], game[47], game[48], game[49]],
            ["x", game[50], game[51], game[52], game[53], game[54], game[55], game[56], game[57], game[58], game[59]],
            ["x", game[60], game[61], game[62], game[63], game[64], game[65], game[66], game[67], game[68], game[69]],
            ["x", game[70], game[71], game[72], game[73], game[74], game[75], game[76], game[77], game[78], game[79]],
            ["x", game[80], game[81], game[82], game[83], game[84], game[85], game[86], game[87], game[88], game[89]],
            ["x", game[90], game[91], game[92], game[93], game[94], game[95], game[96], game[97], game[98], game[99]]]
}

function createDivGrid() {
    for (let row = 0; row < NUM_ROWS; row++) {
        let x = 0;
        let prior = false;
        for (let col = 0; col < NUM_COLS; col++) {
            // Create a div for each element in 2D grid
            let divEl = document.createElement("div");

            if (grid[row][col] == 0) {
                divEl.classList.add("white");
            } else {
                divEl.classList.add("lightGrey");
            }

            // Add dataset values for row and col
            divEl.dataset.row = row;
            divEl.dataset.col = col;

            if (nono[row][col] == "x") {
                divEl.setAttribute("id", "x" + row);
            } else if (nono[row][col] == "y") {
                divEl.setAttribute("id", "y" + col);
            }

            if (nono[row][col] == 1) {
                x++;
            } else if (nono[row][col] == 0 && x > 0 && prior) {
                document.getElementById("x" + row).innerHTML += ", " + x;
                x = 0;
            } else if (nono[row][col] == 0 && x > 0) {
                document.getElementById("x" + row).innerHTML += x;
                x = 0;
                prior = true;
            } 
            // Add an event listener to each divEl
            divEl.addEventListener("click", cellClicked);

            // Add div to container
            document.getElementById("container").append(divEl);
        }
        if (x > 0 && prior) {
            document.getElementById("x" + row).innerHTML += ", " + x;
        } else if (x > 0) {
            document.getElementById("x" + row).innerHTML += x;
        }
    }
    for (let col = 0; col < NUM_ROWS; col++) {
        let y = 0;
        let prior = false;
        for (let row = 0; row < NUM_COLS; row++) {
            if (nono[row][col] == 1) {
                y++;
            } else if (nono[row][col] == 0 && y > 0 && prior) {
                document.getElementById("y" + col).innerHTML += ", " + y;
                y = 0;
            } else if (nono[row][col] == 0 && y > 0) {
                document.getElementById("y" + col).innerHTML += y;
                y = 0;
                prior = true;
            }
        }
        if (y > 0 && prior) {
            document.getElementById("y" + col).innerHTML += ", " + y;
        } else if (y > 0) {
            document.getElementById("y" + col).innerHTML += y;
        }
    } 
}

function cellClicked(event) {
    // Set the color of the clicked cell

    // Get row and col of the clicked cell
    let row = event.target.dataset.row;
    let col = event.target.dataset.col;

    let option = document.getElementById("cell-option").value;

    // Update clicked cell based on selected color
    if (gameend == false) {
        if (grid[row][col] == 0 && option == "open") {
            grid[row][col] = 1;
            event.target.classList.remove("lightYellow")
            event.target.classList.remove("white")
            event.target.classList.add("grey")
        } else if (grid[row][col] == 1 && option == "open") {
            grid[row][col] = 0;
            event.target.classList.remove("lightYellow")
            event.target.classList.remove("grey")
            event.target.classList.add("white")
        } else if (option == "flag" && event.target.classList == "lightYellow") {
            event.target.classList.remove("lightYellow")
            event.target.classList.add("white")
        } else if (option == "flag" && grid[row][col] == 0) {
            grid[row][col] = 0;
            event.target.classList.remove("grey")
            event.target.classList.remove("white")
            event.target.classList.add("lightYellow")
        } 
    }

    // Check answer
    if (checkAnswer()) {
        gameend = true;
        document.getElementById("p").innerHTML = "     Completed!";
    }
}

function checkAnswer () {
    for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
            if (grid[row][col] != nono[row][col]) {
                return false
            }
        }
    }
    return true
}
