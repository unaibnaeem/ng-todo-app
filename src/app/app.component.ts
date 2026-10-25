import { Component, effect, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private todoService = inject(TodoService);

  todos = this.todoService.todos;
  theme = this.todoService.theme;

  remainingCount = computed(
    () => this.todos().filter((t) => !t.completed).length,
  );

  todoInput = signal('');

  constructor() {
    effect(() => {
      const isDark = this.theme() === 'dark';
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleTheme() {
    this.todoService.toggleTheme();
  }

  addTodo() {
    const text = this.todoInput().trim();
    if (text) {
      this.todoService.addTodo(text);
      this.todoInput.set('');
    }
  }

  toggleTodo(id: string) {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }
}
