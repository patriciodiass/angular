import { UserDto } from './../../proxy/users/models';
import { UserService } from './../../proxy/users/user.service';
import { ProjectDto } from './../../proxy/projects/models';
import { ProjectService } from './../../proxy/projects/project.service';
import { Component, ChangeDetectorRef, ViewChild, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatCalendar } from '@angular/material/datepicker';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { ImportService, ImportDto } from '@proxy/imports';



@Component({
    selector: 'app-admincalendar',
    templateUrl: './admincalendar.component.html',
    styleUrls: ['./admincalendar.component.scss'],
    providers: [ListService],
    encapsulation: ViewEncapsulation.None,
})
export class AdmincalendarComponent implements OnInit {
    today = new Date();

    isDataLoaded: boolean;
    project = [] as Array<ProjectDto>;
    users = { items: [], totalCount: 0 } as PagedResultDto<UserDto>;
    // import= { items: [], totalCount: 0 } as PagedResultDto<ImportDto>;
    imports = [] as Array<ImportDto>;
    allimports = [] as Array<ImportDto>;
    totalhours = 0;
    useddays: Array<string> = [];
    daysful: Array<string> = [];
    daysoverfilled: Array<string> = [];
    dayu: Array<string> = [];
    arr = 'import.listofdays';
    inputdays: Array<any> = [];
    // projectbyusers:Array<Project>=[];
    closeResult = '';
    x: '2021-09-06';
    minDate: Date;
    projectn = [] as ProjectDto;
    currentmonth: number;
    currentyear: number;
    daysSelected: any[] = [];
    date: string;
    lock: boolean;
    @ViewChild(MatCalendar) calendar: MatCalendar<Date>;

    constructor(private cdRef:ChangeDetectorRef,
        public readonly list: ListService,
        private modalService: NgbModal,
        private cdr: ChangeDetectorRef,
        private confirmation: ConfirmationService,
        private ImportService: ImportService,
        private ProjectService: ProjectService,
        private UserService: UserService
    ) {}

    ngOnInit(): void {
        this.today.setDate(this.today.getDate());

        this.isDataLoaded = false;
        debugger;
        this.load();
    }
    load() {
        this.ProjectService.getMyProjects().subscribe(projects => {
            this.project = projects;
        });
        this.ImportService.getAllImports().subscribe(importa => {
            debugger;
            this.allimports = importa;
            if (this.calendar) this.calendar.updateTodaysDate();
        });
        this.daysused();
        this.isDataLoaded = true;
    }
    isSelected = (event: Date) => {
        this.daysused();
        let date = this.formatDate(new Date(event));
        this.date = this.formatDate(new Date(event));

        this.currentmonth = event.getMonth();
        this.currentyear = event.getFullYear();
        if (this.currentmonth != this.today.getMonth()) {
            this.lock = true;
        } else this.lock = false;
        console.log(this.currentmonth);

        if (this.daysSelected.includes(date)) return 'selected';
        if (this.daysful.includes(date)) return 'full-dates';
        if (this.useddays.includes(date)) return 'used-date';
        if (this.daysoverfilled.includes(date)) return 'overfilled-date';
    };

    daysused() {
        this.useddays = [];
        this.daysful = [];
        this.dayu = [];
        this.ImportService.getMyImports().subscribe(importa => {
            this.allimports = importa;
        });

        for (let x of this.allimports) {
            for (let y of x.listOfDays) {
                this.dayu.indexOf(y) === -1 ? this.dayu.push(y) : {};
            }
        }
        for (let x of this.dayu) {
            for (let z of this.allimports) {
                for (let y of z.listOfDays) {
                    if (y == x) {
                        this.totalhours += z.hoursSpent;
                    }
                }
            }
            if (this.totalhours == 8) {
                this.daysful.indexOf(this.formatDate(new Date(x))) === -1
                    ? this.daysful.push(this.formatDate(new Date(x)))
                    : {};
            } else if (this.totalhours > 8) {
                this.daysoverfilled.indexOf(this.formatDate(new Date(x))) === -1
                    ? this.daysoverfilled.push(this.formatDate(new Date(x)))
                    : {};
            } else {
                this.useddays.indexOf(this.formatDate(new Date(x))) === -1
                    ? this.useddays.push(this.formatDate(new Date(x)))
                    : {};
            }
            this.totalhours = 0;
        }
    }
    usedprojects: Array<string> = [];
    select(event: any) {
        let date = this.formatDate(event);
        this.usedprojects = [];
        const index = this.daysSelected.findIndex(x => x == date);

        if (index < 0) this.daysSelected.push(date);
        else this.daysSelected.splice(index, 1);
        this.calendar.updateTodaysDate();
        this.cdr.detectChanges();
        this.ImportService.getAllListByDayBySelectedDays(this.daysSelected).subscribe(importa => {
            this.imports = importa;
            this.daysused();
            console.log(this.imports);
            for (let x of this.imports) {
                this.usedprojects.indexOf(x.projectName) === -1
                    ? this.usedprojects.push(x.projectName)
                    : {};
                debugger;
            }
        });
        this.cdRef.detectChanges();

    }
    
    formatDate(date: Date): string {
        return (
            date.getFullYear() +
            '-' +
            ('00' + (date.getMonth() + 1)).slice(-2) +
            '-' +
            ('00' + date.getDate()).slice(-2)
        );
    }

    lockm = (d: Date): boolean => {
        return d.getDay() !== 0 && d.getDay() !== 6;
    };

    disableprojects(project: string) {
        for (let x of this.imports) {
            debugger;
            if (x.projectName === project) return false;
            else return true;
        }
    }

    g: Date;
    lockmonth() {
        debugger;
        // this.ImportService.importsOfAllUsersByMonthByDateTimeAndLock(this.date).subscribe;

        // // this.ImportService.closeImportsOfAllUsersByMonthByDateTime('1-this.currentmonth-this.currentyear');
        // debugger
    }
}
