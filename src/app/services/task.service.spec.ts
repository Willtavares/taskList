import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);

    // Limpa o localStorage antes de cada teste
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve inicializar as tarefas do localStorage', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];
    localStorage.setItem('tasks', JSON.stringify(mockTasks));

    const newService = new TaskService();
    expect(newService.getTasks()).toEqual(mockTasks);
  });

  it('deve retornar a lista de tarefas', () => {
    expect(service.getTasks()).toEqual([]);

    service.addTask('Nova tarefa');
    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Nova tarefa');
  });

  it('deve adicionar uma tarefa', () => {
    service.addTask('Tarefa de teste');
    const tasks = service.getTasks();

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Tarefa de teste');
    expect(tasks[0].completed).toBeFalse();
  });

  it('deve alternar o estado de conclusão de uma tarefa', () => {
    service.addTask('Tarefa para completar');
    const task = service.getTasks()[0];

    service.toggleTaskCompletion(task.id);
    expect(task.completed).toBeTrue();

    service.toggleTaskCompletion(task.id);
    expect(task.completed).toBeFalse();
  });

  it('deve excluir uma tarefa', () => {
    service.addTask('Tarefa a ser excluída');
    const task = service.getTasks()[0];

    service.deleteTask(task.id);
    const tasks = service.getTasks();

    expect(tasks.length).toBe(0);
  });

  it('deve salvar tarefas no localStorage ao adicionar, alternar ou excluir', () => {
    spyOn(localStorage, 'setItem');

    service.addTask('Teste de salvar');
    expect(localStorage.setItem).toHaveBeenCalled();

    const task = service.getTasks()[0];
    service.toggleTaskCompletion(task.id);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);

    service.deleteTask(task.id);
    expect(localStorage.setItem).toHaveBeenCalledTimes(3);
  });
});
