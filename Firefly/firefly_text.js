/* Get Canvas, Variations list and Prompt */
let canvas = document.querySelector('main > div > div > canvas[aria-label*="prompt" i]');
let variations = document.querySelectorAll('fieldset[aria-label*="variations" i] > div');
let prompt = document.querySelector('input[type="text"]');

/* Create the fake link */
let link = document.createElement('a');
link.href = canvas.toDataURL('image/png');

/* Get the selected variation */
let variationIndex = 1;
for (; variationIndex <= variations.length; variationIndex++) if (variations[variationIndex - 1].ariaChecked == "true") break;

/* Get the date */
let date = new Date();
let year = date.getFullYear();
let month = (date.getMonth() + 1).toString().padStart(2, '0');
let day = date.getDate().toString().padStart(2, '0');
let hour = date.getHours().toString().padStart(2, '0');
let minutes = date.getMinutes().toString().padStart(2, '0');
let formattedDate = `${year}${month}${day}${hour}${minutes}`;

/* Set the filename and download it */
link.download = `FireflyText_${prompt.value}_${formattedDate}_var${variationIndex}.png`;
link.click();