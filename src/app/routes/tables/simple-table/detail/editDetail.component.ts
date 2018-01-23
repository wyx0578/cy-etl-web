import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ModalHelper } from '@delon/theme';

@Component({
    selector: 'dict-detail-edit',
    templateUrl: 'editDetail.component.html'
})

export class DictDetailEditComponent implements OnInit {
    i : any;
    parentData : any;
    item = [{
        "iAutoid": "",
        "iVersionId": "",
        "sValue": "",
        "sLabel": "",
        "iCreateTime": "",
        "iUpdateTime": ""
    }];
    constructor(
        private modalHeloper: ModalHelper,
        private subject: NzModalSubject,
        public msgSrv: NzMessageService,
        public http: _HttpClient
    ){}
    ngOnInit(){
        if (this.i == -1){
            this.i = this.item;
        }
    }
    save() {
        this.http.get('./assets/pois.json').subscribe(() => {
            this.msgSrv.success('保存成功，只是模拟，实际未变更');
            this.subject.next('true');
            this.close();
        });
    }

    close() {
        this.subject.destroy();
    }
}
