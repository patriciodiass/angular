import { MonthService } from './../proxy/months/month.service';
import { TagService } from './../proxy/tags/tag.service';
import { TagDto } from './../proxy/tags/models';
import { CalendarComponent } from './../date/calendar/calendar.component';
import { Project } from 'src/app/modules/project.module';
import { ProjectService } from './../proxy/projects/project.service';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import de from '@mobiscroll/angular/dist/js/i18n/de';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { ImportService, ImportDto } from '@proxy/imports';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { TagInputModule } from 'ngx-chips';
import { TagModel } from 'ngx-chips/core/accessor';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatCalendar } from '@angular/material/datepicker';

export interface AutoCompleteModel {
    value: any;
    display: string;
}
@Component({
    selector: 'app-modal',
    template: `{{ imports }}`,
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    providers: [ListService],
    encapsulation: ViewEncapsulation.Emulated,
})
export class ModalComponent implements OnInit {
    isDataLoaded: boolean;
    @ViewChild(MatCalendar) calendar: MatCalendar<Date>;

    daysSelected: Array<string> = [];
    @Input() data: Project = {} as Project;
    @Input() daata: string = '';
    @Input() id: string = '';
    @Input() edit: boolean;
    today = new Date();
    totalhours = 0;
    useddays: Array<string> = [];
    daysful: Array<string> = [];
    daysoverfilled: Array<string> = [];
    dayu: Array<string> = [];
    tags: Array<TagDto>;
    tagidsss: Array<string> = [];
    allimports = [] as Array<ImportDto>;
    currentmonth: number;
    currentyear: number;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    @Output() Project = new EventEmitter();
    @Input() imports: Array<ImportDto>;
    addOnBlur = true;
    filteredFruits: Observable<string[]>;
    import: ImportDto;
    autocompleteItemsAsObjects: Array<TagDto> = [];
    newtags: Array<TagDto> = [];
    newtagss: Array<string> = [];

    form: FormGroup = new FormGroup({
        observations: new FormControl('', [Validators.required]),

        hoursSpent: new FormControl('', [
            Validators.required,
            Validators.max(8),
            Validators.min(1),
        ]),

        exterior: new FormControl(false),
        training: new FormControl(false),
        listOfDays: new FormControl(),
        projectId: new FormControl(),
        tagIds: new FormControl(),
        isClosed: new FormControl(false),
    });
    CalendarComponent: any;
    get hoursSpent() {
        return this.form.get('hoursSpent');
    }
    get observations() {
        return this.form.get('observations');
    }
    // get listOfDays() {return this.form.get('CalendarComponent')}

    constructor(
        private MonthService: MonthService,
        private TagService: TagService,
        private formBuilder: FormBuilder,
        private confirmation: ConfirmationService,
        public calendarComponent: CalendarComponent,
        public activeModal: NgbActiveModal,
        private ProjectService: ProjectService,
        private ImportService: ImportService,
        public readonly list: ListService
    ) {}

    ngOnInit(): void {
        this.isDataLoaded = false;
        console.log(this.edit);
        // this.calendar.updateTodaysDate()
        this.today.setDate(this.today.getDate());

        this.TagService.getTagsList().subscribe(imports => {
            debugger;

            this.autocompleteItemsAsObjects = imports;
        });
        if (this.data) {
            debugger;
            if (this.data.observation) {
                this.ImportService.getListOfAssociatedTagsById(this.data.id).subscribe(used => {
                    this.tags = used;
                    debugger;
                    for (let q of this.tags) {
                        this.tagidsss.indexOf(q.id) === -1 ? this.tagidsss.push(q.id) : {};
                    }
                    this.form.patchValue({ tagIds: this.tagidsss });
                });
            }
            debugger;
            this.name = this.data.nameproject;
            for (let x of this.data.listofdays) {
                this.daysSelected.push(this.formatDate(new Date(x)));
            }
            if (this.edit === false) {
                this.form.patchValue({
                    listOfDays: this.data.listofdays,
                });
            }
            this.form.patchValue({
                projectId: this.data.id,
                // listOfDays: this.data.listofdays,
                observations: this.data.observation,
                hoursSpent: this.data.hours,
                exterior: this.data.external,
                training: this.data.training,
            });
            debugger;
            // }else{this.form.get('id')?.patchValue(this.id)}
            // this.daysSelected=this.data.listofdays;
            // this.calendar.updateTodaysDate();
            this.ImportService.getMyImports().subscribe(importa => {
                this.allimports = importa;
                this.daysused();
                this.isDataLoaded = true;
            });
        }
    }

    name = '';
    // savetags() {
    //     console.log(this.newtags);
    //     this.TagService.createMany(this.newtags).subscribe(() => {
    //         debugger;

    //         this.list.get();

    //         debugger;
    //     });
    // }
    // add(event: MatChipInputEvent): void {
    //     const value = (event.value || '').trim();

    //     // Add our fruit
    //     if (value) {
    //      this.newtagss.push(value)
    //     }}
    formatDate(date: Date): string {
        return (
            date.getFullYear() +
            '-' +
            ('00' + (date.getMonth() + 1)).slice(-2) +
            '-' +
            ('00' + date.getDate()).slice(-2)
        );
    }
    addone() {
        if (this.observations.errors) {
            this.confirmation.info('::The observation is required', '::Observation required');
        }
        if (this.hoursSpent.errors) {
            this.confirmation.info(
                '::The number of hours is required and must be betwen 1 and 8',
                '::Hours Error'
            );
        } else {
            // this.Project.emit(this.form.value)
            this.ImportService.create(this.form.value).subscribe(() => {
                this.form.reset();
                this.form.patchValue({
                    projectId: this.data.id,
                    listOfDays: this.data.listofdays,exterior: false,
                    training: false,isClosed:false
                })
                this.list.get();
                debugger;
            });

            debugger;
        }
    }
    save() {
        debugger;
        if (this.observations.errors) {
            this.confirmation.info('::The observation is required', '::Observation required');
        }
        if (this.hoursSpent.errors) {
            this.confirmation.info(
                '::The number of hours is required and must be betwen 1 and 8',
                '::Hours Error'
            );
        } else {
            // this.Project.emit(this.form.value)
            this.ImportService.create(this.form.value).subscribe(() => {
                this.form.reset();
                this.list.get();
                this.activeModal.dismiss();
                debugger;
            });
            this.ImportService.getListByDayBySelectedDays(this.data.listofdays).subscribe(
                importa => {
                    this.imports = importa;
                }
            );
            debugger;
        }
    }
    updateim() {
        this.form.patchValue({ listOfDays: this.daysSelected });

        if (this.observations.errors || this.hoursSpent.errors) {
            this.confirmation.info('::The name is required', '::Name required');
        } else {
            debugger;
            this.ImportService.update(this.data.id, this.form.value).subscribe(() => {
                debugger;
                this.form.reset();
                this.list.get();
                debugger;
                this.activeModal.dismiss();
            });
            this.ImportService.getListByDayBySelectedDays(this.daysSelected).subscribe(importa => {
                this.imports = importa;
            });
        }
    }

    // onAdding(tag: TagDto) {
    //     console.log(this.newtags);
    //     const index = this.responseRawGenreList.findIndex(x => x == tag);
    //     debugger;
    //     if (index < 0) this.newtags.push(tag);
    //     else debugger;
    //     return;
    // }

    // public requestAutocompleteItems = (text: any): Observable<any> => {
    //     return of(this.responseRawGenreList);
    //   };
    select(event: any) {
        const options: Partial<Confirmation.Options> = {
            hideYesBtn: true,
            cancelText: 'Close',
        };
        this.MonthService.isMonthClosedByDate(this.date).subscribe(item => {
            debugger;
            this.monthlock = item;
        });
        if (this.monthlock) {
            this.confirmation.error(
                '::Month has been closed please select a diferent day',
                '::Month Closed',
                options
            );
        } else {
            let date = this.formatDate(event);
            console.log(this.daysSelected);
            const index = this.daysSelected.findIndex(x => x == date);

            if (index < 0) this.daysSelected.push(date);
            else this.daysSelected.splice(index, 1);
            this.calendar.updateTodaysDate();
            debugger;
        }
    }
    daysused() {
        this.useddays = [];
        this.daysful = [];
        this.dayu = [];

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
    lockm = (d: Date): boolean => {
        return d.getDay() !== 0 && d.getDay() !== 6;
    };
    date: string;
    monthlock: boolean;
    dayl: number;
    x: number;
    isSelected = (event: Date) => {
        this.daysused();
        this.dayl = event.getDay();
        if (this.dayl === 3) {
            this.MonthService.isMonthClosedByDate(this.date).subscribe(item => {
                debugger;
                this.monthlock = item;
            });
        }
        let date = this.formatDate(new Date(event));
        this.date = this.formatDate(new Date(event));
        this.dayl = event.getDay();
        if (this.dayl === 29) {
            this.calendar.updateTodaysDate();
        }
        this.currentmonth = event.getMonth();
        this.currentyear = event.getFullYear();

        // console.log(this.currentmonth)
        if (this.daysSelected.includes(date)) return 'selected';
        if (this.daysful.includes(date)) return 'full-dates';
        if (this.useddays.includes(date)) return 'used-date';
        if (this.daysoverfilled.includes(date)) return 'fulldate';

        //     this.x=event.getDay()
        //     if (this.x===29){debugger
        //    console.log(this.x)
        //         this.calendar.updateTodaysDate
        // }
    };

    close() {
        this.activeModal.dismiss('Closed success');
    }
}
