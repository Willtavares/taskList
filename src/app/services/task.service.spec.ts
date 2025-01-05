import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize tasks from localStorage', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];
    localStorage.setItem('tasks', JSON.stringify(mockTasks));

    const newService = TestBed.inject(TaskService);
    expect(newService.getTasks()).toEqual(mockTasks);
  });

  it('should add a new task', () => {
    service.addTask('New Task');
    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('New Task');
    expect(tasks[0].completed).toBeFalse();
  });

  it('should toggle task completion', () => {
    service.addTask('Test Task');
    const task = service.getTasks()[0];
    service.toggleTaskCompletion(task.id);
    expect(service.getTasks()[0].completed).toBeTrue();
    service.toggleTaskCompletion(task.id);
    expect(service.getTasks()[0].completed).toBeFalse();
  });

  it('should delete a task', () => {
    service.addTask('Task to Delete');
    const taskId = service.getTasks()[0].id;
    service.deleteTask(taskId);
    expect(service.getTasks().length).toBe(0);
  });

  it('should save tasks to localStorage', () => {
    service.addTask('Task 1');
    service.addTask('Task 2');
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    expect(savedTasks.length).toBe(2);
    expect(savedTasks[0].title).toBe('Task 1');
    expect(savedTasks[1].title).toBe('Task 2');
  });
});
