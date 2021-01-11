import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ContentService } from '../../core/services/content.service';
import { NgxSpinnerService } from "ngx-spinner";
import * as MediumEditor from 'medium-editor';
import * as moment from 'moment';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
})
export class TextEditorComponent implements OnInit, AfterViewInit {
  editor: MediumEditor.MediumEditor;
  content: string;
  lastModified: string;

  @ViewChild('editable', { static: true }) editable!: ElementRef;

  constructor(private contentService: ContentService,
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    const { uid } = this.authService.getAuthUser();
    this.getStoredContent(uid);
  }

  ngAfterViewInit(): void {
    this.editor = new MediumEditor(this.editable.nativeElement, {
      placeholder: {
        text: 'Start writing...'
      }
    }).subscribe('editableInput', (event: any, editable: any) => {
      const contentInEditor = this.editor.getContent();
      const newLatexContent = this.implementLatex(contentInEditor) || "";
      if (this.content !== newLatexContent) this.writeContent(newLatexContent)
      if (!(contentInEditor === newLatexContent)) this.editor.setContent(newLatexContent);
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor = undefined;
  }

  getStoredContent(uid: string) {
    this.contentService.getContentByUid(uid)
      .subscribe((res) => {
        const data = res.data() || {};
        if (!data.modified) {
          this.spinner.hide();
          return false;
        }

        this.lastModified = moment(data.modified.seconds * 1000).fromNow();
        this.content = data.content;
        this.spinner.hide();
        this.editor.setContent(this.content);
      });
  }

  writeContent(content: string): void {
    const { uid } = this.authService.getAuthUser();
    const modified: Date = new Date();
    this.contentService.writeContent({
      uid,
      content: content,
      modified
    });
    this.lastModified = moment(modified).fromNow()
  }

  implementLatex(content: string) {
    return content.replace(/\$(.*?)\$/g, (sub, content) => {
      return `<span>&#8203;</span><latex-js baseURL="https://cdn.jsdelivr.net/npm/latex.js/dist/">\\[ ${content} \\]</latex-js><span>&#8203;</span>`
    })
  }
}
