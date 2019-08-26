/* global document chrome scanner */
const strategyList = ['for', 'name', 'id', 'title', 'href', 'class', 'index'];
let clickedEl = null;
const MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';
let prevDOM = null;


function getTime() {
    return new Date().getTime();
}

function pathOnly(event) {
  const uniqueXPaths = [];
  strategyList.forEach(item => {
    const path = scanner.parseNode(getTime(), event.target, [item]);
    if (path.path !== '/') {
      const elements = document.evaluate(path.path.replace('xpath=', ''), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      if (elements.snapshotLength === 1) uniqueXPaths.push(path);
    }
  });
  return uniqueXPaths;
}

function needGetElement(tabId, event) {
  clickedEl = scanner.parseNode(getTime(), event.target, strategyList);
  const elementPos = event.target.getBoundingClientRect();
  const uniqueXPaths = pathOnly(event);
  chrome.runtime.sendMessage({ type: 'removeMenu' }, () => {
    chrome.runtime.sendMessage({ type: 'sendPaths', uniqueXPaths, recomendPath: clickedEl, tabId });
    chrome.runtime.sendMessage({ chromeAction: 'screenshot', elementPos });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'startListener') {
      document.addEventListener('mousedown', event => {
        // right click
        if (event.button === 2) {
          needGetElement(request.sendTabId, event);
        }
      }, false);
      // 注入鼠标元素事件
      document.addEventListener('mousemove', (e) => {
        let srcElement = e.srcElement;
        if (srcElement.nodeName) {
          if (prevDOM != null) {
            prevDOM.setAttribute('style', 'outline: none;background-clip: none;');
          }
          srcElement.setAttribute('style', 'outline: 1px dashed #e9af6e!important;background-clip: #bcd5eb!important;');
          prevDOM = srcElement;
        }
      }, false);
    }
    if (request.type === 'getBackground') {
      sendResponse('content收到发送到界面');
      window.postMessage({ path: request.script, elementCap: request.elementCap }, '*');
    }
    // if (request.operation === 'get') {
    //     chrome.runtime.sendMessage(
    //         {
    //             contentScriptQuery: 'getdata',
    //              url: 'http://test-mic.vemic.com/api/sysmanage/prj_ajax/list?_t=1560824404631',
    //         }, response => {
    //             debugger;
    //             if (response != undefined && response != '') {
    //                 console.log(response);
    //             } else {
    //                 debugger;
    //                 console.log(null);
    //             }
    //         });
    //     sendResponse('fetch test');
    // }
});
