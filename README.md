# React Notes App

This Notes App is a React-based web application that allows users to manage their notes/to-do items, including adding, editing, deleting, tagging, and searching notes. The app also integrates OpenAI's capabilities for summarizing notes and generating new notes based on user-provided prompts. It utilizes React Context for state management and local storage to persist data.

## Features

- Notes Management: Users can add, view, edit, and delete their notes.
- Search and Filter: Search notes by text and filter by color.
- AI Integration:
  - Summarize existing notes.
  - Generate new notes based on a given prompt.
- Dark Mode: Toggle between dark and light modes.


## Setup & Installation

### 1. Clone the Repo
```sh
git clone https://github.com/CATT-CODE/react-notes-app.git
cd react-notes-app
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory with your OpenAI API Key:
```sh
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 4. Run the App
```sh
npm run dev
```

## Usage

### Add a New Note

    Navigate to add a note /add.
    Enter the title and content of the note.
    Optionally, enter a prompt and click "Generate Note" to create content based on the prompt.
    Click "Save" to add the note.

### Edit an Existing Note

    Click on a note from the main page to navigate to /:id.
    Edit the title and content of the note.
    Click "Summarize" to get a summarized version of the note content.
    Click "Save" to update the note.

### Search and Filter Notes

    Use the search bar on the main page to search notes by title or content.
    Use the color filter dropdown to filter notes by color.

### Toggle Dark Mode

    Use the dark mode toggle button in the header to switch between dark and light modes.