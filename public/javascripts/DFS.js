const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function DFS (Board) {
  var visiting = [Board.start], temp, node;
  getNeighbours(Board.start);
  while (visiting) {
    if (visiting.length >= 2) {
     node = visiting[1];
     if (node.wall) {
       continue;
     }
     else if (!node.visited) {
       if (node === Board.end) {
         BackToStart();
       }
       node.visited = true;
       await sleep(40);
       document.getElementById(node.row + "-" + node.col).classList.add("visited");
       getNeighbours(node);
      }
    }
    else
    visiting.pop();
  }







  function getNeighbours(node) {
    if (node.row - 1 >= 0){
      if (Board.nodeArray[node.row-1][node.col].visited != true) {
        Board.nodeArray[node.row-1][node.col].prev = node;
        visiting.push(Board.nodeArray[node.row-1][node.col])
      }
    }
    if (node.col + 1 < Board.col){
      if (Board.nodeArray[node.row][node.col+1].visited != true) {
        Board.nodeArray[node.row][node.col+1].prev = node;
        visiting.push(Board.nodeArray[node.row][node.col+1])
      }
    }
    if ( node.row + 1 < Board.row ){
      if (Board.nodeArray[node.row+1][node.col].visited != true) {
        Board.nodeArray[node.row+1][node.col].prev = node;
        visiting.push(Board.nodeArray[node.row+1][node.col])
      }
    }
    if (node.col - 1 >= 0){
      if (Board.nodeArray[node.row][node.col-1].visited != true) {
        Board.nodeArray[node.row][node.col-1].prv = node;
        visiting.push(Board.nodeArray[node.row][node.col-1])
      }
    }
  }
  async function BackToStart() {
    var preds = [];
    temp = Board.end;
    while (temp != Board.start) {
      preds.push(temp)
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








export default DFS;
