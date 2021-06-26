import { Injectable, TemplateRef } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  toasters : {header: string, content: string, show: true}[] = [];
  constructor() { }

  show(header: string, content: string){
    this.toasters.push({
      content: content,
      header: header,
      show: true
    });
  }
}
