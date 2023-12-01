import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EditorService } from '../../services/editor/editor.service';
import * as _ from 'lodash-es'

@Component({
  selector: 'lib-progress-status',
  templateUrl: './progress-status.component.html',
  styleUrls: ['./progress-status.component.scss']
})
export class ProgressStatusComponent implements OnInit {
  toolbarConfig: any = {};
  pageId = 'progressStatus';
  expandedElement="";
  treeData:any
  criteriaList:any
  @Output() progressStatusEmitter = new EventEmitter<any>();
  
  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
    this.toolbarConfig = this.editorService.getToolbarConfig();
    this.toolbarConfig.title = 'Observation Form';
    this.treeData=this.editorService.treeData
    let initialData = _.first(this.treeData);
    let data={
      id:initialData.id,
      title:initialData?.title,
      tooltip:initialData?.title,
      primaryCategory:_.get(this.editorService,'editorConfig.config.primaryCategory'),
      metadata:{
        objectType:_.get(this.editorService,'editorConfig.config.objectType'),
        name:initialData?.title
      },
      children:initialData?.children,
      root:false,
      icon:'fa fa-folder-o',
      folder:true
    }
    this.treeEventListener(data)
  }

  toolbarEventListener(event) {
    switch (event.button) {
      case 'backContent':
        this.redirectToQuestionSet();
        break;
      default :
        break;
    }
  }

  redirectToQuestionSet() {
      this.progressStatusEmitter.emit({ status: false });
  }

  expand(event){
    this.expandedElement = (this.expandedElement==event.id)?"":event.id;
  }


  treeEventListener(event){
    if(!_.isEmpty(event.children)){
      this.criteriaList=event.children
    }
  }

}