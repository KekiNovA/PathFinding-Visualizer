


function Per_node(row, col) {
  this.row = row;
  this.col = col;
  this.wall = false;       //Default is False; True on wall on ActionListeners
  this.visited = false;   //For future references
  this.start = false;
  this.end = false;
  this.value = Infinity;
//  this.last_node = 0;
}

export default Per_node;
