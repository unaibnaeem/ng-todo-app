import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should add a todo', () => {
    service.addTodo('Test Task');
    expect(service.todos().length).toBe(1);
    expect(service.todos()[0].text).toBe('Test Task');
  });

  it('should toggle a todo', () => {
    service.addTodo('Toggle Me');
    const id = service.todos()[0].id;
    service.toggleTodo(id);
    expect(service.todos()[0].completed).toBe(true);
    service.toggleTodo(id);
    expect(service.todos()[0].completed).toBe(false);
  });

  it('should delete a todo', () => {
    service.addTodo('Delete Me');
    const id = service.todos()[0].id;
    service.deleteTodo(id);
    expect(service.todos().length).toBe(0);
  });

  it('should clear completed todos', () => {
    service.addTodo('Done');
    service.addTodo('Not Done');
    const id = service.todos()[0].id;
    service.toggleTodo(id);
    service.clearCompleted();
    expect(service.todos().length).toBe(1);
    expect(service.todos()[0].text).toBe('Not Done');
  });

  it('should toggle theme', () => {
    expect(service.theme()).toBe('light');
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
  });

  it('should persist to localStorage', () => {
    service.addTodo('Persistent Task');
    service.toggleTheme();

    TestBed.flushEffects();

    expect(localStorage.getItem('todo_app_theme')).toBe('dark');
    expect(localStorage.getItem('todo_app_todos')).toContain('Persistent Task');
  });
});
