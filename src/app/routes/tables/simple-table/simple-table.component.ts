import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { _HttpClient } from '@delon/theme';
import {NzModalService} from 'ng-zorro-antd';
import { ExtrasPoiEditComponent } from './edit/edit.component';
import { DictDetailEditComponent } from './detail/editDetail.component';

@Component({
    selector: 'app-simple-table',
    templateUrl: './simple-table.component.html',
    styles  : [ `
    :host ::ng-deep .vertical-center-modal {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host ::ng-deep .vertical-center-modal .ant-modal {
      top: 0;
    }
  ` ]
})
export class DemoSimpleTableComponent implements OnInit{
    list: any[] = [];
    dictDetail: any[] = [];
    s: any = {
        pi: 1,
        ps: 10,
        s: ''
    };
    total = 0;
    isDictionDetail = false;

    constructor(
        public http: _HttpClient,
        public msgSrv: NzMessageService,
        private modalHelper: ModalHelper,
        private modal: NzModalService) { }

    ngOnInit() {
        this.load();
    }

    load(reload: boolean = false) {
        if (reload) {
            this.s.pi = 1;
        }
        this.http.get('./assets/pois.json', this.s).subscribe((res: any) => {
            this.list = res.data;
            this.total = res.total;
        });
        this.http.get('./assets/temp/dictDetail.json', this.s).subscribe((res: any) => {
            this.dictDetail = res.data;
            console.log(this.dictDetail);
        });
    }
    addOrEdit(i) {
        this.modalHelper.static(ExtrasPoiEditComponent, { i },450).subscribe(() => {
            this.load();
            this.msgSrv.info('回调，重新发起列表刷新');
        });
    }

    delete(i) {
        this.msgSrv.success('删除成功！');
    }

    parentData: any;
    openDetail(item){
        this.isDictionDetail = true;
        this.parentData = item;
    }

    addOrEditDetail(i){
        if(this.parentData == null){
            this.modal[i]({
                //title: ``,
                content: `<span style="font-size: 20px">请先双击选择字典！</span>`
            });
            return;
        }
        if (i == "error"){
            i = -1;
        }
        console.log("de:" + i)
        let parentData = this.parentData;
        console.log("parentData:" + parentData);
        this.modalHelper.static(DictDetailEditComponent,{i,parentData},450).subscribe( () => {
            this.load();
            this.msgSrv.info('回调，重新发起刷新列表');
        })
    }
}
