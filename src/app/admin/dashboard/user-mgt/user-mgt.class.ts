import { UserInterface } from "src/app/core/user.service";

export class UserMgtClass {

    constructor() {}

    getCreator(betCreator: UserInterface, currentUserId: string): string {
        if (betCreator._id === currentUserId) {
            return 'You';
        } else {
            return betCreator.firstname /* + ' ' + betCreator.lastname */;
        }
    }

    getExpiredBookings(dDate: Date): boolean {
        //get todays date
        const todaysDate: Date = new Date();
        // Get departure date
        const departureDate: Date = new Date(dDate);
        if (departureDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)) {
            return true
        } else {
            return false
        }
    }

    getStatus(status: string): string {
        if (status === 'In') {
          return 'Checked In'
        }
        if (status === 'Out') {
          return 'Checked Out'
        }
        if (status === 'Reserved') {
          return 'Reservation'
        }
        return 'Pending'
      }
}