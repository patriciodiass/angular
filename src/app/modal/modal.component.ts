import { TagService } from './../proxy/tags/tag.service';
import { TagDto } from './../proxy/tags/models';
import { CalendarComponent } from './../date/calendar/calendar.component';
import { Project } from 'src/app/modules/project.module';
import { ProjectService } from './../proxy/projects/project.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

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
})
export class ModalComponent implements OnInit {
    @Input() data: Project = {} as Project;
    @Input() daata: string = '';
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    @Output() Project = new EventEmitter();
    @Input() imports: Array<ImportDto>;  addOnBlur = true;
    filteredFruits: Observable<string[]>;

    autocompleteItemsAsObjects: Array<TagDto> = [];
    newtags: Array<TagDto> = [];
    form: FormGroup = new FormGroup({
        observations: new FormControl('', [Validators.required]),

        hoursSpent: new FormControl(8, [Validators.required, Validators.max(8), Validators.min(1)]),

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
        this.TagService.getTagsList().subscribe(imports => {
            debugger;

            this.autocompleteItemsAsObjects = imports;
        });
        if (this.data) {
            this.name = this.data.nameproject;
            this.form.patchValue({
                projectId: this.data.id,
                listOfDays: this.data.listofdays,
            });
            // }else{this.form.get('id')?.patchValue(this.id)}
        }
    }
    name = '';
    savetags() {
        console.log(this.newtags);
        this.TagService.createMany(this.newtags).subscribe(() => {
            debugger;

            this.list.get();

            debugger;
        });
    }

    save() {
        debugger;
        if (this.observations.errors || this.hoursSpent.errors) {
            this.confirmation.info('::The observation is required', '::Observation required');
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

    addCustomtag = term => ({ id: term, name: term });

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
selected(event:string){}add(event:string){}

    close() {
        this.activeModal.dismiss('Closed success');
    }
}
