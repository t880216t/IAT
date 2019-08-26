/* global chrome URL Blob */
/* global instruction filename statusMessage url tab logo translator */

let newWindowId = null;
let uniqueXPaths = [];
let homeTabId = null;
let elementCap = null;

function sendMessageToContentScript(tabId, message, callback) {
  chrome.tabs.sendMessage(tabId, message, response => {
    if (callback) callback(response);
  });
}
function beautySub(str, len) {
  const reg = /[\u4e00-\u9fa5]/g; // 匹配中文
    const slice = str.substring(0, len);
    const chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length));
    const realen = slice.length * 2 - chineseCharNum;
  return str.substr(0, realen) + (realen < str.length ? '...' : '');
}

// here we create a new image
function createImage(dataURL,elementPos) {
  // create a canvas
  const canvas = createCanvas(elementPos.width, elementPos.height);
  // get the context of your canvas
  const context = canvas.getContext('2d');
  // create a new image object
  const croppedImage = new Image();

  croppedImage.onload = function () {
    // this is where you manipulate the screenshot (cropping)
    // parameter 1: source image (screenshot)
    // parameter 2: source image x coordinate
    // parameter 3: source image y coordinate
    // parameter 4: source image width
    // parameter 5: source image height
    // parameter 6: destination x coordinate
    // parameter 7: destination y coordinate
    // parameter 8: destination width
    // parameter 9: destination height
    context.drawImage(
      croppedImage,
      elementPos.x,
      elementPos.y,
      elementPos.width,
      elementPos.height,
      0,
      0,
      elementPos.width,
      elementPos.height
    );

    // canvas.toDataURL() contains your cropped image
    elementCap = canvas.toDataURL();
  };
  croppedImage.src = dataURL; // screenshot (full image)
}

// creates a canvas element
function createCanvas(canvasWidth, canvasHeight) {
  const canvas = document.createElement('canvas');

  // size of canvas in pixels
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  return canvas;
}

// calling the captureVisibleTab method takes a screenhot
function createScreenshot(callback) {
  // you can have two image formats (jpeg and png)
  // for jpeg use { format: "jpeg", quality: 100 }
  // (you can adjust the jpeg image quality from 0-100)
  // for png use { format: "png" }
  chrome.tabs.captureVisibleTab(null, { format: 'png' }, callback);
}

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (request.type === 'openTestWebSite') {
        console.log('sender', sender);
        // 创建新窗口打开测试页面
        chrome.windows.create({
          url: request.url,
          type: 'normal',
        }, newWindow => {
          sendResponse(newWindow.id);
          newWindowId = newWindow.id;
          // 获取窗口中的第一个tab页面打开状态
          chrome.tabs.onUpdated.addListener((tabId, info) => {
              if (info.status === 'complete') {
                chrome.tabs.get(tabId, tab => {
                  chrome.windows.get(tab.windowId, win => {
                    // 获取加载完成的tab的所属window
                    if (win.id === newWindowId) {
                      // 启动脚本监听
                      console.log('启动脚本监听');
                      chrome.tabs.setZoom( 1, () => {
                        chrome.tabs.sendMessage(tabId, { type: 'startListener', sendTabId: sender.tab.id });
                      });
                    }
                  });
                });
              }
          });
        });
    }
});

// // 界面缩放改变
// chrome.tabs.onZoomChange.addListener((tabId,oldZoomFactor,newZoomFactor)=>{
//   console.log("tabId",tabId)
//   console.log("oldZoomFactor",oldZoomFactor)
//   console.log("newZoomFactor",newZoomFactor)
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'sendPaths') {
      uniqueXPaths = request.uniqueXPaths;
      homeTabId = request.tabId;
      // 创建右键菜单
      chrome.contextMenus.create({
        id: 'get-element',
        title: '元素定位信息',
        contexts: ['all'],
      });
      request.uniqueXPaths.forEach((item, index) => {
        chrome.contextMenus.create({
          title: beautySub(item.path, 30),
          parentId: 'get-element',
          id: `get-sub-id-${index}`,
          contexts: ['all'],
        });
      });
      sendResponse('创建新菜单完成');
    }
    if (request.type === 'removeMenu') {
      chrome.contextMenus.removeAll();
      sendResponse('移除老菜单');
    }
    if (request.chromeAction === 'screenshot') {
      createScreenshot(dataURL => {
        createImage(dataURL, request.elementPos);
      });
      return true;
    }
});

// 监听右键菜单事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // 监听来自自定义菜单的事件
  if (info.menuItemId.indexOf('get-sub-') !== -1) {
    // 获取点击菜单值
    const clickIndex = info.menuItemId.split('-id-')[1];
    const clickPath = uniqueXPaths[clickIndex].path;
    // 通知页面content，获取此时右键的element，并计算返回属性信息
    sendMessageToContentScript(homeTabId, { type: 'getBackground', script: clickPath, elementCap });
  }
});
