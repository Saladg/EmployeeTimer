export class TimeInModel {
  constructor(

    public date: string,
    public worker_timein_id: string,
    public time_in: string,
    public check_status: boolean

  ) {

    let today = new Date();
    this.date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    this.time_in = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  }
}
