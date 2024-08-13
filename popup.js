document.addEventListener('DOMContentLoaded', function() {
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
      document.getElementById('enableExtension').checked = result.enabled !== false;
      document.getElementById('color').value = result.color || 'white';
      document.getElementById('opacity').value = result.opacity || '1';
      document.getElementById('text-bg-color').value = result.textBgColor || 'transparent';
      document.getElementById('caption-area-bg-color').value = result.captionAreaBgColor || 'transparent';
      document.getElementById('caption-area-bg-opacity').value = result.captionAreaBgOpacity || '1';
      document.getElementById('font-size').value = result.fontSize || '165%'; 
      document.getElementById('text-border-style').value = result.textBorderStyle || 'shadow'; 
      document.getElementById('text-font').value = result.textFont || 'Trebuchet MS'; 
  });

  document.getElementById('save-button').addEventListener('click', function() {
      const enabled = document.getElementById('enableExtension').checked;
      const color = document.getElementById('color').value;
      const opacity = document.getElementById('opacity').value;
      const textBgColor = document.getElementById('text-bg-color').value;
      const captionAreaBgColor = document.getElementById('caption-area-bg-color').value;
      const captionAreaBgOpacity = document.getElementById('caption-area-bg-opacity').value;
      const fontSize = document.getElementById('font-size').value;
      const textBorderStyle = document.getElementById('text-border-style').value;
      const textFont = document.getElementById('text-font').value;

      chrome.storage.sync.set({
          enabled,
          color,
          opacity,
          textBgColor,
          captionAreaBgColor,
          captionAreaBgOpacity,
          fontSize,
          textBorderStyle,
          textFont
      }, function() {
          alert('Settings saved!');
      });
  });
});
