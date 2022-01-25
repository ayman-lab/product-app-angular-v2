import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {ActionEvent} from "../state/product.state";

@Injectable({providedIn:"root"})
export class EventDriveService{
  sourceIventSubject:Subject<ActionEvent>=new Subject<ActionEvent>();
  sourceIventSubjectObservable=this.sourceIventSubject.asObservable();

  public publishEvent(event:ActionEvent){
    this.sourceIventSubject.next(event);
  }
}
