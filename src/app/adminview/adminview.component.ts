import { Selectedproject } from './../modules/selectedproject.module';
import { UserDto } from '@proxy/users';
import { UserService } from './../proxy/users/user.service';
import { Project } from './../modules/project.module';
import { ProjectService } from './../proxy/projects/project.service';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProjectDto } from '@proxy/projects';
import { ListService } from '@abp/ng.core';
import { ImportService, ImportDto } from '@proxy/imports';
import { MatSidenav } from '@angular/material/sidenav';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserdetailsComponent } from '../modal/userdetails/userdetails/userdetails.component';

@Component({
    selector: 'app-adminview',
    templateUrl: './adminview.component.html',
    styleUrls: ['./adminview.component.scss'],
    providers: [ListService],
    encapsulation: ViewEncapsulation.None,
})
export class AdminviewComponent implements OnInit {
    @Input() data: Selectedproject = {} as Selectedproject;

    isselected: boolean;
    displayedColumns: string[] = [
        'observations',
        'listOfDays',
        'hoursSpent',
        'exterior',
        'training',
    ];
    totalhours: number;
    totaldays: number;
selecteduser:string;
    dataSource = [] as Array<ImportDto>;
    selectedprojectname: string;
    project = [] as Array<ProjectDto>;
    allimports = [] as Array<ImportDto>;
    selectimports = [] as Array<ImportDto>;
    users = [] as Array<UserDto>;
    constructor(
        private ImportService: ImportService,
        private modalService: NgbModal,
        private UserService: UserService,
        public readonly list: ListService,
        private ProjectService: ProjectService
    ) {}

    ngOnInit(): void {
        this.ProjectService.getListOfProjects().subscribe(projects => {
            this.project = projects;
        });
        this.ImportService.getAllImports().subscribe(importa => {
            debugger;
            this.allimports = importa;
        });
        this.UserService.getListOfUsers().subscribe(importa => {
            debugger;
            this.users = importa;
        });
        this.isselected = true;
        this.selectimports = [];
        this.selectedprojectname = this.data.name;debugger
        // for (let x of this.allimports) {
        //     if (x.projectId === id) {
        //         this.selectimports.push(x);
        //     }
        // }
        
        this.dataSource = this.selectimports;
        console.log(this.selectimports);
    }
    selectedproject(selected:string) {
        // this.isselected = true;
        // this.selectimports = [];
        // this.selectedprojectname = selected;debugger
        // for (let x of this.allimports) {
        //     if (x.projectId === id) {
        //         this.selectimports.push(x);
        //     }
        // }
        // for (let z of this.users) {
        //     this.totalhours=0;
        //     this.totaldays=0;
        //     for (let y of this.selectimports) {
        //         if (y.creatorId === z.id) {debugger
        //             this.totalhours += y.hoursSpent;
        //             for (let r of y.listOfDays) {debugger
        //                 this.totaldays + 1;
        //             }
        //         }
        //     }
        // }

        this.dataSource = this.selectimports;
        console.log(this.selectimports);
    }

    
    opendetails(user: string,id:string) { this.totalhours=0;
            this.totaldays=0;
            this.selecteduser=id;
    
            for (let y of this.selectimports) {debugger
                if (y.creatorId === this.selecteduser) {debugger
                    this.totalhours += y.hoursSpent;
                    for (let r of y.listOfDays) {debugger
                        this.totaldays + 1;
                    }
                }
            }
        
        const modalRef = this.modalService.open(UserdetailsComponent, { centered: true });
        modalRef.componentInstance.data.project = this.selectedprojectname;
        modalRef.componentInstance.data.name = user;
        modalRef.componentInstance.data.hours=this.totalhours;
        modalRef.componentInstance.data.days=this.totaldays;
        debugger;
    }
}
