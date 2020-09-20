const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var edge_dist = 1;

var pq = [];


function min_pop()  {
  let check = Infinity;
  let min, pos;
//  console.log("this is inside", pq);
  for (let i = 0; i < pq.length; i++)  {
//    alert(pq[i].value);
    if (pq[i].value < check)  {
      pos = i;
      check = pq[pos].value;
    }
  }
  min = pq.splice(pos, 1);
//  console.log("removind", min, pos);
  return min[0];
}


async function Dijkstra(Board, value) {
//  var tr = bo;
//  var tc = 0;
// source = Board.start;

function get_neighbour(node)  {
  var n_ar = [];
//  console.log("this ?", node);
//  console.log(node.row);
  if (node.row + 1 < Board.row && Board.nodeArray[node.row + 1][node.col].visited != true)  {
    n_ar.push(Board.nodeArray[node.row + 1][node.col])
  }
  if (node.col + 1 < Board.col && Board.nodeArray[node.row][node.col + 1].visited != true)  {
    n_ar.push(Board.nodeArray[node.row][node.col + 1])
  }
  if (node.row - 1 >= 0 && Board.nodeArray[node.row - 1][node.col].visited != true) {
    n_ar.push(Board.nodeArray[node.row - 1][node.col])
  }
  if (node.col - 1 >= 0 && Board.nodeArray[node.row][node.col - 1].visited != true)  {
    n_ar.push(Board.nodeArray[node.row][node.col - 1])
  }
  return n_ar;
}

  var u, v;
  let destination = Board.end;
  let current_node = Board.start;
  var cont = true;
  Board.start.value = 0;
  pq.push(current_node);
  while (pq.length != 0 && cont)  {
    u = min_pop();
 //   console.log("this after popping", u);
   let n_arr = get_neighbour(u);
//    console.log("neighbour", n_arr);
    for (v of n_arr)  {
      await sleep(40);
      let alt = u.value + edge_dist;
      u.visited = true;
      if (alt < v.value && v != Board.end && v.wall == false)  {
          document.getElementById(v.row + "-" + v.col).style.backgroundColor="blue"
//        console.log(v.row, v.col, v.value, alt);
          v.value = alt;
          v.pred = u; // not sure
          pq.push(v);
//          console.log("pushed", v);
        }
      else if (v == Board.end){
        v.pred = u;
        back_to_start(v);
        cont = false;
      }
      }
    }

 async function back_to_start(node)  {
    var previous = [];
    var temp = node;
    do  {
      previous.push(temp);
      temp = temp.pred;
    } while (temp != Board.start)  

    while (previous.length != 0)  {
      temp = previous.pop()
      await sleep(40);
      document.getElementById(temp.row + "-" + temp.col).style.backgroundColor="yellow"
    }
  }
}

export default Dijkstra;
