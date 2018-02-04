import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { _HttpClient } from '@delon/theme';
import {NzModalService} from 'ng-zorro-antd';
import { ExtrasPoiEditComponent } from './edit/edit.component';
import { DictDetailEditComponent } from './detail/editDetail.component';
import { Subject } from 'rxjs/Subject';

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
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    dictVersionData: any[] = [];
    dictDetailData: any[] = [];
    s: any = {
        "sCode": null,
        "sDesc": null,
        "iStatus": "1"
    };
    total = 0;
    isDictionDetail = false;
    sLabelData = {};
    constructor(
        public http: _HttpClient,
        public msgSrv: NzMessageService,
        private modalHelper: ModalHelper,
        private modal: NzModalService) { }

    ngOnInit() {
        this.load();
        this.dtOptions = {
            //"dom": '<"top">rt<"bottom"ip><"clear">',
            "language": {"url" : "../../../../assets/dataTablesLanguage.json"},
            "scrollX": true,
            //"order": "desc",
            "bFilter": false,
            "pagingType": "full_numbers",
            "bLengthChange": false,
            "columnDefs": [{
                "targets": 4,
                "render": function(data,type,row,meta){
                    $.ajax({
                        type : "GET",
                        url : 'http://localhost:8080/cy-etl-java/api/transform/COMMON_STATUS/' + data,
                        async : false,//取消异步
                        success : function(response){
                            data = response.data.sLabel;
                        }
                    });
                    return data;
                }
            }]
        };

    }

   /* ngAfterViewInit(): void {
        this.dtTrigger.next();
    }*/
    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }
    load(reload: boolean = false) {
        if (reload) {
            this.s.pi = 1;
        }
        this.http.get('http://localhost:8080/cy-etl-java/api/dictionary/dictionaryVersion').subscribe((res: any) => {
            this.dictVersionData = res.data;
            this.total = res.total;
            console.log(res.data);
        });
    }

    addOrEdit(i) {
        this.modalHelper.static(ExtrasPoiEditComponent, { i },450).subscribe(() => {
            this.load();
            //rerender();
            this.msgSrv.info('回调，重新发起列表刷新');
        });
    }

    delete(i) {
        this.modal.open({
            title: '温馨提示',
            content: "是否要删除该条数据？",
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.http.delete('http://localhost:8080/cy-etl-java/api/dictionary/dictionaryVersion/'+ i.sCode).subscribe((res: any) => {
                    if (res.meta.success == true){
                        this.load()
                        this.msgSrv.success('删除成功！');
                    }else {
                        this.msgSrv.success('删除失败！');
                    }
                });
            },
            onCancel: () => {
            }
        });
    }

    parentData: any;
    openDetail(item){
        this.parentData = item;
        console.log("item -->" + item);
        this.http.get('http://localhost:8080/cy-etl-java/api/dictionary/dictionaryDetail/' + item.iAutoid).subscribe((res: any) => {
            this.dictDetailData = res.data;
            //this.total = res.total;
        });
        this.isDictionDetail = true;
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

    close() {
        alert("main")
        this.subject.destroy();
    }

    /**
     * 搜索
     */
    search(){
        this.http.put('http://localhost:8080/cy-etl-java/api/dictionary/dictionaryVersion/query',this.s).subscribe((res: any) => {
            this.dictVersionData = res.data;
            this.total = res.total;
            console.log(res.data);
        });
    }
}
