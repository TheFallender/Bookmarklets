    /* Get Canvas and Variations list */
    let canvas = document.querySelector('main > div > div > canvas[aria-label*="prompt" i]');
    let variations = document.querySelectorAll('fieldset[aria-label*="variations" i] > div');

    /* Create the fake link */
    let link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');

    /* Get the selected variation */
    let variationIndex = 1;
    for (; variationIndex <= variations.length; variationIndex++) if (variations[variationIndex - 1].ariaChecked == "true") break;

    /* Set the filename and download it */
    link.download = `firefly_text_${canvas.id}_${variationIndex}.png`;
    link.click();