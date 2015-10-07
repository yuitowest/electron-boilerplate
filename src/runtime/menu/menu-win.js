import app from 'app';
import BrowserWindow from 'browser-window';
import Menu from 'menu';

const _View = {
  label: '表示',
  submenu: [
    {
      label: 'フルスクリーンモード',
      click: function() {
        BrowserWindow.getFocusedWindow().reloadIgnoringCache();
      }
    }
  ]
};

const menu = Menu.buildFromTemplate([
    _View
]);

module.exports = menu;
