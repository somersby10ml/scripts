// ==UserScript==
// @name         Notion URL Converter
// @namespace    notion
// @version      1.0
// @description  Convert notion.so URLs to notion:// URLs
// @match        https://www.notion.so/*
// @grant        none
// ==/UserScript==

/**
 * 노션 링크를 노션 앱 링크로 변환하는 유저 스크립트입니다.
 * 노션이 설치되어 있어야 하며 notion:// 링크를 열 수 있어야 합니다.
 * @createdAt 2024-09-14 01:00:00 (KST)
 */

(function() {
  'use strict';
  const notionWorkSpaceName = '이곳에 사용할 워크스페이스 이름을 넣어주세요.';
  const currentURL = window.location.href;
  if (currentURL.startsWith(`https://www.notion.so/${notionWorkSpaceName}`)) {
      var newURL = currentURL.replace("https://www.notion.so/", "notion://");
      window.location.href = newURL;
  }
})();