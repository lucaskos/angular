import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {


  constructor() {
  }

  clear() {

  }

  error(error: any) {
    console.log(error);
  }
}
