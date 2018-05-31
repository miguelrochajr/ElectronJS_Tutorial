const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);

        this.setToolTip('Timer App');
        this.mainWindow = mainWindow
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
    }

    onClick(event, bounds) {
        // CLick event bounds
        const { x, y } = bounds;

        // window height and width
        const { height, width } = this.mainWindow.getBounds();

        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            const yPosition = process.platform === 'darwin' ? y : y - height;

            this.mainWindow.setBounds({
                x: x - width/2, // leftX of the mainWindow at the centerX of the click - mainWindow.width
                y: yPosition,  
                height,
                width,
            });
            this.mainWindow.show();
        }
    }

    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([
            { 
                label: 'Quit',
                click: () => app.quit()
            }
        ]);

        this.popUpContextMenu(menuConfig);
    }
}

module.exports = TimerTray;