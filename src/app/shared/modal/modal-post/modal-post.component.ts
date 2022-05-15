import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss']
})
export class ModalPostComponent implements OnInit {
  @Input() userComplete: any;

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
