const choices = require("./choices");
const readline = require("readline");

var unprintedOptions = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function resetNewChoice() {
    unprintedOptions = 0;
}

function printInfo() {
    console.log(choices.getChoiceDesc());
}

function printAllOptions() {
    printConditionalOptions();
    printUnConditionalOptions();
}

function printConditionalOptions() {
    for(i = 1; i < choices.getCondOptionLength() + 1; i++) {
        let chosen = choices.getConditionalOptions()[i - 1];
        if(choices.isInInv(chosen.dependence)) {
            console.log((i - unprintedOptions) + ". " + chosen.desc);
        } else if (choices.addInv(chosen.items) && choices.isInInv(chosen.dependence)){
            console.log((i - unprintedOptions) + ". " + chosen.desc);
        } else {
            unprintedOptions++;
        }
    }
}

function printUnConditionalOptions() {
    for(i = 1; i < choices.getUnCondOptionLength() + 1; i++) {
        let chosen = choices.getUnConditionalOptions()[i - 1];
        if (chosen.hasOwnProperty("items")){
            if(choices.addInv(chosen.items))
            {
                console.log((i + choices.getCondOptionLength() - unprintedOptions) + ". " + chosen.desc);
            }
            else {
                unprintedOptions++;
            }
        } else {
            console.log((i + choices.getCondOptionLength() - unprintedOptions) + ". " + chosen.desc);
        }
    }
}

function getUserInput() {
    var intAns = 0;
    return new Promise((resolve, reject) => {
        function prompt() {
        rl.question(`
What do you choose? `, (answer) => {
                try {
                    intAns = parseInt(answer, 10);
                    if(!(intAns > 0 && intAns <= choices.getCondOptionLength() + choices.getUnCondOptionLength() - unprintedOptions)) {
                        throw new Error("Out of Range");
                    }
                    choices.getNewChoice(intAns, unprintedOptions);
                    resolve();
                }
                catch (err) {
                    console.log(err);
                    console.log(`Incorrect Answer. Please Choose from the Inputs Given.`);
                    prompt();
                }
            });
        }
        prompt();
    });
}


async function mainGame() {
    printInfo();
    console.log("");
    printAllOptions();
    await getUserInput();
    if(choices.getChoice().hasOwnProperty("end")) {
        printInfo();
        rl.close();
        process.exit(0);
    } else if (choices.getChoice().hasOwnProperty("items")) {
        choices.addInv();
    }
    resetNewChoice();
    mainGame();
}

mainGame();