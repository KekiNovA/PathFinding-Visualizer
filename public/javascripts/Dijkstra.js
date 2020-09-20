const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function Dijkstra (Board, start, value) {
  //some things....
  var visitedNodes = [];
  var node;
  visitedNodes.push(start);
  for (node of visitedNodes){
    //some end  conditions
    //and some logic
    node.visited = true;


    await sleep(40)
    getNeighbours(node);
    document.getElementById(node.row + "-" + node.col).style.backgroundColor="blue"
  }

  function getNeighbours(node) {
    //some walls condition
    if ( node.row+1 < Board.row ){
      if (Board.nodeArray[node.row+1][node.col].visited != true)
      visitedNodes.push(Board.nodeArray[node.row+1][node.col])
    }
    if (node.col+1 < Board.col){
      if (Board.nodeArray[node.row][node.col+1].visited != true)
    visitedNodes.push(Board.nodeArray[node.row][node.col+1])
    }
    if (node.row-1 >= 0){
      if (Board.nodeArray[node.row-1][node.col].visited != true)
    visitedNodes.push(Board.nodeArray[node.row-1][node.col])
    }
    if (node.col-1 >=0){
      if (Board.nodeArray[node.row][node.col-1].visited != true)
    visitedNodes.push(Board.nodeArray[node.row][node.col-1])
    }
  }
}
export default Dijkstra;
