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
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-adminview',
    templateUrl: './adminview.component.html',
    styleUrls: ['./adminview.component.scss'],
    providers: [ListService],
    encapsulation: ViewEncapsulation.Emulated
})
export class AdminviewComponent implements OnInit  {
    Project: ProjectDto | undefined;
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
    selecteduser: string;
    dataSource = [] as Array<ImportDto>;
    selectedprojectname: string;
    project = [] as ProjectDto;
    allimports = [] as Array<ImportDto>;
    selectimports = [] as Array<ImportDto>;
    users = [] as Array<UserDto>;    usersx = [] as Array<UserDto>;
    breakpoint: number;

    constructor(
        private route: ActivatedRoute,
        private ImportService: ImportService,
        private modalService: NgbModal,
        private UserService: UserService,
        public readonly list: ListService,
        private ProjectService: ProjectService
    ) {}

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const productIdFromRoute = routeParams.get('id');

        this.ProjectService.get(productIdFromRoute as string).subscribe(project => {
            this.project = project;
            this.ImportService.getAllImports().subscribe(importa => {
                this.allimports = importa;
                for (let x of this.allimports) {
                    if (x.projectId === this.project.id) {
                        this.selectimports.push(x);
                    }
                }
            });
        });
        // this.UserService.getListOfUsers().subscribe(importa => {
        //     debugger;
        //     this.users = importa;
        // });
        this.ProjectService.getListOfAssociatedUsersById(productIdFromRoute as string).subscribe(importa => {
            debugger;
            this.users = importa;
            if(this.users.length<5){this.breakpoint=this.users.length}
            else if(this.users.length<10){ this.breakpoint=(this.users.length/2)}
            else if(this.users.length<15){ this.breakpoint=(this.users.length/3)}
            else if(this.users.length<20){ this.breakpoint=(this.users.length/4)}

        });
        this.isselected = true;
        this.selectimports = [];
        debugger;

        this.dataSource = this.selectimports;
        console.log(this.selectimports);
    }

    // selectedproject(selected:string) {
    //     this.isselected = true;
    //     this.selectimports = [];
    //     this.selectedprojectname = selected;debugger
    //     for (let x of this.allimports) {
    //         if (x.projectId === id) {
    //             this.selectimports.push(x);
    //         }
    //     }
    //     for (let z of this.users) {
    //         this.totalhours=0;
    //         this.totaldays=0;
    //         for (let y of this.selectimports) {
    //             if (y.creatorId === z.id) {debugger
    //                 this.totalhours += y.hoursSpent;
    //                 for (let r of y.listOfDays) {debugger
    //                     this.totaldays + 1;
    //                 }
    //             }
    //         }
    //     }

    //     this.dataSource = this.selectimports;
    //     console.log(this.selectimports);
    // }
    cols(){debugger
if(this.users.length<5){return this.users.length}

}
    opendetails(name:string,surname:string) {
        this.totalhours = 0;

        this.totalhours = 0;
        this.totaldays = 0;

        for (let y of this.selectimports) {debugger
            if (y.userName === name) {
                debugger;
                this.totalhours += y.hoursSpent;
                for (let r of y.listOfDays) {
                    debugger;
                    this.totaldays += 1;
                }
            }
        }
        const modalRef = this.modalService.open(UserdetailsComponent, { centered: true });
        modalRef.componentInstance.data.project = this.project.name;
        modalRef.componentInstance.data.name = name;
        modalRef.componentInstance.data.surname = surname;

        modalRef.componentInstance.data.hours = this.totalhours;
        modalRef.componentInstance.data.days = this.totaldays;
        debugger;
    }
}
