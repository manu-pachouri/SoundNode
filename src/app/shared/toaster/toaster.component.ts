import { ToasterService } from './../../services/toaster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {
  headerContent: string;
  bodyContent: string;
  show: boolean;
  constructor(public toasterService : ToasterService) { }

  ngOnInit(): void {
  }

}
