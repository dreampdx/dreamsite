
var tag = document.getElementById('profile_pic'); //find the widget on the page

var profile_n = 2; //number of profile pics available

var texts = [
  'Wruff arf bark wruff awroooo!!!!!!',
  'uwu i hope ur having a lovely day',
  'arm trans women :3',
  'terfs get fucked',
  'i love you!!! its true awruff!!!!',
  '<3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <# <3',
  'ACAB! DIY Hormones! Disobey Authority!',
  'hehehehehe yissssssssssss',
];

var randomText = texts[Math.floor(Math.random() * texts.length)];

var randomIndex = Math.floor(Math.random() * profile_n);

//this is the code that displays the widget - EDIT THIS if you want to change the structure
tag.insertAdjacentHTML('afterbegin', `
<img class='profile_pic' src=stuff/pic_${randomIndex}.png>
<span class="tooltiptext">${randomText}</span>
`);

