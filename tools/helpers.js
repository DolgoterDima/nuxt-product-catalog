const keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1,
};

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomFromArray(array) {
  return array[getRandomInt(0, array.length - 1)];
}

export function getBodyScrollTop() {
  return (
    window.pageYOffset ||
    (document.documentElement && document.documentElement.scrollTop) ||
    (document.body && document.body.scrollTop)
  );
}

export function isScrolledIntoView(el) {
  const elemTop = el.getBoundingClientRect().top;
  const elemBottom = el.getBoundingClientRect().bottom;
  const elHeight = elemBottom - elemTop;
  // return (elemTop >= -window.innerHeight/2)
  // && (elemTop <= window.innerHeight/2)
  // && (elemBottom >= window.innerHeight/2)
  // && (elemBottom <= 3*window.innerHeight/2);
  return elemBottom <= elHeight;
}

export function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    this.preventDefault(e);
  }
  return !keys[e.keyCode];
}

export function disableScroll() {
  if (window.addEventListener) {
    // older FF
    window.addEventListener('DOMMouseScroll', this.preventDefault, false);
  }
  window.onwheel = this.preventDefault; // modern standard
  document.onmousewheel = this.preventDefault; // older browsers, IE
  window.onmousewheel = this.preventDefault; // older browsers, IE
  window.ontouchmove = this.preventDefault; // mobile
  document.onkeydown = this.preventDefaultForScrollKeys;
}

export function enableScroll() {
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
  }
  document.onmousewheel = null;
  window.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}

export function declension(num, expressions) {
  let result;
  let count = num % 100;
  if (count >= 5 && count <= 20) {
    result = expressions['2'];
  } else {
    count %= 10;
    if (count === 1) {
      result = expressions['0'];
    } else if (count >= 2 && count <= 4) {
      result = expressions['1'];
    } else {
      result = expressions['2'];
    }
  }
  return result;
}

export function share(network, link, { title, description, image }, callback) {
  function sharePopup(url, width = 400, height = 400, _callback) {
    const shareWindow = window.open(
      url,
      '_blank',
      `height=${height},width=${width},menubar=no,toolbar=no,location=no`
    );
    const watchTimer = setInterval(() => {
      if (shareWindow.closed) {
        clearInterval(watchTimer);
        if (typeof _callback !== 'undefined') {
          _callback();
        }
      }
    }, 200);
  }

  switch (network) {
    case 'vk':
      sharePopup(
        `https://vk.com/share.php?url=${link}&title=${title}&description=${description}&image=${image}`,
        550,
        300,
        callback
      );
      break;
    case 'fb':
      sharePopup(
        `https://www.facebook.com/sharer/sharer.php?u=${link}`,
        550,
        300,
        callback
      );
      break;
    case 'tw':
      sharePopup(
        `https://twitter.com/intent/tweet?original_referer=${link}&tw_p=tweetbutton&url=${link}`,
        550,
        300,
        callback
      );
      break;
    case 'ok':
      sharePopup(
        `https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st._aid=ExternalShareWidget_SharePreview&st.shareUrl=${link}`,
        550,
        300,
        callback
      );
      break;
    case 'tg':
      sharePopup(
        `https://telegram.me/share/url?url=${link}`,
        550,
        300,
        callback
      );
      break;
    default:
      break;
  }
}

export function socialAuthorization(network, callback) {
  let url = '';
  switch (network) {
    case 'vk':
      url = '/auth/social/vkontakte';
      break;
    case 'fb':
      url = '/auth/social/facebook';
      break;
    case 'ok':
      url = '/auth/social/odnoklassniki';
      break;
    default:
      url = '';
  }
  const loginWindow = window.open(url, '_blank', `height=${500},width=${500}`);
  const watchTimer = setInterval(() => {
    try {
      if (loginWindow.closed) {
        clearInterval(watchTimer);
        callback();
      }
    } catch (e) {
      // callback();
    }
  }, 200);
}

export function getLang() {
  const lang = localStorage.getItem('DEVELUP_LANG');
  let browserLang =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;
  browserLang = browserLang.includes('ru') ? 'ru' : 'en';
  return lang || browserLang;
}

export function blobToFile(blob, fileName) {
  if (!this.isIE()) {
    return new File([blob], fileName, {
      type: blob.type,
      lastModified: Date.now(),
    });
  }
  const localBlob = blob;
  localBlob.lastModifiedDate = new Date();
  localBlob.name = fileName;
  return localBlob;
}
