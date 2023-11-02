import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

  taskTitle: string = '';
  tasks: Array<Task> = [];
  currentRoute: string = '';
  sub;

  constructor(
    private route: ActivatedRoute,
    private taskSvc: TaskService) {
    this.tasks = this.taskSvc.getTasks();
    this.sub = this.route.url.subscribe(url => {
      console.log("y entonces: ", url);
      if (url.length === 0) {
        this.currentRoute = 'all';
        console.log(this.currentRoute);
      } else {
        this.currentRoute = url[0].path;
      }
      // console.log(url);
      // this.currentRoute = url[0].path;
      console.log(this.currentRoute);
      this.filterTasks(this.currentRoute);
    });
  }

  ngOnInit(): void { }

  addNewTask() {
    this.taskSvc.addTask(this.taskTitle);
    this.taskTitle = '';
  }

  getPending() {
    return this.taskSvc.pending;
  }

  getCompleted() {
    return this.taskSvc.completed;
  }

  getTotal() {
    return this.taskSvc.getTasks().length;
  }

  eraseCompleted() {
    this.taskSvc.eraseCompleted();
    this.filterTasks(this.currentRoute);
  }

  updateTasks() {
    this.filterTasks(this.currentRoute);
  }

  filterTasks(filter: string) {
    switch (filter) {
      case 'all':
        this.tasks = this.taskSvc.getTasks();
        break;
      case 'pending':
        this.tasks = this.taskSvc.getTasks().filter(task => !task.completed);
        console.log("estoy en peding", this.tasks);
        break;
      case 'completed':
        this.tasks = this.taskSvc.getTasks().filter(task => task.completed);
        break;
      default:
        this.tasks = this.taskSvc.getTasks();
        break;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
