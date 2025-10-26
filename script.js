// Note App with localStorage CRUD, smooth scrolling, and animations

// Typing animation for header
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing animation on page load
window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('h1');
  if (header) {
    const originalText = header.textContent;
    typeWriter(header, originalText, 80);
  }
});

// Smooth scrolling for all anchor links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Animated element transitions on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.note-item').forEach(note => {
    observer.observe(note);
  });
});

// Note App - localStorage CRUD operations
class NoteApp {
  constructor() {
    this.notes = this.loadNotes();
    this.currentEditId = null;
    this.init();
  }

  init() {
    // Get DOM elements
    this.noteForm = document.getElementById('note-form');
    this.noteInput = document.getElementById('note-input');
    this.notesContainer = document.getElementById('notes-container');
    this.submitBtn = document.getElementById('submit-btn');

    // Event listeners
    if (this.noteForm) {
      this.noteForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Initial render
    this.render();
  }

  loadNotes() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  handleSubmit(e) {
    e.preventDefault();
    const content = this.noteInput.value.trim();

    if (!content) return;

    if (this.currentEditId) {
      // Update existing note
      this.updateNote(this.currentEditId, content);
      this.currentEditId = null;
      this.submitBtn.textContent = 'Add Note';
    } else {
      // Create new note
      this.createNote(content);
    }

    this.noteInput.value = '';
    this.render();
  }

  createNote(content) {
    const note = {
      id: this.generateId(),
      content: content,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toLocaleString()
    };
    this.notes.unshift(note);
    this.saveNotes();
  }

  updateNote(id, content) {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      this.notes[noteIndex].content = content;
      this.notes[noteIndex].updatedAt = new Date().toLocaleString();
      this.saveNotes();
    }
  }

  deleteNote(id) {
    this.notes = this.notes.filter(note => note.id !== id);
    this.saveNotes();
    this.render();
  }

  editNote(id) {
    const note = this.notes.find(note => note.id === id);
    if (note) {
      this.noteInput.value = note.content;
      this.currentEditId = id;
      this.submitBtn.textContent = 'Update Note';
      this.noteInput.focus();
      this.noteInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  render() {
    if (!this.notesContainer) return;

    if (this.notes.length === 0) {
      this.notesContainer.innerHTML = '<p class="empty-state">No notes yet. Create your first note above!</p>';
      return;
    }

    this.notesContainer.innerHTML = this.notes.map(note => `
      <div class="note-item" data-id="${note.id}">
        <div class="note-content">${this.escapeHtml(note.content)}</div>
        <div class="note-meta">
          <span class="note-date">${note.updatedAt || note.createdAt}</span>
        </div>
        <div class="note-actions">
          <button class="btn-edit" onclick="noteApp.editNote('${note.id}')">Edit</button>
          <button class="btn-delete" onclick="noteApp.deleteNote('${note.id}')">Delete</button>
        </div>
      </div>
    `).join('');

    // Observe new note items for scroll animations
    document.querySelectorAll('.note-item').forEach(note => {
      observer.observe(note);
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the app when DOM is ready
let noteApp;
window.addEventListener('DOMContentLoaded', () => {
  noteApp = new NoteApp();
});

// Additional smooth scroll behavior for the entire page
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.scrollBehavior = 'smooth';
});

// Keyboard shortcut: Ctrl/Cmd + K to focus on note input
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const noteInput = document.getElementById('note-input');
    if (noteInput) {
      noteInput.focus();
    }
  }
});
