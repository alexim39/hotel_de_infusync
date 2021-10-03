import { UserInterface } from "src/app/core/user.service";
import { formatDate } from "@angular/common";

export class DashboardClass {

    constructor() {}
  
    protected generateTransactionId (): number { // Generate unique random numbers
      return 1 + Math.floor(Math.random() * 999999999);
    }

  getCreator(betCreator: UserInterface, currentUserId: string): string {
    if (betCreator._id === currentUserId) {
        return 'You';
    } else {
        return betCreator.firstname /* + ' ' + betCreator.lastname */;
    }
  }

  createDate(postdate: string): string {
    const format = 'MMM d, y';
    //const myDate = '2019-06-29';
    const locale = 'en-US';

    //get todays date
    const todaysDate: Date = new Date();
    // Get start date
    const postDate: Date = new Date(postdate);

    // check if post is today
    if (postDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
      // Date equals today's date
      return 'Today';
    } else {
      // return formated date
      return formatDate(postdate, format, locale);//postdate;
    }
  }
}  