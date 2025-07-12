# Malawi Districts Graph Layout Optimizer

A small Node.js script that implements a custom, geographically-informed force-directed algorithm to optimize the layout of a graph representing the districts of Malawi.

## Table of Contents

- [Description](#description)  
- [Prerequisites](#prerequisites)  
- [Setup & Dependencies](#setup--dependencies)  
- [Usage](#usage)  
  - [Save the Code](#save-the-code)  
  - [Run the Script](#run-the-script)  
- [Expected Output](#expected-output)  
- [License](#license)  

---

## Description

This script takes a predefined set of **nodes** (Malawi’s districts with initial X/Y positions) and **edges** (connections between districts) and runs a physics-based simulation to rearrange the nodes. The goals are:

1. Connected districts end up close to one another.  
2. All districts are spaced out to avoid overlap.  
3. The overall geographic orientation of the map is preserved.  

When finished, the final optimized `(x, y)` coordinates for each district are printed to the console.

---

## Prerequisites

- **Node.js** (v12+) installed on your system.  
  Download & install from: https://nodejs.org/

---

## Setup & Dependencies

- This script is written in **plain JavaScript** and has **no external dependencies**.  
- No `npm install` is required—just make sure you have `node` on your PATH.

---

## Usage

### Save the Code

1. Copy the entire JavaScript source (including your `GraphOptimizer` class and `malawiGraphData` object) into a file named:

   ```bash
   optimize.js
