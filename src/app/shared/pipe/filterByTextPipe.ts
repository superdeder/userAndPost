import {Pipe, PipeTransform} from '@angular/core';
import {Unique} from "../../interface/unique.interface";

@Pipe({name: 'filterByText'})
export class FilterByTextPipe implements PipeTransform {

  transform(textService: Unique[], textInput: string): any[] {
    if (!textService || !textInput) {
      return textService;
    }
    if (textInput && textInput.length > 3) {
      return textService.filter((singlePost: any) => singlePost.title.includes(textInput));
    } else {
      return textService;
    }
  }
}
