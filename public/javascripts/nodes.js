
function Per_node(row, col) {

  this.row = row;
  this.col = col;
  this.wall = false;       //Default is False; True on wall on ActionListeners
  this.visited = false;   //For Dijkstra
  this.value = Infinity;  //For Dijkstra && A_star
  this.prev;              //To keep track
  this.fscore = Infinity;            //For A_star
  this.gscore = Infinity;            //For A_star
  
}

export default Per_node;
