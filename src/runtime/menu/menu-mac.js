'use strict';

import app from 'app';
import BrowserWindow from 'browser-window';
import Menu from 'menu';
import info from "../../package.json";

const _App = {
  label: `${info.name}`,
  submenu: [
    {
      label: `About ${info.name}`,
      selector: 'orderFrontStandardAboutPanel:'
    },
    {
      type: 'separator'
    },
    {
      label: 'Services',
      submenu: []
    },
    {
      type: 'separator'
    },
    {
      label: 'ウィンドウを閉じる',
      accelerator: 'Command+W',
      selector: 'performClose:'
    },
    {
      label: `${info.name} を隠す`,
      accelerator: 'Command+H',
      selector: 'hide:'
    },
    {
      label: '他を隠す',
      accelerator: 'Command+Shift+H',
      selector: 'hideOtherApplications:'
    },
    {
      label: 'すべてを表示',
      selector: 'unhideAllApplications:'
    },
    {
      type: 'separator'
    },
    {
      label: `${info.name} を終了`,
      accelerator: 'Command+Q',
      click: function () {
        app.quit();
      }
    },
  ]
};

const _Edit = {
  label: '編集',
  submenu: [
    {
      label: '取り消す',
      accelerator: 'Command+Z',
      selector: 'undo:'
    },
    {
      label: 'やり直す',
      accelerator: 'Shift+Command+Z',
      selector: 'redo:'
    },
    {
      type: 'separator'
    },
    {
      label: 'カット',
      accelerator: 'Command+X',
      selector: 'cut:'
    },
    {
      label: 'コピー',
      accelerator: 'Command+C',
      selector: 'copy:'
    },
    {
      label: 'ペースト',
      accelerator: 'Command+V',
      selector: 'paste:'
    },
    {
      label: '全て選択',
      accelerator: 'Command+A',
      selector: 'selectAll:'
    },
  ]
};

const _Window = {
  label: 'ウィンドウ',
  submenu: [
    {
      label: 'しまう',
      accelerator: 'Command+M',
      selector: 'performMiniaturize:'
    },
    {
      label: 'フルスクリーンモード',
      click: function () {
        BrowserWindow.getFocusedWindow().reloadIgnoringCache();
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'すべてを手前に移動',
      selector: 'arrangeInFront:'
    }
  ]
};

const menu = Menu.buildFromTemplate([
    _App,
    _Edit,
    _Window
]);

module.exports = menu;
