(function() {
  let settings;
  let styleElement;
  let targetPlayer;

  function createStyleElement() {
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'vjs-subtitle-styler';
      document.head.appendChild(styleElement);
    }
  }

  function updateStyles() {
    createStyleElement();
    styleElement.textContent = 
        `${targetPlayer ? targetPlayer : '.video-js'} .vjs-text-track-cue,
        ${targetPlayer ? targetPlayer : '.video-js'} .vjs-text-track-display > div > div > div {
            color: ${settings.color || 'white'} !important;
            opacity: ${settings.opacity || '1'} !important;
            background-color: ${settings.textBgColor || 'transparent'} !important;
            font-size: ${settings.fontSize || '165%'} !important;
            font-family: ${settings.textFont || 'Trebuchet MS, sans-serif'} !important;
            text-shadow: ${settings.textBorderStyle === 'none' ? 'none' : '0 0 7px black, 0 0 7px black, 0 0 7px black, 0 0 7px black'} !important;
        }
        ${targetPlayer ? targetPlayer : '.video-js'} .vjs-text-track-display {
            background-color: ${settings.captionAreaBgColor || 'transparent'} !important;
            opacity: ${settings.captionAreaBgOpacity || '1'} !important;
        }`;
}


  function loadAndApplySettings() {
    chrome.storage.sync.get([
      'enabled',
      'color',
      'opacity',
      'textBgColor',
      'captionAreaBgColor',
      'captionAreaBgOpacity',
      'fontSize',
      'textBorderStyle',
      'textFont'
    ], function(result) {
      settings = result;
      if (settings.enabled) {
        updateStyles();
      } else if (styleElement) {
        styleElement.textContent = '';
      }
    });
  }

  function findVideoJSPlayer() {
    const players = document.querySelectorAll('.video-js');
    for (let player of players) {
      if (player.offsetParent !== null) {
        return player;
      }
    }
    return null;
  }

  function init() {
    loadAndApplySettings();
    
    const checkForPlayer = setInterval(() => {
      const player = findVideoJSPlayer();
      if (player) {
        targetPlayer = '#' + player.id;
        updateStyles();
        clearInterval(checkForPlayer);
        
 
        const observer = new MutationObserver(() => {
          updateStyles();
        });
        observer.observe(player, { childList: true, subtree: true });
      }
    }, 1000);
  }


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
      loadAndApplySettings();
    }
  });

})();