import { Injectable, signal, effect } from '@angular/core';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = signal<Todo[]>([]);
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    this.load();

    effect(
      () => {
        localStorage.setItem('todo_app_todos', JSON.stringify(this.todos()));
      },
      { allowSignalWrites: true },
    );

    effect(
      () => {
        localStorage.setItem('todo_app_theme', this.theme());
      },
      { allowSignalWrites: true },
    );
  }

  private load() {
    const savedTodos = localStorage.getItem('todo_app_todos');
    const savedTheme = localStorage.getItem('todo_app_theme');

    if (savedTodos) {
      this.todos.set(JSON.parse(savedTodos));
    }
    if (savedTheme) {
      this.theme.set(savedTheme as 'light' | 'dark');
    }
  }

  addTodo(text: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    this.todos.update((todos) => [...todos, newTodo]);
  }

  toggleTodo(id: string) {
    this.todos.update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  deleteTodo(id: string) {
    this.todos.update((todos) => todos.filter((t) => t.id !== id));
  }

  clearCompleted() {
    this.todos.update((todos) => todos.filter((t) => !t.completed));
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
}
