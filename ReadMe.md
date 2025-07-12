# Malawi Districts Graph Layout Optimizer

This project contains a Node.js script that implements a custom, geographically-informed force-directed algorithm to optimize the layout of a graph representing the districts of Malawi.

## Table of Contents

- [Description](#description)  
- [Prerequisites](#prerequisites)  
- [Setup & Dependencies](#setup--dependencies)  
- [Usage](#usage)  
  - [Save the Code](#save-the-code)  
  - [Run the Script](#run-the-script)  
---

## Description

The script takes a predefined set of nodes (districts with initial X/Y positions) and edges (connections between districts) and runs a physics-based simulation to rearrange the nodes. 
The goal is to produce a visually clear layout where connected districts are close, all districts are spaced out to avoid overlap, and the overall geographic orientation of the map is preserved.

The final, optimized `(X, Y)` coordinates for each district are printed to the console.
---

## Prerequisites

- **Node.js** You must have Node.js installed on your system to run this script. You can download it from https://nodejs.org/
---

## Setup & Dependencies

- This script is written in **plain JavaScript** and has **no external dependencies**.  
- No `npm install` is required—just make sure you have `node` on your PATH.

---


### Execute the Script: 
Save the Code by Opening a Terminal or command prompt:
`git clone https://github.com/Rhode01/GraphOptimizer-GHII-test.git` 

Open a Terminal: Open your terminal or command prompt.

Navigate to the File: Use the cd command to navigate to the directory where you saved `GraphOptimizer-GHII-test/optimize.js.`
```bash
    node optimize.js