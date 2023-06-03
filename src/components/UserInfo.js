export default class UserInfo {
  constructor(settingsInfo) {
    this._profileName = document.querySelector(settingsInfo.profileNameSelector);
    this._profileJob =  document.querySelector(settingsInfo.profileJobSelector);
    this.profileAvatar = document.querySelector(settingsInfo.profileAvatarSelector);
  }

  getUserInfo() {
    return {username: this._profileName.textContent, job: this._profileJob.textContent}
  }
   
  setUserInfo({name, job, avatar}) {
    this.profileAvatar.src = avatar;
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}
