const sleep = (milliseconds) => {

  return new Promise(resolve => setTimeout(resolve, milliseconds));

}
async function A_star (Board) {

  var toVisit = [Board.start], node, temp;
  function getDistance(node) {              //to get heuristic value

    return Math.sqrt( ( Board.end.row - node.row ) ** 2 + ( Board.end.col - node.col ) ** 2);

  }
  Board.start.fscore = getDistance(Board.start);
  Board.start.gscore = 0;
  function currentNode() {

    let node, temp, fscore = Infinity;
    for (temp of toVisit) {

      if (temp.fscore < fscore) {
        node = temp;
        fscore = temp.fscore;
      }

    }
    return node;

  }
  function removeNode(node) {

    let index = toVisit.indexOf(node);
    toVisit.splice(index,1);

  }
  while (toVisit) {

    try {
      node = currentNode();
      removeNode(node);
      if (node === Board.end) {
        BackToStart();
        break;
      }
      if (node.wall === true) {
        continue;
      }
      await sleep(5);
      document.getElementById(node.row + "-" + node.col).classList.add("visited");
      var n_arr = getNeighbours(node);
      for (temp of n_arr) {
        let tentg = node.gscore + 1;
        if (tentg < temp.gscore) {
          temp.prev = node;
          temp.gscore = tentg;
          temp.fscore = temp.gscore + getDistance(temp);
          if (!toVisit.find(e => e === temp)) {
            toVisit.push(temp);
          }
        }
      }
    }
    catch(error) {
      alert("Done Visualizing");
      Board.Visualizing = false;
      return;
		  //location.reload(true);
    }

  }
  function getNeighbours(node) {

    var n_arr = [];
    if ( node.row + 1 < Board.row) {
      n_arr.push(Board.nodeArray[node.row+1][node.col]);
    }
    if (node.col + 1 < Board.col) {
      n_arr.push(Board.nodeArray[node.row][node.col+1]);
    }
    if (node.row - 1 >= 0) {
      n_arr.push(Board.nodeArray[node.row-1][node.col]);
    }
    if (node.col - 1 >= 0) {
      n_arr.push(Board.nodeArray[node.row][node.col-1]);
    }
    return n_arr;

  }
  async function BackToStart() {

    Board.Visualizing = false;
    var preds = [];
    temp = Board.end;
    while (temp) {
      preds.push(temp);
      temp = temp.prev;
    }
    while (preds) {
      temp = preds.pop();
      await sleep(15);
      if(temp) {
        document.getElementById(temp.row + "-" + temp.col).classList.remove("visited");
        //document.getElementById(temp.row + "-" + temp.col).classList.add("path");
        document.getElementById(temp.row + "-" + temp.col).style.backgroundColor = "#ffff00";
      }
    }
  }

}



export default A_star;
