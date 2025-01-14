
var tag = document.getElementById('art_gallery'); //find the widget on the page

var image_n = 16; //number of profile pics available

var text = "";

for (var i = 1; i < image_n; i++)
{
  text += "<div class=\"box\" style=\"background: url('Images/" + i + ".png');\"></div>"
}

//this is the code that displays the widget - EDIT THIS if you want to change the structure
tag.insertAdjacentHTML('afterbegin', `
${text}
`);

