import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class SseService {
  subject: Subject<Record<string, any>>;

  getSubject() {
    return this.subject.asObservable();
  }

  sendEvent(data: Record<string, any>) {
    this.subject.next(data);
  }
}
