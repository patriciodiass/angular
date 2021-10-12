import { ProjectTypeDto } from '../../proxy/project-types/models';
import { ProjectTypeService } from '../../proxy/project-types/project-type.service';
import { UserService } from '../../proxy/users/user.service';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { ListService } from '@abp/ng.core';
import { ImportService } from '@proxy/imports';
import { ProjecttypeComponent } from 'src/app/modal/type/projecttype/projecttype.component';

@Component({
    selector: 'app-projecttypespage',
    templateUrl: './projecttypespage.component.html',
    styleUrls: ['./projecttypespage.component.scss'],
    providers: [ListService],
})
export class ProjecttypespageComponent implements OnInit {
    projecttypes = [] as Array<ProjectTypeDto>;
    displayedColumns: string[] = ['type'];
    dataSource = [] as Array<ProjectTypeDto>;

    constructor(
        public readonly list: ListService,
        private modalService: NgbModal,
        private cdr: ChangeDetectorRef,
        private confirmation: ConfirmationService,
        private ImportService: ImportService,
        private ProjectTypeService: ProjectTypeService,
        private UserService: UserService
    ) {}

    ngOnInit(): void {
        this.ProjectTypeService.getListOfProjectTypes().subscribe(projects => {
            debugger;
            this.projecttypes = projects;
            this.dataSource = this.projecttypes;
        });
        debugger;
    }
    newprojecttype() {
        const modalRef = this.modalService.open(ProjecttypeComponent, { centered: true });
        modalRef.result.then(
            result => {},
            reason => {
                console.log(`Closed with: ${reason}`);
                this.ProjectTypeService.getListOfProjectTypes().subscribe(projects => {
                    debugger;
                    this.projecttypes = projects;
                    this.dataSource = this.projecttypes;
                });
            }
        );
    }

    editprojecttype(row) {
        console.log(row);
        const modalRef = this.modalService.open(ProjecttypeComponent, { centered: true });
        modalRef.componentInstance.data.type = row.type;
        modalRef.componentInstance.id = row.id;
        modalRef.result.then(
            result => {},
            reason => {
                console.log(`Closed with: ${reason}`);
                this.ProjectTypeService.getListOfProjectTypes().subscribe(projects => {
                    debugger;
                    this.projecttypes = projects;
                    this.dataSource = this.projecttypes;
                });
            }
        );
    }
}
