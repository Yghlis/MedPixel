// @ts-nocheck
/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


let lastPosition = { x: 0, y: 0 }; 
let lastDirection = 'down'; 
let cguWebsite: any;

WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('CA MARCHE')

    let cgu;

    WA.state.onVariableChange("Cgu").subscribe((newEventData) => {
        if (newEventData) {
            cgu.close();
          WA.state.saveVariable('Cgu', false);
        }
      });

    cguWebsite = WA.ui.website.open({
        url: "./src/cgu/index.html",
        position: { vertical: "top", horizontal: "middle" },
        size: { height: "30vh", width: "50vw" },
        margin: { top: "10vh" },
        allowApi: true,
    }).then((website) => {
        console.log("Calendrier ouvert avec succès");
        cgu = website;
      });
 
    window.addEventListener('message', (event) => {
        if (event.data.action === 'closeCGU') {
            if (cguWebsite) {
                cguWebsite.close();
                console.log('CGU window closed');
            }
        }
    });

    WA.player.onPlayerMove((moveData) => {
        lastPosition = { x: moveData.x, y: moveData.y };
        lastDirection = moveData.direction;
    });

    WA.room.area.onEnter('jitsiMeetingRoom').subscribe(async () => {
        console.log(`The player ${WA.player.name} has entered the zone.`);
        const playerTags = WA.player.tags; // Récupérer les tags du joueur

        console.log('Player tags:', playerTags);

        if (!playerTags.includes('administrateur') && !playerTags.includes('VIP_neurologie')) {
            console.log('Access denied to the jitsiMeetingRoom. You do not have the "admin" role.');

            let teleportX = lastPosition.x;
            let teleportY = lastPosition.y;
            switch (lastDirection) {
                case 'down': teleportY -= 1; break;
                case 'up': teleportY += 1; break;
                case 'left': teleportX += 1; break;
                case 'right': teleportX -= 1; break;
            }
            await WA.player.teleport(teleportX, teleportY);

            WA.ui.displayActionMessage({
                message: "Vous n'avez pas le role nécéssaire pour accéder à la zone neurologie, si le problème persiste veuillez contacter un administrateur",
                callback: () => console.log('The player has confirmed the message.'),
                type: "warning",
            });
        } else {
            console.log('Welcome to the jitsiMeetingRoom!');
        }
    });

    WA.room.area.onEnter('book').subscribe(async () => {
        console.log(`The player ${WA.player.name} has entered the zone.`);
        const playerTags = WA.player.tags; // Récupérer les tags du joueur

        console.log('Player tags:', playerTags);

        WA.ui.modal.openModal({
            title: "Bibliothèque virtuelle",
            src: 'http://154.56.57.33/',
            allow: "fullscreen",
            position: "right",
            allowApi: true
        });
    });

    WA.room.area.onEnter('jitsiChillZone').subscribe(async () => {
        console.log(`The player ${WA.player.name} has entered the zone.`);
        const playerTags = WA.player.tags; // Récupérer les tags du joueur

        console.log('Player tags:', playerTags);

        if (!playerTags.includes('administrateur') && !playerTags.includes('VIP_neurologie')) {
            console.log('Access denied to the jitsiMeetingRoom. You do not have the "admin" role.');

            let teleportX = lastPosition.x;
            let teleportY = lastPosition.y;
            switch (lastDirection) {
                case 'down': teleportY -= 1; break;
                case 'up': teleportY += 1; break;
                case 'left': teleportX += 1; break;
                case 'right': teleportX -= 1; break;
            }
            await WA.player.teleport(teleportX, teleportY);

            WA.ui.displayActionMessage({
                message: "Vous n'avez pas le role nécéssaire pour accéder à la zone neurologie, si le problème persiste veuillez contacter un administrateur",
                callback: () => console.log('The player has confirmed the message.'),
                type: "warning",
            });
        } else {
            console.log('Welcome to the jitsiMeetingRoom!');
        }
    });

    WA.room.area.onEnter('from-conference').subscribe(async () => {
        console.log(`The player ${WA.player.name} has entered the zone.`);
        const playerTags = WA.player.tags; // Récupérer les tags du joueur

        console.log('Player tags:', playerTags);

        if (!playerTags.includes('administrateur') && !playerTags.includes('VIP_neurologie')) {
            console.log('Access denied to the jitsiMeetingRoom. You do not have the "admin" role.');

            let teleportX = lastPosition.x;
            let teleportY = lastPosition.y;
            switch (lastDirection) {
                case 'down': teleportY -= 1; break;
                case 'up': teleportY += 1; break;
                case 'left': teleportX += 1; break;
                case 'right': teleportX -= 1; break;
            }
            await WA.player.teleport(teleportX, teleportY);

            WA.ui.displayActionMessage({
                message: "Vous n'avez pas le role nécéssaire pour accéder à la zone neurologie, si le problème persiste veuillez contacter un administrateur",
                callback: () => console.log('The player has confirmed the message.'),
                type: "warning",
            });
        } else {
            console.log('Welcome to the jitsiMeetingRoom!');
        }
    });

    WA.ui.actionBar.addButton({
        id: 'register-btn',
        type: 'action',
        imageSrc: 'http://localhost:5173/tilesets/iconsheesh.png',
        toolTip: 'Register',
        callback: (event) => {
            console.log('Button clicked', event);
            WA.ui.modal.openModal({
                title: 'ash',
                src: 'http://localhost:5173/src/introduction.html',
                allow: 'fullscreen',  
                position: 'center',  
                allowApi: true,
               
            });
        }
    });

const playerTags = WA.player.tags;


if (playerTags.includes('VIP_oncologie')) {
    
    WA.player.setOutlineColor(150, 131, 236);
}

else if (playerTags.includes('VIP_cardiologie')) {
   
    WA.player.setOutlineColor(180, 8, 8);
}

else if (playerTags.includes('VIP_neurologie')) {
   
    WA.player.setOutlineColor(28, 6, 162);
}


   
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));




export {};
