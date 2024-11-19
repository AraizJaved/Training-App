import { environment } from '../../../environments/environment'

export class Config {

  public static getControllerUrl(controllerName: string, actionName?: string, isMobile: boolean = false) {
    if (isMobile) {
      return this.getMobileApiUrl() + '/' + controllerName + (actionName ? '/' + actionName : '')
    }
    return this.getApiUrl() + '/' + controllerName + (actionName ? '/' + actionName : '')
  }

  public static getApiUrl() {
    return this.getServerUrl() + '/api'
  }

  public static getMobileApiUrl() {
    return this.getServerUrl() + '/api-mobile'
  }

  public static getServerUrl() {
    return environment.production ? '' : 'https://localhost:50322'
    // return environment.production ? '' : 'http://116.58.20.67:1213'
    // return environment.production ? '' : 'http://172.16.7.228:4488'
  }

  public static dashifyCNIC(cnic: string) {
    return cnic[0] +
      cnic[1] +
      cnic[2] +
      cnic[3] +
      cnic[4] +
      '-' +
      cnic[5] +
      cnic[6] +
      cnic[7] +
      cnic[8] +
      cnic[9] +
      cnic[10] +
      cnic[11] +
      '-' +
      cnic[12]
  }
}
