var e = event.target.id;
e = e.split("-");
  var rid = e[0];
  var cid = e[1];
  var node = board.nodeArray[rid][cid];
  if ((node === board.start) || (node === board.end))
    return ;
  if (node.wall === true) {
    node.wall = false;
    document.getElementById("" + rid + "-" + cid).style.backgroundColor = "";
  }
  else {
    node.wall = true;
    document.getElementById("" + rid + "-" + cid).style.backgroundColor = "#34495e";
  }
