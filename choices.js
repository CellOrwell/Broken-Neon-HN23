var choiceList = [
    {
        id: 0,
        choName: "Car Park",
        desc: "You find yourself in a dimly illuminated parking lot, rain pouring down as you peer through the car\'s window.\nRecalling your long-standing curiosity about the rarely-visited arcade, you decide to finally explore it for yourself.\n\nAs the car pulls up towards the entrance, you step outside. The battered sign above the front door barely makes out the words \'Arcade.\'\nEerie silence surrounds you as you approach the entrance. The door creaks open as you slowly step inside.",
        unconditionalOptions: [{
            id: 1,
            desc: "Walk up to the Abandoned Arcade"
        }]
    },
    {
        id: 1,
        choName: "Entering",
        desc: `As you walk in, you hear something behind you...

** B A M **
        
The door slams shut,  Panic sets in, and you fumble for the light switch. Unfortunately, it's a power outage, and the entire arcade remains in darkness.
        
In the dim glow of an emergency exit sign, you can make out the flickering screen of an arcade machine in the distance,
casting an eerie light within the room.

What do you do?`,
        unconditionalOptions: [{
            id: 2,
            desc: "Investigate the nearest arcade machine."
        }]
    },
    {
        id: 2,
        choName: "Snake Machine",
        desc: `You cautiously make your way through the dark arcade towards the nearest flickering arcade machine.
As you get closer, you can make out the screen displaying the classic game "Snake."
       
The nostalgic sight of the game brings back memories of hours spent playing it on your old Nokia phone.
The controls seem operational, and a small prompt on the screen asks if you want to play.`,
        unconditionalOptions: [{
            id: 3, //eventually
            desc: "Play the Game.",
        }]
    },
    {
        id: 3,
        choName: "Power On",
        desc: `As you reach the end of the game, you notice a flicker of light above you. 
In an instant, a dazzling array of flashing, vibrant coloured lights envelop the room, completley changing the once dim atmosphere.
You hear the nostalgic 8-bit music fill the air, as the arcade is instantly brought back to life.`,
        unconditionalOptions: [{
            id: 4,
            desc: "Make your way over to the Space Invaders machine"
        }]
    },
    {
        id: 4,
        choName: "Space Invaders Machine",
        desc: `You turn your attention to the other arcade machine you saw flickering earlier, but notice a message flashes on the screen: "JOYCON MISSING."
Puzzled, you inspect the machine and notice that one of its two joycons is indeed missing.
Your gaze sweeps the room in search of the missing joycon, and you can't help but notice a door you didn't notice earlier, as well as a
a bright light reflecting off an object that appears to be a metal box.

What do you do next?`,
        unconditionalOptions: [
        {
            id: 5,
            desc: "Investigate the metal box."
        },
        {
            id: 7,
            desc: "Search for the missing joycon in the room behind the door."
        }],
        conditionalOptions: [
            {
                id: 9,
                desc: "Go to the weird arcade machine?",
                dependence: "SI Finished",
            },
            {
                id: 4,
                desc: "Play the Game.",
                dependence: "Joycon",
                items: "SI Finished",
                change: `
The game bugs out, and the system crashes. The lights around the arcade flicker before returning to a dimmer setting.

You start to hear a slight buzzing on the other side of the room, where you can see a new, weird-looking arcade machine.`
            }
        ]
    },
    {
        id: 5,
        choName: "Prize Counter",
        desc: `You decide to explore the metal box, but as you approach it, you realize that it's not a metal box; it's a prize counter!
You decide to browse the various shelves, when you spot something interesting— a key!

You wonder if this key might be the solution to unlocking the locked door.`,
        unconditionalOptions: [
        {
            id: 6,
            desc: "Pick Up the Key.",
            items: "Key",
            change: `
You've collected the key now, there's nothing else to do here!`
        },
        {
            id: 4,
            desc: "Go back to the Space Invaders Cabinet"
        },
        {
            id: 7,
            desc: "Go to the Maintenance Door."
        }],
    },
    {
        id: 6,
        choName: "Find Key",
        desc: "You have Picked Up the Key.",
        unconditionalOptions: [{
            id: 5,
            desc: "Go back to Prize Counter"
        }],
    },
    {
        id: 7,
        choName: "Maintenance Door",
        desc: `You approach the dust-covered door, however, as you attempt to turn the doorknob the door won't budge. It seems like its locked.
What do you do?`,
        unconditionalOptions: [
        {
            id: 4,
            desc: "Go back to the Space Invader Machine."
        },
        {
            id: 5,
            desc: "Go to the Prize Counter."
        }],
        conditionalOptions: [{
            id: 8,
            desc: "Try the door.",
            dependence: "Key"
        }]
    },
    {
        id: 8,
        choName: "Find Joycon",
        desc: `You carefully insert the key into the lock and turn it. The door clicks open and you step inside, noticing the cobwebs hanging in the corners,
thick layers of dust. It's clear that this room hasn't been visited in quite some time.
Your gaze sweeps over the room, and there, on a dusty shelf, you spot the missing joycon. 
It's partially concealed under a layer of dust and appears to be in good condition. 
With the joycon in hand, you can now fix the broken arcade machine.`,
        unconditionalOptions: [{
            id: 4,
            desc: "Return to the arcade machine with the joycon.",
            items: "Joycon"
        }],
    },
    {
        id: 9,
        choName: "Arcade Mini Terminal",
        desc: `
You play the game. You are controlling a man in 2077, who's investigating an abandoned arcade on his street.

Despite the horrendous, rainy conditions, the man still pulls up to the arcade in his car. In front of him, the front doors.

Although the arcade is abandoned, the lights outside were shining for once? 

\"What?\", the man asks. \"Has someone been in here before?\"`,
        unconditionalOptions: [{
            id: 10,
            desc: "Go to the Door"
        }],
    },
    {
        id: 10,
        choName: "End",
        desc: "Did someone just open the door?",
        end: "endgame"
    },
]

// Variable local to this file only, meaning that choices are kept track of here and won't have any outside influence

let curChoice = 0;
let inventory = [];

// Getters and Setters
// Some G&S functions have overwrites w/ parameters so that specific choices can be picked

function getChoiceList() {
    return choiceList;
}

function getChoice() {
    return choiceList[curChoice];
}

function getChoiceNumbered(i) {
    return choiceList[i];
}

function getChoiceName() {
    return getChoice(curChoice).choName;
}

function getChoiceDesc() {
    return getChoice(curChoice).desc;
}

function getChoiceLoc() {
    return getChoice(curChoice).loc;
}

function getUnConditionalOptions() {
    if(getUnCondOptionLength() > 0) {
        return getChoice(curChoice).unconditionalOptions;
    } else {
        return [];
    }
}

function getConditionalOptions() {
    if(getCondOptionLength() > 0) {
        return getChoice(curChoice).conditionalOptions;
    } else {
        return [];
    }
}

function getNewChoice(newChoice, unprintedOptions) {
    let newChoiceNum = 0;
    let newChoiceMinus = newChoice + unprintedOptions;
    let chosen = null;
    if(newChoiceMinus <= getCondOptionLength()) {
        newChoiceNum = newChoiceMinus;
        chosen = getConditionalOptions()[newChoiceNum - 1];
        if(chosen.hasOwnProperty("change")) {
            changeText(chosen.change);
        }

        curChoice = chosen.id;''
        if(chosen.hasOwnProperty("items")) {
            addToInv(chosen.items);
        }
    } else {
        newChoiceNum = newChoiceMinus - getCondOptionLength();
        chosen = getUnConditionalOptions()[newChoiceNum - 1];
        if(chosen.hasOwnProperty("change")) {
            changeText(chosen.change);
        }
        curChoice = chosen.id;
        if(chosen.hasOwnProperty("items")) {
            addToInv(chosen.items);
        }
    }
}

function getCondOptionLength() {
    try {
        lengthRet = getChoice(curChoice).conditionalOptions.length;
        return lengthRet;
    } catch (err) {
        return 0;
    }
}

function getUnCondOptionLength() {
    try {
        lengthRet = getChoice(curChoice).unconditionalOptions.length;
        return lengthRet;
    } catch (err) {
        return 0;
    }
}

function addInv(item) {
    if(inventory.includes(item)) {
        return false;
    } else {
        return true;
    }
}

function isInInv(item) {
    if(inventory.includes(item)) {
        return true;
    }
    else {
        return false;
    }
}

function addToInv(item) {
    inventory.push(item);
}

function changeText(str) {
    getChoice().desc = str;
}

 module.exports = {
    getChoiceList,
    getChoice,
    getChoiceNumbered,
    getChoiceName,
    getChoiceDesc,
    getChoiceLoc,
    getUnConditionalOptions,
    getConditionalOptions,
    getNewChoice,
    getCondOptionLength,
    getUnCondOptionLength,
    isInInv,
    addInv,
    addToInv
 };