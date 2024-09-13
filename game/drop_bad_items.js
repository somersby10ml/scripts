/**
 * hordes.io 안좋은 아이템 버리기 스크립트
 * @createdAt 2024-09-14 01:00:00 (KST)
 * @using hordes.io 게임에서 콘솔창에 붙여넣어 실행합니다.
 * @warning 이 스크립트는 게임 내 아이템을 버릴 수 있습니다. 주의하세요.
 * @warning 소스코드 최적화가 되어있지 않습니다. 개선이 필요합니다.
 * @tip 봇 파티에서 사용하면 효과적일 수 있습니다.
 */

(async () => {
  // const bagElement = document.getElementById('bag14');
  // forceMouseEnter();

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  for (let i = 0; i < 40; i++) {
    const itemInfo = await getItemInfo(i);
    if (!itemInfo) continue;
    await dropItem(i);
    await delay(500);
  }
  console.log('done');


  // 0 ~ 39
  async function getItemInfo(bagSlotNumber) {
    const WAIT_TIME = 20;

    const bagElement = document.getElementById('bag' + bagSlotNumber);
    if (!bagElement) return null;

    const createPointerEvent = (el, name) => {
      const event = new MouseEvent(name, {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      el.dispatchEvent(event);
    }

    // bagElement 의 class 에서 filled 가 있는지 검사
    const filled = bagElement.classList.contains('filled');
    if (!filled) return null;

    // 아이템이 `일반` 이 아닐경우 리턴
    // const white = bagElement.classList.contains('white');
    // if(!white) return null;

    createPointerEvent(bagElement, 'pointerenter');

    await delay(WAIT_TIME);

    // bagElement 의 자식에서 slotdescription 이라는 class 를 가진 요소를 찾아서 반환
    const slotDescriptionElement = bagElement.querySelector('.slotdescription');
    if (!slotDescriptionElement) {
      createPointerEvent(bagElement, 'pointerleave');
      return null;
    }

    // slotDescriptionElement 에서 다음의 element 가 있나 검사한다. <div class="textred">Class: 전사</div>
    const classElements = slotDescriptionElement.querySelectorAll('.textred');
    const a = Array.from(classElements).find(el =>
      el.innerText === 'Class: 마법사'
      || el.innerText === 'Class: 전사'
      || el.innerText === 'Class: 주술사'
      || el.innerText === 'You already know this skill'
    );

    const includeWords = ['Common Staff', 'Common Armor', 'Common Orb',
      'Common Shield', 'Common Quiver', 'Common Glove', 'Common Hammer', 'Common Ring',
      'Common Totem', 'Common Boot', 'Common Armlet', 'Common Amulet', 'Common Bag', 'Common Bow']

    const b = includeWords.some(word => slotDescriptionElement.innerText.includes(word));
    if (!a && !b) {
      createPointerEvent(bagElement, 'pointerleave');
      return null;
    }

    createPointerEvent(bagElement, 'pointerleave');
    await delay(WAIT_TIME);
    return true;
  }

  async function dropItem(bagSlotNumber) {
    const WAIT_TIME = 50;

    const bagElement = document.getElementById('bag' + bagSlotNumber);
    if (!bagElement) return null;


    {
      const rightClickEvent = new MouseEvent('pointerdown', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'button': 2,  // 0: 좌클릭, 1: 휠클릭, 2: 우클릭
        'buttons': 0, // 비트마스크: 1: 좌클릭, 2: 우클릭, 4: 휠클릭
        // clientX: bagElement.getBoundingClientRect().x,
        // clientY: bagElement.getBoundingClientRect().y
      });

      // 이벤트 발생
      bagElement.dispatchEvent(rightClickEvent);
      await delay(WAIT_TIME);
    }

    {
      const rightClickEvent = new MouseEvent('pointerup', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'button': 2,  // 0: 좌클릭, 1: 휠클릭, 2: 우클릭
        'buttons': 0,  // 비트마스크: 1: 좌클릭, 2: 우클릭, 4: 휠클릭
        // clientX: bagElement.getBoundingClientRect().x,
        // clientY: bagElement.getBoundingClientRect().y
      });

      // 이벤트 발생
      bagElement.dispatchEvent(rightClickEvent);
      await delay(WAIT_TIME);
    }

    const w = document.getElementsByClassName('panel context border grey');
    if (w.length === 0) return null;

    // w 의 자식 텍스트중 "아이템 버리기" 의 element 를 찾는다.
    const dropItemElement = Array.from(w[0].children).find(el => el.innerText === '아이템 버리기');
    if (!dropItemElement) return null;

    {
      {
        const rightClickEvent = new MouseEvent('mousedown', {
          'view': window,
          'bubbles': true,
          'cancelable': true,
          'button': 0,  // 0: 좌클릭, 1: 휠클릭, 2: 우클릭
          'buttons': 0, // 비트마스크: 1: 좌클릭, 2: 우클릭, 4: 휠클릭
          // clientX: bagElement.getBoundingClientRect().x,
          // clientY: bagElement.getBoundingClientRect().y
        });

        // 이벤트 발생
        dropItemElement.dispatchEvent(rightClickEvent);
        await delay(WAIT_TIME);
      }

      {
        const rightClickEvent = new MouseEvent('mouseup', {
          'view': window,
          'bubbles': true,
          'cancelable': true,
          'button': 0,  // 0: 좌클릭, 1: 휠클릭, 2: 우클릭
          'buttons': 0,  // 비트마스크: 1: 좌클릭, 2: 우클릭, 4: 휠클릭
          // clientX: bagElement.getBoundingClientRect().x,
          // clientY: bagElement.getBoundingClientRect().y
        });

        // 이벤트 발생
        dropItemElement.dispatchEvent(rightClickEvent);
        await delay(WAIT_TIME);
      }
    }
    await delay(WAIT_TIME);
  }

})();
