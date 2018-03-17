import { Component, OnInit } from '@angular/core';
import { Ilog } from '../../models/ilog';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Ilog[];
  sLogs: Ilog[];
  allLogs: Ilog[];

  constructor(private logServices: LogService) { }

  ngOnInit() {
    this.logServices.getLogs().subscribe(logs =>
      this.logs = logs);

    this.logServices.getSLogs().subscribe(sLogs =>
      this.sLogs = sLogs);
  }

  onSelect(log: Ilog) {
    this.logServices.setFormLog(log);
  }

  onDelete(log: Ilog) {
    if (confirm("Are you Sure You Want to Delete?")) {
      this.logServices.delete(log);
    }
  }

}
