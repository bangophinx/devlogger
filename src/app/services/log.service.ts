import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ilog } from '../models/ilog';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { of } from "rxjs/observable/of";

@Injectable()
export class LogService {
  logsUrl: string = "../assets/data/logs.json";

  private logSource = new BehaviorSubject<Ilog>({ id: null, text: null, date: null });

  selectedLog = this.logSource.asObservable();

  // logs: Ilog[];
  sLogs: Ilog[] = [
    { id: '3', text: 'Service Log', date: new Date() }
  ]

  constructor(private http: HttpClient) { }

  getLogs(): Observable<Ilog[]> {
    return this.http.get<Ilog[]>(this.logsUrl);
  }

  getSLogs(): Observable<Ilog[]> {
    return of(this.sLogs);
  }

  setFormLog(log: Ilog) {
    this.logSource.next(log);
  }

  addLog(log: Ilog) {
    this.sLogs.unshift(log);
  }

  updateLog(log: Ilog) {
    this.sLogs.forEach((element, i) => {
      if (element.id === log.id) {
        this.sLogs.splice(i, 1);
        this.sLogs.unshift(log);
      }
    });
  }

  delete(log: Ilog) {
    this.sLogs.forEach((element, i) => {
      if (element.id === log.id) {
        this.sLogs.splice(i, 1);
      }
    });
  }


}
