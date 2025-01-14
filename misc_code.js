
function randTable() {
  for (k = 0; k < 6; k++) {
    for(i = 0; i < 3; i++) {
      for (j = 0 + 4*k; j < 3 + 4*k; j++) {
        if (k == 0)
        {
          if (Math.floor(Math.random() * 2) == 0) {
            document.getElementById("cell" + i + "x" + j).style.backgroundColor = "Black";
          } else {
            document.getElementById("cell" + i + "x" + j).style.backgroundColor = "White";
          }
        }
        else 
        {
          document.getElementById("cell" + i + "x" + j).style.backgroundColor = document.getElementById("cell" + i + "x" + (j - 4*k)).style.backgroundColor;
        }
      }
    }
  }
}