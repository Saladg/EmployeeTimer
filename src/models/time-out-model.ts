export class TimeOutModel {
  constructor(

    public date: string,
    public worker_timeout_id: string,
    public time_out: string,
    public check_status: boolean

  ) {

    let today = new Date();
    this.date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    this.time_out = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  }
}
