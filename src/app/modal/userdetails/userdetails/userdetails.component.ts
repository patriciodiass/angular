import { ListService } from '@abp/ng.core';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Userdata } from 'src/app/modules/userdata.module';

@Component({
    selector: 'app-userdetails',
    
    templateUrl: './userdetails.component.html',
    styleUrls: ['./userdetails.component.scss'],
    providers: [ListService],
})
export class UserdetailsComponent implements OnInit {
    @Input() data: Userdata = {} as Userdata;
    name: string;    project: string; days:number; hours:number;

    constructor(
        public activeModal: NgbActiveModal
        
        ) {}

    ngOnInit(): void {
        if (this.data) {
            this.name = this.data.name;
            this.project=this.data.project;
            this.days=this.data.days;
            this.hours=this.data.hours
        }
    }
    close() {
        this.activeModal.dismiss('Closed success');
    }
}
