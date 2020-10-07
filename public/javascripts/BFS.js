const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function BFS (Board) {
  var toVisit = [Board.start], temp, node;
  while (toVisit) {
    node = toVisit.shift() 
    node.visited = true;
    if (node.wall === true){
     continue;
    }
    var n_arr = getNeighbours(node);
    for (temp of n_arr) {
       temp.prev = node;
       temp.visited = true;
       toVisit.push(temp);
    }
    await sleep(5);
    if (node != Board.start && node != Board.end){
     document.getElementById(node.row + "-" + node.col).classList.add("visited");
     //document.getElementById(node.row + "-" + node.col).style.backgroundColor="#82c7a5";
    }
    else if (node === Board.end) {
     BackToStart();
     break;
    }
  }
  function getNeighbours(node) {
    var n_arr = [];
    if (node.col + 1 < Board.col){
      if (Board.nodeArray[node.row][node.col+1].visited != true)
      n_arr.push(Board.nodeArray[node.row][node.col+1])
    }
    if ( node.row + 1 < Board.row ){
      if (Board.nodeArray[node.row+1][node.col].visited != true)  
      n_arr.push(Board.nodeArray[node.row+1][node.col])
    }
    if (node.row - 1 >= 0){
      if (Board.nodeArray[node.row-1][node.col].visited != true) 
      n_arr.push(Board.nodeArray[node.row-1][node.col])
    }
    if (node.col - 1 >= 0){
      if (Board.nodeArray[node.row][node.col-1].visited != true)  
      n_arr.push(Board.nodeArray[node.row][node.col-1])
    }
    return n_arr;
  }
  async function BackToStart() {
    var preds = [];
    temp = Board.end;
    while (temp) {
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


export default BFS;
