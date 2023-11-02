import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

interface Task {
  id: number | string,
  title: string,
  completed: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

  tasks: Task[] = [
    {
      id: "1",
      title: "Test",
      completed: true
    }
  ]

  inputTask = new FormControl<string>('', {
    validators: [Validators.required],
    nonNullable: true
  });

  countTasks! : number

  constructor() { }

  ngOnInit(): void {
    this.countTasks = this.getTotalTasks()
  }

  addTask(event: any) {
    const id = this.tasks.length + 1
    const title = event.target.value
    const completed = true

    const newTask: Task = {
      id,
      title,
      completed
    }
    this.tasks.push(newTask)
    this.inputTask.setValue('')
  }

  checkTasks() {

  }

  getTotalTasks(){
    const taskCount = this.tasks.length
    if (taskCount === 0){
      return 0
    }
    return taskCount
  }

}
