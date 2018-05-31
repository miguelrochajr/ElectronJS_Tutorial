const electron = require('electron');
const { BrowserWindow } = electron;

class MainwWindow extends BrowserWindow {
    constructor(url){
        super({
            height: 500, 
            width: 300,
            frame: false,  // hide the status bar
            resizable: false,  // do not allow the user to resize the application window
            backgroundColor: '#FFF',
            show: false,
            // S4L59: avoid chromium throttling down the resources for the app
            webPreferences: { backgroundThrottling: false }
        });
        this.loadURL(url);
        this.on('blur', this.onBlur.bind(this));
    }

    onBlur() {
        this.on('blur', () => {
            // the blur event called when the window loses focus
            this.hide();
        });
    }
}

module.exports = MainwWindow;