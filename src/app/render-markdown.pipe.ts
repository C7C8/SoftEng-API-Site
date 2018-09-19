import { Pipe, PipeTransform } from '@angular/core';
import * as showdown from 'showdown';
const conv = new showdown.Converter();


@Pipe({
  name: 'renderMarkdown'
})
export class RenderMarkdownPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    conv.setOption('headerLevelStart', 4);
    return conv.makeHtml(value.replace('/\\n/g', '\n'));
  }
}
