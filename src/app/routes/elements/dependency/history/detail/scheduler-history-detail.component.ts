declare var $: any;
import { NzModalSubject,NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ModalHelper } from '@delon/theme';

@Component({
    selector: 'cy-scheduler-history-detail',
    templateUrl: 'scheduler-history-detail.component.html'
})

export class SchedulerHistoryDetailComponent {
    schedulerHistoryDetailData = [{
        "detailId": "201",
        "schedulerId": "101",
        "status": "xx",
        "runType": "qqq",
        "errMsg": "java:空指针异常。。。。。"
    }];
    dtOptions: DataTables.Settings = {};
    constructor(
        private modalHelper: ModalHelper,
        private subject: NzModalSubject,
        public msgSrv: NzMessageService,
        public http: _HttpClient) { }
    ngOnInit() {
        /*this.http.get('./assets/pois.json').subscribe((res: any) => this.i = res.data[0]);*/
       /* $('#scheduler_history_detail').dataTable( {
            //"dom": '<"top">rt<"bottom"ip><"clear">',
            "language": {"url" : "../../../../assets/dataTablesLanguage.json"},
            "scrollX": true,
            //"order": "desc",
            "bFilter": false,
            "pagingType": "full_numbers",
            "bLengthChange": false,
        });*/
        this.dtOptions = {
            //"dom": '<"top">rt<"bottom"ip><"clear">',
            "language": {"url" : "../../../../assets/dataTablesLanguage.json"},
            "scrollX": true,
            //"order": "desc",
            "bFilter": false,
            "pagingType": "full_numbers",
            "bLengthChange": false,
        };
    }
}
