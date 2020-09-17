import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface TaskDetails
{
    taskName : string;
    isFinished : boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tasks: TaskDetails[] = [];
  taskDetails : TaskDetails[] = [];
  taskForm: FormGroup;
  submitButtonName : string ;
  

  TodaysDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {

    this.taskForm = new FormGroup({
      taskName : new FormControl(null)
    });


    this.tasks = JSON.parse(localStorage.getItem(this.TodaysDate.toDateString()));

    if(this.tasks === null)
    {
        this.tasks = [];
    }
  

  }



  DelteTask(index)
  {
    this.tasks.splice(index, 1);
   
    localStorage.removeItem(this.TodaysDate.toDateString());
     localStorage.setItem(this.TodaysDate.toDateString(),JSON.stringify(this.tasks));
  }

  AddTask()
  {
    // tslint:disable-next-line:prefer-const
    let task : TaskDetails = { taskName : this.taskForm.value.taskName, isFinished: false };
  
    this.tasks.push(task);
   
     this.taskForm.controls.taskName.setValue('');
     localStorage.removeItem(this.TodaysDate.toDateString());
     localStorage.setItem(this.TodaysDate.toDateString(),JSON.stringify(this.tasks));
    
     
  }

  CheckOrUnCheck(index,event,task : TaskDetails)
  {
    this.taskDetails = [];
    this.taskDetails = JSON.parse(localStorage.getItem(this.TodaysDate.toDateString()));
        if(event.target.checked)
        {
         
           task.isFinished = true;

          if(this.taskDetails  != null)
          {           
          
            this.taskDetails[index].isFinished = true;
           
          }
        }
        else
        {
          task.isFinished = false;
          this.taskDetails[index].isFinished = false;
        }
        localStorage.removeItem(this.TodaysDate.toDateString());
        localStorage.setItem(this.TodaysDate.toDateString(),JSON.stringify(this.taskDetails));
    
  }

}
