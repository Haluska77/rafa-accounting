const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    // icon: '',
    webPreferences: {
      // webSecurity: false,
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

  // mainWindow.loadFile(path.join(__dirname, 'dist/rafa3/index.html'));
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'build/index.html'), // relative path to the HTML-file
  //   protocol: "file:",
  //   slashes: true
  // }));
  mainWindow.webContents.openDevTools();
  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: 'File',
  //     submenu: [
  //       // Other menu items...
  //     ]
  //   },
  //   {
  //     label: 'Help',
  //     submenu: [
  //       {
  //         label: 'About Rafaelko',
  //         click: () => {
  //           // Show about dialog or any other action
  //           showDialog();
  //         }
  //       }
  //     ]
  //   }
  // ]);

  // Set the menu
  // Menu.setApplicationMenu(menu);

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
  // Implement your About dialog here
  const aboutDialogOptions = {
    title: 'About Rafaelko account app',
    message: 'Your app description or any other information.',
    buttons: ['OK']
  };

  // Show the dialog
  const { response } = dialog.showMessageBoxSync(aboutDialogOptions);
  console.log('User clicked OK');
}