# 🌳 EZ Tree View

A dynamic, recursive Tree View component built with **React** and **Tailwind CSS**. This project features a fully functional file explorer structure with CRUD operations and Drag-and-Drop capabilities without using heavy external libraries.

## 🚀 Features

- **Recursive Rendering:** Handles infinite nesting of folders and files.
- **CRUD Operations:**
  - ➕ **Add:** Create new child nodes dynamically.
  - ✏️ **Edit:** Rename nodes inline.
  - 🗑️ **Delete:** Remove nodes (and their sub-children) recursively.
- **👆 Drag & Drop:** Reorder items or move files into different folders using native HTML5 DnD API (No external libraries used).
- **📂 Expand/Collapse:** Smooth toggle for folder visibility.
- **🎨 Modern UI:** Clean interface designed with Tailwind CSS and Lucide React icons.
- **Visual Feedback:** Highlight effects on hover and drag-over states.

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide-React
- **State Management:** React `useState` (Local State)

## ⚙️ Installation & Running

Follow these steps to run the project locally:

1.  **Clone the repository** (or unzip the folder):

    ```bash
    git clone <your-repo-link-here>
    cd tree-view-project
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

    _Note: This project requires `lucide-react` for icons._

3.  **Start the Server:**

    ```bash
    npm run dev
    ```
