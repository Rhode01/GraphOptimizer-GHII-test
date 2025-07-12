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

- **Node.js** (v12+) installed on your system.  
  Download & install from: https://nodejs.org/

---

## Setup & Dependencies

- This script is written in **plain JavaScript** and has **no external dependencies**.  
- No `npm install` is required—just make sure you have `node` on your PATH.

---


### Execute the Script: 
Run the script using Node.js with the following command:
```bash
    node optimize.js