import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  editing: boolean = false;
  @Input() index: number = -1;
  @Input() task: Task = {
    id: -1,
    title: '',
    completed: false
  }
  @Output() updateTasks: EventEmitter<any> = new EventEmitter();

  constructor(private taskSvc: TaskService) { }

  toggleTask() {
    this.taskSvc.completedTask(this.index);
  }

  removeTask() {
    this.taskSvc.removeTask(this.index);
    this.updateTasks.emit();
  }

  updateTitle() {
    this.taskSvc.editTaskTitle(this.index, this.task.title);
    this.editing = false;
  }

  cancelEdition() {
    this.editing = false;
  }

}
