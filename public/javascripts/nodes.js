


function Per_node(row, col) {
  this.row = row;
  this.col = col;
  this.wall = false; //Default is False; True on wall on eventhandler
  this.visited = false; //
  this.start = false;
  this.end = false;
//  this.last_node = 0;
}

export default Per_node;
