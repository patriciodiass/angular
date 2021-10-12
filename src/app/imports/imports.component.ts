import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { UserService } from './../proxy/users/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportService, ImportDto } from '@proxy/imports';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { UserDto } from '@proxy/users';
import { FormControl } from '@angular/forms';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment} from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
const moment =  _moment;

export const MY_FORMATS = {
    parse: {
      dateInput: 'MM/YYYY',
    },
    display: {
      dateInput: 'MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.scss'],
  providers: [ListService,
    

],
})


export class ImportsComponent implements OnInit {    users = [] as Array<UserDto>;
    userimports=[] as Array<ImportDto>;
    imports  = { items: [], totalCount: 0 } as PagedResultDto<ImportDto>;
    displayedColumns: string[] = ['projectName', 'observations', 'listOfDays','training','exterior','hoursSpent'];
    dataSource =[] as Array<ImportDto>;
    x:boolean;
    SearchParams = {}
    @ViewChild(MatDatepicker) private rangePicker: MatDatepicker<Date>;
    items: ImportDto[] = [];
    userss: UserDto[]=[];
    count = 0;
    countusers=0;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    allimports = [] as Array<ImportDto>;
    
  constructor(        
    public readonly list: ListService,
    private ImportService: ImportService,
    private UserService:UserService,
  ) {    this.list.maxResultCount = 20;
  }

  ngOnInit(): void {
    const StreamCreator = query => this.ImportService.getList(query);
debugger
    this.list.hookToQuery(StreamCreator).subscribe(
      response => {
        this.items = response.items;debugger
        this.count = response.totalCount;
    })

    this.ImportService.getAllImports().subscribe(importa => {
        debugger;
        this.allimports = importa;
        this.dataSource=this.allimports;
    });
        this.UserService.getListOfUsers().subscribe(user => {
            this.users = user;
            debugger;
        });
        const StreamCreatoru = query => this.UserService.getList(query);
debugger
    this.list.hookToQuery(StreamCreatoru).subscribe(
      response => {
        this.userss = response.items;debugger
        this.countusers = response.totalCount;
    })
      }
 

    //   ,'2021-09-06'
getimportsbyuserbydate(id){debugger
    // let date = this.formatDate(event);
    // this.rangePicker.close()
if(this.date){
    this.ImportService.getListByUserByMonthByIdAndDateTime(id,this.date).subscribe(imports =>{
        // this.userimports=imports;
        // this.dataSource=this.userimports;debugger
        this.items=imports;
        this.count=imports.length;
        debugger
    })}else return
}

month:number;
date:string;
getimportsbymonth(event: any){debugger
    this.date = this.formatDate(event);
    
    this.rangePicker.close()
    this.ImportService.importsOfAllUsersByMonthByDateTimeAndLock(this.date,true).subscribe(imports =>{
        this.userimports=imports;
        this.items = imports;
        this.count=imports.length;
        this.dataSource=this.userimports;debugger
    })
    
}
formatDate(date: Date): string {
    this.month=date.getMonth() + 1

    return (
        date.getFullYear() +
        '-' +
        ('00' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('00' + date.getDate()).slice(-2)
        
    );
}

}
