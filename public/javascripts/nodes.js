


function Per_node(row, col) {
  this.row = row;
  this.col = col;
  this.wall = false;       //Default is False; True on wall on ActionListeners
  this.visited = false;   //For Dijkstra
  this.value = Infinity;  //For Dijkstra
  this.prev;              //To keep track
}

export default Per_node;
