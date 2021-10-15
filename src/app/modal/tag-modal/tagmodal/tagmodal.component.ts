import { ListService } from '@abp/ng.core';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TagService } from '@proxy/tags';

@Component({
    selector: 'app-tagmodal',
    templateUrl: './tagmodal.component.html',
    styleUrls: ['./tagmodal.component.scss'],
    providers: [ListService],

})
export class TagmodalComponent {
    form: FormGroup = new FormGroup({
        Name: new FormControl('', [Validators.required]),
    });
    
    get Name() {
        return this.form.get('Name');
    }

    constructor(
        public activeModal: NgbActiveModal,
        public readonly list: ListService,
        private confirmation: ConfirmationService,
        private Tagservice: TagService
    ) {}

    save() {
        debugger;
        if (this.Name.errors) {
            this.confirmation.info('::The name is required', '::Name required');
        } else {debugger
            this.Tagservice.createMany([this.form.value]).subscribe(() => {debugger
                this.form.reset();
                this.list.get();
                this.activeModal.dismiss();
            });
        }
    }

    close() {
        this.activeModal.dismiss('Closed success');
    }
}
