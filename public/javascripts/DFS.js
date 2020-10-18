const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function DFS (Board) {
  var stack = [];

  stack.push(Board.start);

  while (stack.length > 0)  {

    let v = stack.pop();

    if (v === Board.end)  {
      BackToStart(v);
      return ;
    }

    else if (!v.visited && !v.wall)  {

      await sleep(5);

      document.getElementById(v.row + "-" + v.col).classList.add("visited");

      v.visited = true;

      let neighbours = getNeighbours(v);

      for (let i of neighbours)  {

          i.prev = v;

          stack.push(i);
        
      }

    }

  }


  function getNeighbours(node) {
    var n_arr = [];
    if (node.col - 1 >= 0){
      if (Board.nodeArray[node.row][node.col-1].visited != true)
      n_arr.push(Board.nodeArray[node.row][node.col-1])
    }
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
    return n_arr;
  }

  async function BackToStart(end_node) {
    var preds = [];
    let temp = end_node;
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





export default DFS;
