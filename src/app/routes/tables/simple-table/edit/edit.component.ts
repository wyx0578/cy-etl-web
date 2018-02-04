import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ModalHelper } from '@delon/theme';

@Component({
    selector: 'app-extras-poi-edit',
    templateUrl: './edit.component.html'
})
export class ExtrasPoiEditComponent implements OnInit {
    i: any;
    //iStatus = "有效"
    //status: string[] = [1,2];
    title = "编辑";
    status: any;
    //status: string[] = [{"sLabel":"有效","sValue":"1"},{"sLabel":"无效","sValue":"2"}];
    item = {
        "iAutoid": "",
        "sCode": "",
        "sDesc": "",
        "sVersion": "",
        "iStatus": "1",
        "sStartDate": "",
        "sEndDate": "2030-12-12"
    };
    constructor(
        private modalHelper: ModalHelper,
        private subject: NzModalSubject,
        public msgSrv: NzMessageService,
        public http: _HttpClient) { }
    ngOnInit() {
        this.http.get('http://localhost:8080/cy-etl-java/api/transform/COMMON_STATUS').subscribe((res: any) => {
            this.status = res.data;
            console.log(res.data);
        });
        if (this.i == -1) {
            this.title = "添加";
            this.i = this.item;
            /*this.http.get('./assets/pois.json').subscribe((res: any) => this.i = res.data[0]);*/
            return;
        }
        this.http.put('http://localhost:8080/cy-etl-java/api/dictionary/dictionaryVersion/query',this.i).subscribe((res: any) => {
            this.i = res.data;
            console.log(res.data);
        });
        this.i.iStatus = this.i.iStatus + '';
    }

    /**
     * 保存
     * @param value
     */
    save(value) {
        //alert(value)
        console.log("value -->" + value.iAutoid);
        if(this.title == '编辑'){
            this.http.put('http://localhost:8080/cy-etl-java/api/dictionary/dictionaryVersion/',value).subscribe(() => {
                this.msgSrv.success('保存成功！');
                this.subject.next('false');
                this.close();
            });
        }else {
            delete value.iAutoid;
            var s = new Date(value.sStartDate);
            value.sStartDate = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate();
            var reg = /([a-zA-Z])/g;
            if (reg.test(value.sEndDate)) {
                var e = new Date(value.sEndDate);
                value.sEndDate = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate();
            }
            this.http.post('http://localhost:8080/cy-etl-java/api/dictionary/dictionaryVersion/',value).subscribe(() => {
                this.msgSrv.success('保存成功！');
                this.subject.next('false');
                this.close();
            });
        }
    }

    close() {
        this.subject.destroy();
    }
}
