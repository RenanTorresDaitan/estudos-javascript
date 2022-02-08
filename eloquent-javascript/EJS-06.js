console.log("\nProject Robot\n");

const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];
// Builds a data structure to hold the places and roads.
function buildGraph(edges) {
  let graph = Object.create(null);
  // Function that adds each possible place connected to another
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  // For loop that maps each place on the variables from and to
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}
// Random choice from an array
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}
// Random direction from a state graph
function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}
// Adding a property to the constructor to randomly generate a new village state
VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph)); // Pick a random address to start
    let place;
    do {
      place = randomPick(Object.keys(roadGraph)); // Pick another address that isn't the first
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

// The Mail's truck route
const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];
// The robot that follows a route and remembers where it has been
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}
// Function that finds the shortest route
function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

console.log("\nExercises\n");
console.log("\nMeasuring a Robot\n");

/*It’s hard to objectively compare robots by just letting them 
solve a few scenarios. Maybe one robot just happened to get 
easier tasks or the kind of tasks that it is good at,
 whereas the other didn’t.

Write a function compareRobots that takes two robots 
(and their starting memory). 
It should generate 100 tasks and let each of the robots 
solve each of these tasks. When done, it should output 
the average number of steps each robot took per task.

For the sake of fairness, make sure you give each task to both
 robots, rather than generating different tasks per robot.*/

 function runLoggedRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
      if (state.parcels.length == 0) {
        return turn;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }

function compareRobots(robot1, memory1, robot2, memory2) {
    const results = [];
  for (let i = 0; i < 10; i++) {
    const task = new VillageState.random();
    const firstRobot = runLoggedRobot(task, robot1, memory1);
    const secondRobot = runLoggedRobot(task, robot2, memory2);
    results.push({task: i, robotA: firstRobot, robotB: secondRobot});
     }
     return results.forEach(item => console.log(item));
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
