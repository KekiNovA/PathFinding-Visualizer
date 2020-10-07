const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function Dijkstra (Board) {
  //some things....
  var visitedNodes = [], temp,tempval,node;
  function minNode() {
    let nodes,t, value = Infinity;
    for (t of visitedNodes) {
      if (t.value < value){
        nodes = t;
        value = t.value
      }
    }
    return nodes;
  }
  function removeNode(node) {
    let index = visitedNodes.indexOf(node);
    visitedNodes.splice(index,1);
  }
  for (var i = 0; i < Board.row; i++) {
    for (var j = 0; j < Board.col; j++){
      visitedNodes.push(Board.nodeArray[i][j]);
    }
  }

  while (visitedNodes) {
    try {
      node = minNode();
      node.visited = true;
      removeNode(node);
      if (node.wall === true){
        continue;
      }
      var n_arr = getNeighbours(node);
      for (temp of n_arr) {
        tempval = node.value + 1;
        if (tempval < temp.value) {
          temp.value = tempval;
          temp.prev = node
        }
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
    catch(error)
    {
      alert("Done Visualizing")
      return;
		  //location.reload(true);
    }
  }

  function getNeighbours(node) {
    var n_arr = [];
    if ( node.row + 1 < Board.row ){
      if (Board.nodeArray[node.row+1][node.col].visited != true)
      n_arr.push(Board.nodeArray[node.row+1][node.col])
    }
    if (node.col + 1 < Board.col){
      if (Board.nodeArray[node.row][node.col+1].visited != true)
      n_arr.push(Board.nodeArray[node.row][node.col+1])
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
    while (preds){
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







export default Dijkstra;
