import { DashboardClass } from "../dashboard.class";
import { RoomInterface } from "../room-mgt/room-mgt.service";

export class UserMgtClass extends DashboardClass {

    constructor() {
      super()
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

    getRoomId(room: string, rooms: RoomInterface[]): string {
      const fn: RoomInterface[] = []
      rooms.forEach((r) => {
        if (r.name === room) {
          fn.push(r) 
        }
      })
      return fn[0]._id
    }
}