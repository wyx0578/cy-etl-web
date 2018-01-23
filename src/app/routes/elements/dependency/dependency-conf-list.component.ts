import { Component,OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import {SchedulerHistoryComponent} from "./history/scheduler-history-list.component";
import {ConfigInterface} from "ng-zorro-antd/src/modal/nz-modal.service";

@Component({
    selector: 'cy-dependency-list',
    templateUrl: 'dependency-conf-list.component.html',
    styles  : [ `
    :host ::ng-deep .vertical-center-modal {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host ::ng-deep .vertical-center-modal .ant-modal {
      top: 0;
    }
  `]
})
export class DependencyConfListConponent implements OnInit,ConfigInterface {
    dependcyConfData = [{
        "schedulerId": "111",
        "desc": "sss",
        "status": "aa",
        "runType": "aaa",
        "num": "2",
        "startDate": "2018-01-23",
        "endDate": "2018-01-23",
    }];
    s: any = {
        pi: 1,
        ps: 10,
        s: ''
    };
    total = 0;
    zIndex: number;
    constructor(
        public http: _HttpClient,
        public msgSrv: NzMessageService,
        private modalHelper: ModalHelper,
        private modal: NzModalService){
        this.zIndex = 2;
    }
    ngOnInit() {
        this.load();
    }

    openHistoryRecord(item){
        this.modalHelper.static(SchedulerHistoryComponent,{item},{size:450},{zIndex:999}).subscribe( () => {
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
