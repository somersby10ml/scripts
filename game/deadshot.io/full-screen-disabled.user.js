// ==UserScript==
// @name         DeadShot full-screen disabled
// @namespace    deadshot.io
// @version      2024-07-03
// @description  DeadShot 게임에서 전체화면을 사용할 수 없도록 차단합니다.
// @author       You
// @match        https://deadshot.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deadshot.io
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  // 전체화면 요청을 가로채는 함수
  function blockFullscreen(event) {
      event.preventDefault();
      console.log('전체화면 요청이 차단되었습니다.');
  }

  // 페이지의 모든 요소에 대해 전체화면 이벤트를 감시
  document.addEventListener('fullscreenchange', blockFullscreen, true);
  document.addEventListener('webkitfullscreenchange', blockFullscreen, true);
  document.addEventListener('mozfullscreenchange', blockFullscreen, true);
  document.addEventListener('MSFullscreenChange', blockFullscreen, true);

  // 전체화면 API를 덮어쓰기
  ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'].forEach(function(method) {
      Element.prototype[method] = function() {
          console.log('전체화면 요청이 차단되었습니다.');
      };
  });

  console.log('전체화면 방지 스크립트가 로드되었습니다.');
})();