/* Get Art list and prompt */
let art_list = document.querySelectorAll('main > div > div > div');
let prompt = document.querySelector('textarea[aria-label]');

/* Create the fake link */
let link = document.createElement('a');

/* Get the date */
let date = new Date();
let year = date.getFullYear();
let month = (date.getMonth() + 1).toString().padStart(2, '0');
let day = date.getDate().toString().padStart(2, '0');
let hour = date.getHours().toString().padStart(2, '0');
let minutes = date.getMinutes().toString().padStart(2, '0');
let formattedDate = `${year}${month}${day}${hour}${minutes}`;

/* Loop through the variants */
for (let i = 0; i < art_list.length; i++) {
    link.href = art_list[i].querySelector('img').src;

    /* Set the filename and download it */
    link.download = `FireflyArt_${prompt.value.replace(/\s/g, '-')}_${formattedDate}_var${i + 1}.png`;
    link.click();
}