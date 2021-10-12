import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/modules/project.module';

@Component({
  selector: 'app-comfirm-delete',
  templateUrl: './comfirm-delete.component.html',
  styleUrls: ['./comfirm-delete.component.scss']
})
export class ComfirmDeleteComponent {
  @Input() data:Project={}as Project;

  constructor(public modal: NgbActiveModal) {
}


  
  ancegl(){

}
}
