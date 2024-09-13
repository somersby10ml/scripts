// ==UserScript==
// @name         krunkercentral time speed up
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Continue 버튼 클릭시 타이머 속도를 빠르게 합니다.
// @author       You
// @match        https://krunkercentral.com/keygen/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=krunkercentral.com
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';
  const original = console.log
  const origianlInterval = unsafeWindow.setInterval;
  const origianlTimeout = unsafeWindow.setTimeout;

  setTimeout(() => {
      original('111');
      unsafeWindow.setInterval = (a, b) => {
          return origianlInterval(a, 100);
      }

      unsafeWindow.setTimeout = (a, b) => {
          return origianlTimeout(a, 100);
      }

  }, 1000);
})();