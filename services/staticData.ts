
import { LearningPath } from "../types";

export const PREDEFINED_PATHS: Record<string, LearningPath> = {
  "React & Tailwind": {
    starterActivity: "Build a 'Personal Link Tree' page. It's the perfect way to learn Tailwind's utility classes and React's component structure without complex state logic.",
    executionPlan: [
      "Set up a new Vite + React project.",
      "Create a 'LinkCard' component that accepts 'label' and 'url' props.",
      "Use Tailwind's flexbox and hover utilities to style the cards.",
      "Map through an array of links to render the list."
    ],
    code: `import React from 'react';

const links = [
  { label: 'GitHub', url: 'https://github.com' },
  { label: 'Twitter', url: 'https://twitter.com' }
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center py-12 px-4">
      <div className="w-20 h-20 bg-indigo-500 rounded-full mb-4" />
      <h1 className="text-white text-xl font-bold mb-8">@yourhandle</h1>
      <div className="w-full max-w-md space-y-4">
        {links.map(link => (
          <a key={link.label} href={link.url} className="block w-full p-4 bg-white/10 hover:bg-white/20 text-white text-center rounded-xl transition-all border border-white/10">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}`,
    howToRun: "Paste this into your App.tsx. Ensure you have Tailwind CSS installed via 'npm install -D tailwindcss postcss autoprefixer'.",
    nextSteps: "Try adding a profile image or a dark/light mode toggle using Tailwind's 'dark:' modifier."
  },
  "Machine Learning": {
    starterActivity: "Create a 'Predictor' script that uses linear regression to guess the next number in a sequence. This bypasses deep theory and gets you working with data patterns immediately.",
    executionPlan: [
      "Install the 'brain.js' library.",
      "Define a training set of simple inputs (e.g., [1,2], [2,4], [3,6]).",
      "Train a simple neural network.",
      "Run a prediction for a new value."
    ],
    code: `// Run this in a Node environment or a simple HTML page with brain.js
const brain = require('brain.js');
const net = new brain.NeuralNetwork();

// Training: Input -> Output (e.g., multiplying by 2)
net.train([
  { input: [1], output: [0.2] },
  { input: [2], output: [0.4] },
  { input: [3], output: [0.6] }
]);

const output = net.run([4]); 
console.log(\`Result for 4 is: \${output * 10}\`); // Expected ~8`,
    howToRun: "Run 'npm install brain.js' in your terminal and execute the script with 'node index.js'.",
    nextSteps: "Experiment with non-linear patterns, like a network that detects if an RGB color is 'dark' or 'light'."
  },
  "Rust System Dev": {
    starterActivity: "Build a 'File Word Counter'. Rust excels at low-level file I/O, and this project teaches you about ownership and error handling with tangible results.",
    executionPlan: [
      "Initialize a new project with 'cargo init'.",
      "Use 'std::fs' to read a local text file.",
      "Split the string by whitespace to get an iterator of words.",
      "Print the '.count()' of that iterator."
    ],
    code: `use std::fs;

fn main() {
    let filename = "test.txt";
    let content = fs::read_to_string(filename)
        .expect("Could not read file");
    
    let word_count = content.split_whitespace().count();
    println!("The file '{}' contains {} words.", filename, word_count);
}`,
    howToRun: "Install Rust via rustup.rs. Create a file named 'test.txt' in your project root, then run 'cargo run'.",
    nextSteps: "Modify the code to count 'unique' words by using a HashMap."
  },
  "C# Game Design": {
    starterActivity: "Build a 'Space Shooter Movement' script. In game dev, seeing something move on screen is the best high. This covers Input handling and Transform manipulation.",
    executionPlan: [
      "Open Unity and create a 2D Sprite (the ship).",
      "Create a new C# script named 'PlayerMovement'.",
      "Use Input.GetAxis('Horizontal') to get keyboard input.",
      "Update the player's position every frame."
    ],
    code: `using UnityEngine;

public class PlayerMovement : MonoBehaviour {
    public float speed = 5f;

    void Update() {
        float moveX = Input.GetAxis("Horizontal");
        float moveY = Input.GetAxis("Vertical");

        Vector3 move = new Vector3(moveX, moveY, 0) * speed * Time.deltaTime;
        transform.position += move;
    }
}`,
    howToRun: "Attach this script to a GameObject in the Unity Editor. Press 'Play' and use WASD or Arrow keys.",
    nextSteps: "Add a 'Shoot' function using 'Instantiate' to spawn bullets when the Space key is pressed."
  },
  "Data Science": {
    starterActivity: "Analyze a 'Coffee Shop Sales' CSV. Data science is about extraction, not just calculation. You'll learn how to filter and group data using Python.",
    executionPlan: [
      "Install the 'pandas' library.",
      "Load a CSV file containing sales data.",
      "Group the data by 'Category'.",
      "Calculate the sum of 'Total_Price' for each category."
    ],
    code: `import pandas as pd

# Create a sample dataframe
data = {
    'Category': ['Coffee', 'Tea', 'Coffee', 'Pastry'],
    'Price': [5.0, 3.5, 4.5, 3.0]
}
df = pd.DataFrame(data)

# Calculate total revenue per category
revenue = df.groupby('Category')['Price'].sum()
print("Revenue by Category:")
print(revenue)`,
    howToRun: "Install Python, run 'pip install pandas', and execute the script using 'python analysis.py'.",
    nextSteps: "Try visualizing the result using 'matplotlib' to create a bar chart of the sales."
  }
};
