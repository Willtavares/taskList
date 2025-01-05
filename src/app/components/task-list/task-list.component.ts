import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgForOf } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    NgForOf,
    ReactiveFormsModule,
    NoopAnimationsModule,
  ],
  providers: [CommonModule],
})
export class TaskListComponent {
  taskForm: FormGroup;
  tasks = this.taskService.getTasks();

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      newTask: ['', Validators.required],
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTaskValue = this.taskForm.get('newTask')?.value.trim();
      if (newTaskValue) {
        this.taskService.addTask(newTaskValue);
        this.taskForm.reset();
        this.tasks = this.taskService.getTasks();
      }
    }
  }

  toggleCompletion(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.tasks = this.taskService.getTasks();
  }
}
