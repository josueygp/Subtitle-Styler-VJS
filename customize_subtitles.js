document.addEventListener('DOMContentLoaded', function () {
 
    const opacitySlider = document.getElementById('opacity');
    const opacityValue = document.getElementById('opacityValue');
    opacitySlider.addEventListener('input', function() {
        opacityValue.textContent = parseFloat(opacitySlider.value).toFixed(2);
    });

    const captionBgOpacitySlider = document.getElementById('caption-area-bg-opacity');
    const captionBgOpacityValue = document.getElementById('captionBgOpacityValue');
    captionBgOpacitySlider.addEventListener('input', function() {
        captionBgOpacityValue.textContent = parseFloat(captionBgOpacitySlider.value).toFixed(2);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const selects = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input[type="range"], input[type="checkbox"]');

    let debounceTimeout;

    function saveSettings() {
        const settings = {
            enabled: document.getElementById('enableExtension').checked,
            color: document.getElementById('color').value,
            opacity: document.getElementById('opacity').value,
            textBgColor: document.getElementById('text-bg-color').value,
            captionAreaBgColor: document.getElementById('caption-area-bg-color').value,
            captionAreaBgOpacity: document.getElementById('caption-area-bg-opacity').value,
            fontSize: document.getElementById('font-size').value,
            textBorderStyle: document.getElementById('text-border-style').value,
            textFont: document.getElementById('text-font').value
        };

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            chrome.storage.sync.set(settings, function() {
                console.log('Settings saved:', settings);
            });
        }, 500);  
    }

    selects.forEach(select => {
        select.addEventListener('change', saveSettings);
    });

    inputs.forEach(input => {
        input.addEventListener('input', saveSettings);
    });

    document.getElementById('opacity').addEventListener('input', function () {
        document.getElementById('opacityValue').textContent = this.value;
    });

    document.getElementById('caption-area-bg-opacity').addEventListener('input', function () {
        document.getElementById('captionBgOpacityValue').textContent = this.value;
    });

   
    chrome.storage.sync.get(null, function(settings) {
        document.getElementById('enableExtension').checked = settings.enabled || false;
        document.getElementById('color').value = settings.color || 'white';
        document.getElementById('opacity').value = settings.opacity || '1';
        document.getElementById('opacityValue').textContent = settings.opacity || '1';
        document.getElementById('text-bg-color').value = settings.textBgColor || 'transparent';
        document.getElementById('caption-area-bg-color').value = settings.captionAreaBgColor || 'transparent';
        document.getElementById('caption-area-bg-opacity').value = settings.captionAreaBgOpacity || '1';
        document.getElementById('captionBgOpacityValue').textContent = settings.captionAreaBgOpacity || '1';
        document.getElementById('font-size').value = settings.fontSize || '200%';
        document.getElementById('text-border-style').value = settings.textBorderStyle || 'none';
        document.getElementById('text-font').value = settings.textFont || 'Trebuchet MS';
    });
});
