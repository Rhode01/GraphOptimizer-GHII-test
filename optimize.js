/**
 * @typedef {Object} GraphData
 * @property {Array<{id: string, x: number, y: number}>} nodes
 * @property {Array<[string, string]>} edges
 */
class GraphOptimizer {
  /**
   * @param {GraphData} data 
   */
  constructor(data) {
    this.nodes = JSON.parse(JSON.stringify(data.nodes));
    this.edges = JSON.parse(JSON.stringify(data.edges));

    this.anchorPositions = new Map();
    this.nodes.forEach(node => {
      this.anchorPositions.set(node.id, { x: node.x, y: node.y });
    });

    this.nodeMap = new Map(this.nodes.map(node => [node.id, node]));
    
    this.nodes.forEach(node => {
        node.vx = 0; 
        node.vy = 0; 
    });
  }

  /**
   * @param {number} iterations 
   * @param {Object} params 
   * @param {number} params.attraction 
   * @param {number} params.repulsion 
   * @param {number} params.gravity 
   * @param {number} params.damping 
   */
  runLayout(iterations = 200, params = { attraction: 0.005, repulsion: 0.05, gravity: 0.01, damping: 0.95 }) {
    console.log("Starting layout optimization...");
    console.log("Initial Parameters:", params);

    for (let i = 0; i < iterations; i++) {
      this.applyForces(params);
      this.updatePositions(params.damping);
      this.clampPositions();
      
      if ((i + 1) % 50 === 0) {
        console.log(`...Iteration ${i + 1}/${iterations} complete.`);
      }
    }
    
    console.log("Optimization finished.");
    return this.getFinalPositions();
  }

  /**
   * @private
   */
  applyForces(params) {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeA = this.nodes[i];
        const nodeB = this.nodes[j];
        
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1e-6;
        
        const force = params.repulsion / (distance * distance);
        
        nodeA.vx -= (dx / distance) * force;
        nodeA.vy -= (dy / distance) * force;
        nodeB.vx += (dx / distance) * force;
        nodeB.vy += (dy / distance) * force;
      }
    }
    
    for (const edge of this.edges) {
      const nodeA = this.nodeMap.get(edge[0]);
      const nodeB = this.nodeMap.get(edge[1]);
      
      if (!nodeA || !nodeB) continue;

      const dx = nodeB.x - nodeA.x;
      const dy = nodeB.y - nodeA.y;
      
      const force = params.attraction * (dx * dx + dy * dy);

      nodeA.vx += dx * params.attraction;
      nodeA.vy += dy * params.attraction;
      nodeB.vx -= dx * params.attraction;
      nodeB.vy -= dy * params.attraction;
    }
    
    for (const node of this.nodes) {
        const anchor = this.anchorPositions.get(node.id);
        const dx = anchor.x - node.x;
        const dy = anchor.y - node.y;

        node.vx += dx * params.gravity;
        node.vy += dy * params.gravity;
    }
  }

  /**
   * Updates node positions based on their current velocity.
   * @private
   */
  updatePositions(damping) {
    for (const node of this.nodes) {
        node.vx *= damping;
        node.vy *= damping;
        
        node.x += node.vx;
        node.y += node.vy;
    }
  }

  /**
   * @private
   */
  clampPositions() {
    for (const node of this.nodes) {
      node.x = Math.max(0, Math.min(1, node.x));
      node.y = Math.max(0, Math.min(1, node.y));
    }
  }

  /**
   * @returns {Array<{id: string, x: number, y: number}>}
   */
  getFinalPositions() {
    return this.nodes.map(({ id, x, y }) => ({ id, x, y }));
  }
}

const malawiGraphData = {
  "nodes": [
    { "id": "Blantyre", "x": 0.913, "y": 0.254 }, { "id": "Chikwawa", "x": 0.143, "y": 0.391 },
    { "id": "Chiradzulu", "x": 0.935, "y": 0.502 }, { "id": "Chitipa", "x": 0.503, "y": 0.637 },
    { "id": "Dedza", "x": 0.326, "y": 0.327 }, { "id": "Dowa", "x": 0.448, "y": 0.353 },
    { "id": "Karonga", "x": 0.771, "y": 0.716 }, { "id": "Kasungu", "x": 0.948, "y": 0.037 },
    { "id": "Lilongwe", "x": 0.031, "y": 0.079 }, { "id": "Machinga", "x": 0.497, "y": 0.159 },
    { "id": "Mangochi", "x": 0.241, "y": 0.221 }, { "id": "Mchinji", "x": 0.802, "y": 0.417 },
    { "id": "Mulanje", "x": 0.699, "y": 0.730 }, { "id": "Mwanza", "x": 0.309, "y": 0.914 },
    { "id": "Mzimba", "x": 0.161, "y": 0.835 }, { "id": "Neno", "x": 0.986, "y": 0.351 },
    { "id": "Nkhata Bay", "x": 0.088, "y": 0.186 }, { "id": "Nkhotakota", "x": 0.174, "y": 0.001 },
    { "id": "Nsanje", "x": 0.809, "y": 0.507 }, { "id": "Ntcheu", "x": 0.858, "y": 0.416 },
    { "id": "Ntchisi", "x": 0.396, "y": 0.998 }, { "id": "Phalombe", "x": 0.934, "y": 0.732 },
    { "id": "Rumphi", "x": 0.243, "y": 0.038 }, { "id": "Salima", "x": 0.837, "y": 0.996 },
    { "id": "Thyolo", "x": 0.627, "y": 0.768 }, { "id": "Zomba", "x": 0.725, "y": 0.810 },
    { "id": "Balaka", "x": 0.159, "y": 0.569 }, { "id": "Likoma", "x": 0.348, "y": 0.625 }
  ],
  "edges": [
    ["Blantyre", "Chikwawa"], ["Blantyre", "Chiradzulu"], ["Blantyre", "Thyolo"],
    ["Chikwawa", "Nsanje"], ["Chikwawa", "Mwanza"], ["Chiradzulu", "Zomba"],
    ["Chiradzulu", "Phalombe"], ["Chitipa", "Karonga"], ["Dedza", "Lilongwe"],
    ["Dedza", "Ntcheu"], ["Dowa", "Lilongwe"], ["Dowa", "Ntchisi"],
    ["Karonga", "Rumphi"], ["Kasungu", "Lilongwe"], ["Kasungu", "Mzimba"],
    ["Lilongwe", "Mchinji"], ["Lilongwe", "Salima"], ["Machinga", "Zomba"],
    ["Machinga", "Balaka"], ["Mangochi", "Balaka"], ["Mangochi", "Salima"],
    ["Mulanje", "Phalombe"], ["Mulanje", "Thyolo"], ["Mwanza", "Neno"],
    ["Mzimba", "Nkhata Bay"], ["Mzimba", "Rumphi"], ["Nkhata Bay", "Nkhotakota"],
    ["Nkhotakota", "Salima"], ["Nsanje", "Chikwawa"], ["Ntcheu", "Balaka"],
    ["Ntchisi", "Nkhotakota"], ["Phalombe", "Mulanje"], ["Salima", "Nkhotakota"],
    ["Zomba", "Machinga"]
  ]
};

const optimizer = new GraphOptimizer(malawiGraphData);
const finalPositions = optimizer.runLayout(300, {
    attraction: 0.002,
    repulsion: 0.06,
    gravity: 0.015,
    damping: 0.95
});
console.log(JSON.stringify(finalPositions, null, 2));