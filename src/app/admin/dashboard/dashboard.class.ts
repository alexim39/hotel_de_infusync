export class DashboardClass {

    constructor() {}
  
    protected generateTransactionId (): number { // Generate unique random numbers
      return 1 + Math.floor(Math.random() * 999999999);
    }
}  