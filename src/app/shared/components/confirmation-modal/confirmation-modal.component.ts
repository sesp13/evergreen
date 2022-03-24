import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  // Set up properties
  @Input() title: string = '¿Estás seguro?';
  @Input() content: string = 'Esta decisión no puede revertirse';
  @Input() confirmationText: string = 'Confirmar';

  @Output() onConfirmation = new EventEmitter<boolean>();

  // Get modal body to use
  @ViewChild('confirmationModal') modal: any;

  constructor(private modalService: NgbModal) {}

  open() {
    this.modalService.open(this.modal, { ariaLabelledBy: 'modal-basic-title' });
  }

  confirm() {
    this.onConfirmation.emit(true);
    this.modalService.dismissAll();
  }
}
