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
    @Output() Project = new EventEmitter();
    @Input() imports: Array<ImportDto>;

    form: FormGroup = new FormGroup({
        observations: new FormControl('', [Validators.required]),

        hoursSpent: new FormControl(8, [Validators.required, Validators.max(8), Validators.min(1)]),

        exterior: new FormControl(false),
        training: new FormControl(false),
        listOfDays: new FormControl(),
        projectId: new FormControl(),
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
        private formBuilder: FormBuilder,
        private confirmation: ConfirmationService,
        public calendarComponent: CalendarComponent,
        public activeModal: NgbActiveModal,
        private ProjectService: ProjectService,
        private ImportService: ImportService,
        public readonly list: ListService
    ) {}

    ngOnInit(): void {
        debugger;
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
                debugger
            });
            this.ImportService.getListByDayBySelectedDays(this.data.listofdays).subscribe(
                importa => {
                    this.imports = importa;
                }
            );
        }
    }

    close() {
        this.activeModal.dismiss('Closed success');
    }
}
