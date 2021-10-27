import { ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TagService, TagDto } from '@proxy/tags';

@Component({
    selector: 'app-tagmodal',
    templateUrl: './tagmodal.component.html',
    styleUrls: ['./tagmodal.component.scss'],
    providers: [ListService],
    encapsulation: ViewEncapsulation.Emulated

})
export class TagmodalComponent implements OnInit {
    @Input() data: TagDto = {} as TagDto;
    @Input() id: string = '';

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
    ngOnInit() {
        if (this.data) {
            debugger;
            this.form.patchValue({
                Name: this.data.name,
            });
        }
    }
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
    updatetag() {
        debugger;
        if (this.Name.errors) {
            this.confirmation.info('::The name is required', '::Name required');
        } else {debugger

            this.Tagservice.update(this.id, this.form.value).subscribe(() => {
                debugger;
                this.form.reset();
                this.list.get();
                debugger;
                this.activeModal.dismiss();
            });
        }
    }
    delete(id: string) {
        debugger;
        this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
            if (status === Confirmation.Status.confirm) {
                this.Tagservice.delete(id).subscribe(() => {
                    debugger;
                    this.list.get();
                    this.activeModal.dismiss();
                });
            }
        });
    }
    close() {
        this.activeModal.dismiss('Closed success');
    }
}
