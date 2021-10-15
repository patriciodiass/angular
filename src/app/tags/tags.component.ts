import { TagDto } from './../proxy/tags/models';
import { TagService } from './../proxy/tags/tag.service';
import { Component, OnInit } from '@angular/core';
import { ListService } from '@abp/ng.core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagmodalComponent } from '../modal/tag-modal/tagmodal/tagmodal.component';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    providers: [ListService],

})
export class TagsComponent implements OnInit {
    constructor(
        private TagService: TagService,
        private modalService: NgbModal,

        // public readonly list: ListService,
        ) {}
    tags: Array<TagDto>;
    dataSource = [];
    displayedColumns: string[] = ['name'];
    newtags: Array<TagDto>;

    ngOnInit(): void {
        this.TagService.getTagsList().subscribe(projects => {
            this.tags = projects;
            this.dataSource = this.tags;
        });
    }
    newtag() {
        const modalRef = this.modalService.open(TagmodalComponent, { centered: true ,windowClass: 'dark-modal' });
        modalRef.result.then(
            result => {},
            reason => {
                console.log(`Closed with: ${reason}`);
                this.TagService.getTagsList().subscribe(projects => {
                    this.tags = projects;
                    this.dataSource = this.tags;
                });
            }
        );
        // console.log(this.newtags);
        // this.TagService.createMany(this.newtags).subscribe(() => {
        //     debugger;

        //     // this.list.get();

        //     debugger;
        // });
    }
}
