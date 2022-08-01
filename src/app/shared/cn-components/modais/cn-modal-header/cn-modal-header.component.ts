import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-modal-header',
  templateUrl: './cn-modal-header.component.html',
  styleUrls: ['./cn-modal-header.component.scss']
})
export class CnModalHeaderComponent implements OnInit {

  @Input() matDialogRef?: MatDialogRef<any>
  constructor() { }

  ngOnInit(): void {
  }

  fechar(): void {
    this.matDialogRef?.close();
  }
}
