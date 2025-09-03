const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    icon: path.join(__dirname, 'assets', 'IconOnly.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      contentSecurityPolicy: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
      },
    }
  });

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        // Other menu items...
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Rafaelko',
          click: () => {
            showDialog();
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

function showDialog() {
  const aboutDialogOptions = {
    title: 'About Rafaelko account app',
    message: 'Pick up csv file with financial operation',
    buttons: ['OK']
  };

  // Show the dialog
  const { response } = dialog.showMessageBoxSync(aboutDialogOptions);
  console.log('User clicked OK');
}