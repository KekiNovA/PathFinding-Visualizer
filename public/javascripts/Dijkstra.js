
function Dijkstra (Board,node, value) {
  if(node.end != true) {
    document.getElementById("" + (node.row-1) + "-" + node.col).style.backgroundColor = "blue";

    document.getElementById("" + (node.row+1) + "-" + node.col).style.backgroundColor = "blue";

    document.getElementById("" + node.row + "-" + (node.col-1)).style.backgroundColor = "blue";

    document.getElementById("" + node.row + "-" + (node.col+1)).style.backgroundColor = "blue";
    Dijkstra (Board,Board.getNode(node.row-1,node.col), value+1);
    Dijkstra (Board,Board.getNode(node.row+1,node.col), value+1);
    Dijkstra (Board,Board.getNode(node.row,node.col-1), value+1);  
    Dijkstra (Board,Board.getNode(node.row,node.col+1), value+1);
  }
}
export default Dijkstra;
