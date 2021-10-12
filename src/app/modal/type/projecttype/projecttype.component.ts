import { UserService } from './../../../proxy/users/user.service';
import { ProjectTypeService } from './../../../proxy/project-types/project-type.service';
import { UserDto } from './../../../proxy/users/models';
import { ProjectTypeDto, UpdateProjectTypeDto } from './../../../proxy/project-types/models';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { ProjectService } from '@proxy/projects';
@Component({
    selector: 'app-projecttype',
    templateUrl: './projecttype.component.html',
    styleUrls: ['./projecttype.component.scss'],
    providers: [ListService],
})
export class ProjecttypeComponent implements OnInit {
    @Input() data: UpdateProjectTypeDto = {} as UpdateProjectTypeDto;
    @Input() id: string = '';

    projecttypes = [] as Array<ProjectTypeDto>;
    users = [] as Array<UserDto>;

    form: FormGroup = new FormGroup({
        type: new FormControl('', [Validators.required]),
    });
    get type() {
        return this.form.get('type');
    }

    constructor(
        private formBuilder: FormBuilder,
        private confirmation: ConfirmationService,
        public activeModal: NgbActiveModal,
        public UserService: UserService,
        public ProjectService: ProjectService,
        public readonly list: ListService,
        public ProjectTypeService: ProjectTypeService
    ) {}

    ngOnInit() {
        if (this.data) {
            debugger;
            this.form.patchValue({
                type: this.data.type,
            });
        }
    }

    save() {
        debugger;
        if (this.type.errors) {
            this.confirmation.info('::The name is required', '::Name required');
        } else {
            // this.Project.emit(this.form.value)
            this.ProjectTypeService.create(this.form.value).subscribe(() => {
                debugger;
                this.form.reset();
                this.list.get();
                this.activeModal.dismiss();
            });
        }
    }
    updateprojecttype() {
        debugger;
        if (this.type.errors) {
            this.confirmation.info('::The name is required', '::Name required');
        } else {debugger
            this.ProjectTypeService.update(this.id, this.form.value).subscribe(() => {
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
                this.ProjectTypeService.delete(id).subscribe(() => {
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
