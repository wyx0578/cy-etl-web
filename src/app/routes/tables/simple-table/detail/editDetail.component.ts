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
    title = "编辑";
    item = {
        "iAutoid": null,
        "iVersionId": null,
        "sValue": null,
        "sLabel": null
    };
    constructor(
        private modalHeloper: ModalHelper,
        private subject: NzModalSubject,
        public msgSrv: NzMessageService,
        public http: _HttpClient
    ){}
    ngOnInit(){
        if (this.i == -1){
            this.title = "添加";
            this.i = this.item;
        }
    }
    /**
     * 保存
     * @param value
     */
    save(value) {
        //alert(value)
        console.log("value -->" + value.iAutoid);
        if(this.title == '编辑'){
            this.http.put('http://localhost:8080/cy-etl-java/api/dictionary/dictionaryDetail/',value).subscribe(() => {
                this.msgSrv.success('保存成功！');
                this.subject.next('true');
                this.close();
            });
        }else {
            value.iVersionId = this.parentData.iAutoid;
            this.http.post('http://localhost:8080/cy-etl-java/api/dictionary/dictionaryDetail/',value).subscribe(() => {
                this.msgSrv.success('保存成功！');
                this.subject.next('true');
                this.close();
            });
        }
    }

    close() {
        this.subject.destroy();
    }
}
