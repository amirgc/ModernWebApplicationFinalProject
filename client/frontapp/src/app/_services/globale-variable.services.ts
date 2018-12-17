import { Injectable, Inject } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class GlobalService {
  /**for hide and show order panel */
  private getShowHideOrderingList_ = new Subject<boolean>();
  /**loader screen */
  private showLoader = new Subject<boolean>();

  getShowHideOrderingList$ = this.getShowHideOrderingList_.asObservable();
  getShowLoaderValue$ = this.showLoader.asObservable();

  setShowHideOrderingList(value: boolean) {
    this.getShowHideOrderingList_.next(value);
  }

  setShowLoader(value: boolean) {
    this.showLoader.next(value);
  }
}
