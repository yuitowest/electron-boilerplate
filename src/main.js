import app from "app";
import Menu from "menu";
import BrowserWindow from "browser-window";
import crashReporter from "crash-reporter";
import menu from "./runtime/menu";
crashReporter.start();

let mainWindow = null;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({width: 800, height: 1000});

  mainWindow.loadUrl(`file://${__dirname}/index.html`);

  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(menu);
  } else {
    mainWindow.setMenu(menu);
  }

  if (process.env.NODE_ENV !== "production") {
      mainWindow.openDevTools();
      // BrowserWindow.addDevToolsExtension('.cache/react-devtools/shells/chrome');
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
