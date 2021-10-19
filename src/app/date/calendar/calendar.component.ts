import { MonthService } from './../../proxy/months/month.service';
import { UserDto } from './../../proxy/users/models';
import { UserService } from './../../proxy/users/user.service';
import { ProjectDto } from './../../proxy/projects/models';
import { ProjectService } from './../../proxy/projects/project.service';
import { Component, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';
import { MatCalendar } from '@angular/material/datepicker';
import { ComfirmDeleteComponent } from 'src/app/modal/comfirm-delete/comfirm-delete/comfirm-delete.component';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { ImportService, ImportDto } from '@proxy/imports';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'app-calendar',
    template: ` <ModalComponent[imports]="imports"> </ModalComponent>`,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    providers: [ListService],
    encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
    saturday = 6;
    currentmonth: number;
    currentyear:number;
    project = [] as Array<ProjectDto>;
    users = { items: [], totalCount: 0 } as PagedResultDto<UserDto>;
    // import= { items: [], totalCount: 0 } as PagedResultDto<ImportDto>;
    imports = [] as Array<ImportDto>;
    allimports = [] as Array<ImportDto>;
    today = new Date();
    mindate=new Date();
    n: Date;
    @ViewChild(MatCalendar) calendar: MatCalendar<Date>;

    // import:{};
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
    isDataLoaded: boolean;
    constructor(
        public readonly list: ListService,
        private modalService: NgbModal,
        private cdr: ChangeDetectorRef,
        private confirmation: ConfirmationService,
        private ImportService: ImportService,
        private ProjectService: ProjectService,
        private UserService: UserService,
        private MonthService:MonthService,
    ) {}

    ngOnInit() {     
               this.lock = false;
this.mindate=new Date('2019-09-06');
        this.isDataLoaded = false;
        debugger;
        this.load();
        console.log(this.daysSelected);
        this.today.setDate(this.today.getDate() );
        this.n = new Date('2021-09-06');
    }
    
    load() {
        this.ProjectService.getMyProjects().subscribe(projects => {
            this.project = projects;
        });
        this.ImportService.getMyImports().subscribe(importa => {
            this.allimports = importa;
            debugger;
            if (this.calendar) this.calendar.updateTodaysDate();
        });
        this.daysused();
        this.isDataLoaded = true;
    }

    open(event: CdkDragDrop<PagedResultDto<ProjectDto>>) {
        //this.selectedProject=event.previousContainer.data.items[event.previousIndex].id;
        const options: Partial<Confirmation.Options> = {
            hideYesBtn: true,
            cancelText: 'Close',
         
          };
        if (this.daysSelected.length === 0) {
            this.modalService.open(ComfirmDeleteComponent, { centered: true });
        } else {        if(this.monthlock===false){

            const modalRef = this.modalService.open(ModalComponent, { centered: true });
            for (let x of this.daysSelected) {
                for (let y of this.daysful) {
                    if (x === y) {
                        this.confirmation
                            .warn(
                                '::One or more selected days are full.Continue anyways?',
                                '::Day alredy full'
                            )
                            .subscribe(status => {
                                if (status === Confirmation.Status.reject) {
                                    modalRef.close();
                                }
                            });
                    }
                }
            }
            modalRef.componentInstance.data.listofdays = this.daysSelected;
            modalRef.componentInstance.data.imports = this.imports;
            modalRef.componentInstance.data.nameproject =
                event.previousContainer.data[event.previousIndex].name;
            modalRef.componentInstance.data.id =
                event.previousContainer.data[event.previousIndex].id;
            modalRef.result.then(
                result => {},
                reason => {
                    console.log(`Closed with: ${reason}`);
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                    this.ImportService.getListByDayBySelectedDays(this.daysSelected).subscribe(
                        importa => {
                            this.imports = importa;
                        }
                    );
                    debugger;
                    // this.daysSelected=[];
                    this.daysused();
                    debugger;
                    // this.isSelected
                }
            );

            //         modalRef.componentInstance.Project.subscribe(x=>{
            //             this.daysSelected.forEach(day=>{
            //             //  this.inputdays.push({'day':day,...x})
            //             // this.import.items.push({'listOfDays':day,...x})
            //         //  this.days.push({'listOfDays':day,...x})
            //             })
            //             // modalRef.componentInstance.data.listOfDays =this.days;
            //         // console.log(this.import)
            //         console.log(this.project)
            // debugger

            //   this.daysSelected=[];
            //               });
        }else(
            
            this.confirmation
            .error(
                '::Month is locked no imports can be created',
                '::Month is locked',options,
            ))
    }
    }

    // delete(project:Project){debugger
    //     const modalRef = this.modalService.open(ComfirmDeleteComponent)
    //     modalRef.componentInstance.data = project;
    //     modalRef.result.then((result) => {
    //         let index = this.inputdays.findIndex(x=> x.id==project);
    //         if(index>=0){
    //         this.inputdays.splice(index,1)
    //     }
    // })

    //  }

    delete(id: string) {
        debugger;
        this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
            if (status === Confirmation.Status.confirm) {
                this.ImportService.delete(id).subscribe(() => {
                    debugger;
                    this.list.get();
                    this.ImportService.getListByDayBySelectedDays(this.daysSelected).subscribe(
                        importa => {
                            debugger;
                            this.imports = importa;

                            this.daysused();
                        }
                    );
                });
            }
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    nameproject = '';
    daysSelected: any[] = [];
    event: any;
    selectedProject = '';
date:string;monthlock:boolean;
dayl:number;
    isSelected = (event: Date) => {
        // if(this.lock){
        // if (event.getDate() == 1){
        // this.lockmonth()}}
        this.daysused();
        
        let date = this.formatDate(new Date(event));
        this.date = this.formatDate(new Date(event));
        this.dayl=event.getDay();
        if(this.dayl===3){
            this.MonthService.isMonthClosedByDate(this.date).subscribe(item=>{debugger
                this.monthlock=item;
            })
        }
        this.currentmonth = event.getMonth();
        this.currentyear=event.getFullYear();
      
        // console.log(this.currentmonth)
        if (this.daysSelected.includes(date)) return 'selected';
        if (this.daysful.includes(date)) return 'full-dates';
        if (this.useddays.includes(date)) return 'used-date';
        if (this.daysoverfilled.includes(date)) return 'overfilled-date';

        // this.calendar.updateTodaysDate();

        // if(this.daysful){debugger
        // return (date: Date): MatCalendarCellCssClasses => {
        //     const highlightDate =this.daysful
        //       .map(strDate => new Date(strDate))
        //       .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());      debugger
        //       console.log(highlightDate)

        //     return highlightDate ? 'full-date' : '';
        //   }

        // if(this.daysSelected){debugger
        // const date =
        //   event.getFullYear() +
        //   "-" +
        //   ("00" + (event.getMonth() + 1)).slice(-2) +
        //   "-" +
        //   ("00" + event.getDate()).slice(-2);debugger
        // return this.daysSelected.find(x => x == date) ? "selected" : null;
        // }
    };

    getmyimports() {
        debugger;
        this.ImportService.getMyImports().subscribe(importa => {
            this.allimports = importa;
            debugger;
            // console.log(this.allimports)
        });
        console.log(this.allimports);

        debugger;
    }
    change() {
        this.lock = false;
    }
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
    someEvent() {
        debugger;
        this.calendar.updateTodaysDate();
    }
    loadd(event: any) {
        debugger;
        this.calendar.updateTodaysDate();
    }

    lockm = (d: Date): boolean => {
        if (this.lock===true) {
             debugger
            this.mindate=new Date(1-(this.currentmonth+1)-(this.currentyear))
            
        }else return d.getDay() !== 0 && d.getDay() !== 6;
            // d.getDay() !== 0 &&
                // d.getDay() !== 6 &&
                // d.getDay() !== 5 &&
                // d.getDay() !== 4 &&
                // d.getDay() !== 3 &&
                // d.getDay() !== 2 &&
                // d.getDay() !== 1
            
            // return d.getMonth() !== this.currentmonth;
        
    };
    u: number;
    lock: boolean;
    lockmonth() {
        debugger;
        if (this.lock) {
            this.lock = false;
        } else {
            this.lock = true;
        }
        console.log(this.lock);
        this.calendar.updateTodaysDate();
    }

    select(event: any) {
        let date = this.formatDate(event);

        const index = this.daysSelected.findIndex(x => x == date);

        if (index < 0) this.daysSelected.push(date);
        else this.daysSelected.splice(index, 1);
        this.calendar.updateTodaysDate();
        this.cdr.detectChanges();
        debugger;
        this.ImportService.getListByDayBySelectedDays(this.daysSelected).subscribe(importa => {
            this.imports = importa;
            this.daysused();debugger
        });
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
}
