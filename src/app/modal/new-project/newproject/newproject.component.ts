import { ProjectDto, UpdateProjectDto } from './../../../proxy/projects/models';
import { UserService } from './../../../proxy/users/user.service';
import { ProjectTypeService } from './../../../proxy/project-types/project-type.service';
import { UserDto } from './../../../proxy/users/models';
import { ProjectTypeDto } from './../../../proxy/project-types/models';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { ProjectService } from '@proxy/projects';
@Component({
    selector: 'app-newproject',
    templateUrl: './newproject.component.html',
    styleUrls: ['./newproject.component.scss'],
    providers: [ListService],
})
export class NewprojectComponent implements OnInit {
    @Input() data: UpdateProjectDto = {} as UpdateProjectDto;
    @Input() id: string = '';
    @Input() userIds=[] as Array<UserDto>
    x=[] as Array<UserDto>;
    projecttypes = [] as Array<ProjectTypeDto>;
    users = [] as Array<UserDto>;
    idsuser : Array<string> = [];

    form: FormGroup = new FormGroup({
        Name: new FormControl('', [Validators.required]),
        Description: new FormControl('', [Validators.required]),
        projectTypeId: new FormControl(),
        userIds: new FormControl(),
    });

    get Name() {
        return this.form.get('Name');
    }
    get Description() {
        return this.form.get('Description');
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
            for (let q of this.userIds) {
                 this.idsuser.indexOf(q.id) === -1 ? this.idsuser.push(q.id) : {};
                } 
            debugger
            this.form.patchValue({
                Name: this.data.name,
                Description: this.data.description,
                projectTypeId: this.data.projectTypeId,
                userIds:this.idsuser,
              

            });
            debugger
        }
        this.UserService.getListOfUsers().subscribe(user => {
            this.users = user;
            debugger;
        });
        this.ProjectTypeService.getListOfProjectTypes().subscribe(projects => {
            debugger;
            this.projecttypes = projects;
        });
    }

    save() {
        debugger;
        if (this.Name.errors || this.Description.errors) {
            this.confirmation.info('::The observation is required', '::Observation required');
        } else {
            // this.Project.emit(this.form.value)
            this.ProjectService.create(this.form.value).subscribe(() => {
                this.form.reset();
                this.list.get();
                debugger;
                this.activeModal.dismiss();
            });
        }
    }
    
    updateProject() {debugger
        if (this.Name.errors || this.Description.errors) {
            this.confirmation.info('::The observation is required', '::Observation required');
        } else {debugger
            // this.Project.emit(this.form.value)
            this.ProjectService.update(this.id, this.form.value).subscribe(() => {
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
                this.ProjectService.delete(id).subscribe(() => {
                    debugger;
                    this.list.get();
                    this.activeModal.dismiss();
                });
            }
        });
    }

    close() {
        debugger;
        this.activeModal.dismiss('Closed success');
    }
}
