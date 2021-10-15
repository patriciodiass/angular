import { UserDto } from './../../proxy/users/models';
import { NewprojectComponent } from './../../modal/new-project/newproject/newproject.component';
import { UserService } from './../../proxy/users/user.service';
import { ProjectDto } from './../../proxy/projects/models';
import { ProjectService } from './../../proxy/projects/project.service';
import { Component, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { ListService } from '@abp/ng.core';
import { ImportService } from '@proxy/imports';
import {Directive, HostListener} from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    providers: [ListService],
    
})

export class ProjectsComponent implements OnInit {
    projects = [] as Array<ProjectDto>;
    displayedColumns: string[] = ['name', 'description', 'projectType','actions'];
    dataSource = this.projects;
    x = [] as Array<UserDto>;
    constructor(private router: Router,
        public readonly list: ListService,
        private modalService: NgbModal,
        private cdr: ChangeDetectorRef,
        private confirmation: ConfirmationService,
        private ImportService: ImportService,
        private ProjectService: ProjectService,
        private UserService: UserService
    ) {}
    @HostListener("click", ["$event"])

    ngOnInit(): void {
        debugger;
        this.ProjectService.getListOfProjects().subscribe(projects => {
            this.projects = projects;
            this.dataSource = this.projects;

            debugger;
        });
    }
    newproject() {
        const modalRef = this.modalService.open(NewprojectComponent, { centered: true ,windowClass: 'dark-modal' });
        modalRef.result.then(
            result => {},
            reason => {
                console.log(`Closed with: ${reason}`);
                this.ProjectService.getListOfProjects().subscribe(projects => {
                    this.projects = projects;
                    this.dataSource = this.projects;
                });
            }
        );
    }
    modalRef:any
    editproject(row) {
        debugger;
        this.ProjectService.getListOfAssociatedUsersById(row.id).subscribe(usersi => {
            this.x = usersi;

            this.modalRef = this.modalService.open(NewprojectComponent, { centered: true });
            this.modalRef.componentInstance.data.name = row.name;
            this.modalRef.componentInstance.data.description = row.description;
            this.modalRef.componentInstance.data.projectTypeId = row.projectTypeId;
            this.modalRef.componentInstance.userIds = this.x;
            this.modalRef.componentInstance.id = row.id;
            debugger;
            this.modalRef.result.then(
                result => {},
                reason => {
                    console.log(`Closed with: ${reason}`);
                    this.ProjectService.getListOfProjects().subscribe(projects => {
                        this.projects = projects;
                        this.dataSource = this.projects;
                    });
                }
            );
        });
    }

    currentItem:any;
    opendetails(event:any){  debugger
       

        event.stopPropagation();
        // this.router.navigate([`${Admin View}`]);
    }
}
