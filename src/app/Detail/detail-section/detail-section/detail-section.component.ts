import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-detail-section',
  templateUrl: './detail-section.component.html',
  styleUrls: ['./detail-section.component.scss']
})
export class DetailSectionComponent implements OnInit {

  // Prendo in Input l'oggetto da mostrare e restituisco in output al padre l'evento del close
  @Input() userDetail: any;
  @Output() closeDetailEmit: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getShortName(fullName: string) {
    let sign: string;
    const nameSplit = fullName.split(' ').map((n: string) => n[0]).join('');
    sign = (nameSplit.length > 2) ? (nameSplit.substring(0, 2)) : nameSplit;
    return sign;
  }

  closeDetail() {
    this.closeDetailEmit.emit(true);
  }

}
