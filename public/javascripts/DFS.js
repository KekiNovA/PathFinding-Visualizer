const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function DFS (Board) {

  var visiting = [];
  visiting.push(Board.start);
  while (visiting.length > 0)  {            //start of actual DFS algo

    try {
      let tempNode = visiting.pop();
      if (tempNode === Board.end)  {
        BackToStart(tempNode);
        return ;
      }
      else if (!tempNode.visited && !tempNode.wall)  {
        await sleep(5);
        document.getElementById(tempNode.row + "-" + tempNode.col).classList.add("visited");
        tempNode.visited = true;
        let neighbours = getNeighbours(tempNode);
        for (let i of neighbours)  {
          i.prev = tempNode;
          visiting.push(i);    
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
  alert("Done Visualizing");
  Board.Visualizing = false;
  function getNeighbours(node) {

    var n_arr = [];
    if (node.col - 1 >= 0) {
      if (Board.nodeArray[node.row][node.col-1].visited != true) 
        n_arr.push(Board.nodeArray[node.row][node.col-1]);
    }
    if ( node.row + 1 < Board.row ) {
      if (Board.nodeArray[node.row+1][node.col].visited != true) 
        n_arr.push(Board.nodeArray[node.row+1][node.col]);
    }
    if (node.col + 1 < Board.col) {
      if (Board.nodeArray[node.row][node.col+1].visited != true) 
        n_arr.push(Board.nodeArray[node.row][node.col+1]);
    }
    if (node.row - 1 >= 0) {
      if (Board.nodeArray[node.row-1][node.col].visited != true) 
        n_arr.push(Board.nodeArray[node.row-1][node.col]);    
    }
    return n_arr;

  }
  async function BackToStart(end_node) {

    Board.Visualizing = false;
    var preds = [];
    let temp = end_node;
    while (temp) {
      preds.push(temp);
      temp = temp.prev;
    }
    while (preds) {
      temp = preds.pop();
      await sleep(15);
      if (temp) {
        document.getElementById(temp.row + "-" + temp.col).classList.remove("visited");
        //document.getElementById(temp.row + "-" + temp.col).classList.add("path");
        document.getElementById(temp.row + "-" + temp.col).style.backgroundColor = "#ffff00";
      }
    }

  }

}


export default DFS;
