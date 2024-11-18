import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { SseSubjectDTO } from './subject.dto';

@Injectable()
export class SseService {
  subject: Subject<SseSubjectDTO>;

  getSubject() {
    return this.subject.asObservable();
  }

  sendEvent(data: SseSubjectDTO) {
    this.subject.next(data);
  }
}
