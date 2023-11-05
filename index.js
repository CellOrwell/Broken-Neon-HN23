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
    return choices.getChoiceDesc();
}

function printAllOptions() {
    let finString = "";
    finString += printConditionalOptions();
    return finString += printUnConditionalOptions();
}

function printConditionalOptions() {
    let finString = "";
    for(i = 1; i < choices.getCondOptionLength() + 1; i++) {
        let chosen = choices.getConditionalOptions()[i - 1];
        if(choices.isInInv(chosen.dependence)) {
            let string = (i - unprintedOptions) + ". " + chosen.desc + "\n";
            finString += string;
        } else if (choices.addInv(chosen.items) && choices.isInInv(chosen.dependence)){
            let string = (i - unprintedOptions) + ". " + chosen.desc + "\n";
            finString += string;
        } else {
            unprintedOptions++;
        }
    }

    return finString;

    
}

function printUnConditionalOptions() {
    let finString = "";
    for(i = 1; i < choices.getUnCondOptionLength() + 1; i++) {
        let chosen = choices.getUnConditionalOptions()[i - 1];
        if (chosen.hasOwnProperty("items")){
            if(choices.addInv(chosen.items))
            {
                let string = (i + choices.getCondOptionLength() - unprintedOptions) + ". " + chosen.desc + "\n";
                finString += string;
            }
            else {

                unprintedOptions++;
            }
        } else {
            let string = (i + choices.getCondOptionLength() - unprintedOptions) + ". " + chosen.desc + "\n";
            finString += string;
        }
    }

    return finString;
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
                    console.log(`Incorrect Answer. Please Choose from the Inputs Given.`);
                    prompt();
                }
            });
        }
        prompt();
    });
}

function checkIfEnd() {
    if(choices.getChoice().hasOwnProperty("end")) {
        return "end";
    }
}

function processUserData(data) {
    try {
        intAns = parseInt(data, 10);
        if(!(intAns > 0 && intAns <= choices.getCondOptionLength() + choices.getUnCondOptionLength() - unprintedOptions)) {
            throw new Error("Out of Range");
        } 
        choices.getNewChoice(intAns, unprintedOptions);
    }
    catch (err) {
        console.log(`Incorrect Answer. Please Choose from the Inputs Given.`);
    }
}

function getUnprinted() {
    return unprintedOptions;
}

function setUnprinted(set) {
    unprintedOptions = set;
}

function getAllPrint() {
    let string = "";
    string += printInfo();
    string += "\n";
    string += printAllOptions();
    return string;
}

// async function mainGame() {
//     console.log(printInfo());
//     console.log("");
//     console.log(printAllOptions());
//     await getUserInput();
//     if(choices.getChoice().hasOwnProperty("end")) {
//         printInfo();
//         rl.close();
//         process.exit(0);
//     }
//     resetNewChoice();
//     mainGame();
// }

// mainGame();

module.exports = {
    printInfo,
    printAllOptions,
    checkIfEnd,
    resetNewChoice,
    processUserData,
    getUnprinted,
    setUnprinted,
    getAllPrint
}