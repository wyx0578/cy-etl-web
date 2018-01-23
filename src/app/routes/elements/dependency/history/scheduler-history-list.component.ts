import { NzModalSubject,NzMessageService,NzModalService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ModalHelper } from '@delon/theme';
import {SchedulerHistoryDetailComponent} from "./detail/scheduler-history-detail.component";
import {ConfigInterface} from "ng-zorro-antd/src/modal/nz-modal.service";

@Component({
    selector: 'cy-scheduler-history',
    templateUrl: 'scheduler-history-list.component.html'
})

export class SchedulerHistoryComponent implements OnInit,ConfigInterface{
    schedulerHistoryData = [{
        "schedulerId": "111",
        "status": "222",
        "runType": "333"
    }];
    s: any = {
        pi: 1,
        ps: 10,
        s: ''
    };
    zIndex: number;
    schedulerId: string;
    constructor(
        private modalHelper: ModalHelper,
        private subject: NzModalSubject,
        private modalService: NzModalService,
        public msgSrv: NzMessageService,
        public http: _HttpClient) { }
    ngOnInit() {
            this.zIndex = 1;
            this.load();
            /*this.http.get('./assets/pois.json').subscribe((res: any) => this.i = res.data[0]);*/
        }

    //=========================
    openHistoryDetailRecord(item) {
        this.schedulerId = item.schedulerId;
        this.modalHelper.static(SchedulerHistoryDetailComponent,{item},{size:450},{zIndex:1000}).subscribe( () => {
            this.load();
            this.msgSrv.info('回调，重新发起刷新列表');
        })
    }
    load(reload: boolean = false) {
        if (reload) {
            this.s.pi = 1;
        }
    }
}
