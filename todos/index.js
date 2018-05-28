const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('close', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo'
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
    addWindow.on('closed', () => addWindow = null); // IMPORTANT FOR GARBAGE COLLECTOR!!
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

function clearTodos() {
    mainWindow.webContents.send('todo:clear', "");
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { 
                label: 'New Todo',
                 click() { createAddWindow(); }
            },
            {
                label: 'Clear Todos',
                click() { clearTodos(); }
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// This is to make sure both platforms shows the same thing
if (process.platform === 'darwin') {
    menuTemplate.unshift({});  // insert as the first argument of the array
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'DEVELOPER!',
        submenu: [
            { role: 'reload' }, // preset electron roles. See S03L33
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}