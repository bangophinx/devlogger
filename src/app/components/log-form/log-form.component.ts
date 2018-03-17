import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Ilog } from '../../models/ilog';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;
  isNew: boolean = true;

  constructor(private logServices: LogService) { }

  ngOnInit() {
    this.logServices.selectedLog.subscribe(log => {
      if (log.id !== null) {
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
        this.isNew = false;
      }
    });
  }

  onSubmit() {
    console.log(this.isNew);
    if (this.isNew) {
      const newLog = {
        id: this.generateUUID(),
        text: this.text,
        date: new Date()
      }
      this.logServices.addLog(newLog);
      this.text = "";
    } else {
      const updatedLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      this.logServices.updateLog(updatedLog);
    }

    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = "";
    this.date = '';
  }


  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }




}
