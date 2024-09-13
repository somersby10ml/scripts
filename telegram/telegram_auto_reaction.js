/**
 * 텔레그램 자동 반응 스크립트
 * @createdAt 2024-09-14 01:00:00 (KST)
 * @using 텔레그램 웹 버전에서 콘솔창에 붙여넣어 실행합니다.
 */

(async () => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const ignoredElements = [];

  const getUnreactedOpponentMessages = () => {
    const allMessages = document.getElementsByClassName('Message');
    const opponentMessages = [];

    for (let i = 0; i < allMessages.length; i++) {
      const message = allMessages[i];
      if (!message.classList.contains('own')) {
        if (message.getElementsByClassName('Reactions').length !== 0) {
          continue;
        }
        opponentMessages.push(message);
      }
    }
    return opponentMessages;
  };

  // 처음 로드시, 기존 대화는 무시
  const initialMessages = getUnreactedOpponentMessages();
  ignoredElements.push(...initialMessages); // 경우에 따라 주석

  async function handleMessage(element) {
    const rect = element.getBoundingClientRect();
    const clientX = rect.x;
    const clientY = rect.y;

    const events = [
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: false,
        view: window,
        button: 2,
        buttons: 2,
        clientX,
        clientY
      }),
      new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: false,
        view: window,
        button: 2,
        buttons: 0,
        clientX,
        clientY
      }),
      new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: false,
        view: window,
        button: 2,
        buttons: 0,
        clientX,
        clientY
      })
    ];

    events.forEach(event => element.dispatchEvent(event));

    await delay(300);

    const contextMenus = document.getElementsByClassName('MessageContextMenu');
    if (contextMenus.length === 0) {
      return;
    }

    const animatedStickerButton = contextMenus[0].getElementsByClassName('AnimatedSticker');
    if (animatedStickerButton.length === 0) {
      return;
    }

    animatedStickerButton[0].click();
    await delay(300);

    const textContent = element.querySelector('.text-content');
    console.log(textContent.innerText);
    return true;
  }

  let timer = null;
  async function monitorMessages() {
    try {
      const opponentMessages = getUnreactedOpponentMessages();
      const newMessages = opponentMessages.filter(element => !ignoredElements.includes(element));

      if (newMessages.length === 0) {
        return;
      }

      const messageElement = newMessages[0];
      console.log(messageElement.innerText);
      const result = await handleMessage(messageElement);
      if (!result) {
        ignoredElements.push(messageElement);
      }
    } catch (error) {
      console.error(error);
    } finally {
      clearTimeout(timer);
      timer = setTimeout(monitorMessages, 1000);
    }
  }

  monitorMessages();
})();
