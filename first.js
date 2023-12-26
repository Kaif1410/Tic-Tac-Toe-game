let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset");
let newGame_btn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".winDisplay");
let msg = document.querySelector("#msg");
let count = 0;

let turn_O = true;

//   Winning pattern.
const winPattern = [       
    [0, 1, 2],       
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

//   Alternate turning.
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn_O){
            box.innerText = "O";
            turn_O = false;
        }
        else{
            box.innerText = "X";
            turn_O = true;
        }
        box.disabled = true;

        count++;
        let is_winner = checkWinner();
        if(count == 9  &&  !is_winner){
            drawWinner();
        }
    })
})

//  Reset the game.
const reset_game = () => {
    turn_O = true;
    enable_boxes();
    msgContainer.classList.add("hide");
    count = 0;
}

//  After match the pattern the boxes was disable.
const disable_boxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

//  for reset button we required to enable all boxes.
const enable_boxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

//  Display winner msg.
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

//  When game is draw display different msg.
const drawWinner = () => {
    msg.innerText = "Game is Draw";
    msgContainer.classList.remove("hide");
}

//  Cheack the winning pattern.
const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != ""  &&  pos2 != ""  &&  pos3 != ""){
            if(pos1 === pos2  &&  pos2 === pos3){
                disable_boxes();
                showWinner(pos1);
            }
        }
    }
}

reset_btn.addEventListener("click", reset_game);
newGame_btn.addEventListener("click", reset_game);