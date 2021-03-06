import { MainService } from "src/app/main.service";
import { MyNotification, NotificationTypes } from "./myNotification";
import { OptionsService } from "src/app/options.service";

const MAX_NOTIFICATION = 50;
export class NotificationManager {
  notifications = new Array<MyNotification>();

  addNotification(noti: MyNotification, opt = 0) {
    this.notifications.unshift(noti);
    if (this.notifications.length > MAX_NOTIFICATION) this.notifications.pop();

    if (
      noti.type === NotificationTypes.BATTLE_WIN &&
      !OptionsService.instance.battleWinNotification
    ) {
      return;
    }
    if (
      noti.type === NotificationTypes.BATTLE_LOST &&
      !OptionsService.instance.battleLostNotification
    ) {
      return;
    }
    if (noti.type === NotificationTypes.WARP) {
      if (!OptionsService.instance.allWarpNoti) return;
      if (opt < 10 && !OptionsService.instance.smallWarpNoti) return;
    }
    if (
      noti.type === NotificationTypes.SPACE_STATION_COMPLETED &&
      !OptionsService.instance.spaceStationNotifications
    ) {
      return;
    }
    if (
      noti.type === NotificationTypes.EXPERIENCE &&
      !OptionsService.instance.expNoti
    ) {
      return;
    }
    if (
      noti.type === NotificationTypes.ENEMY_DEFEATED &&
      !OptionsService.instance.enemyDefeatNoti
    ) {
      return;
    }
    if (
      noti.type === NotificationTypes.RESEARCH &&
      !OptionsService.instance.researchNoti
    ) {
      return;
    }
    if (
      noti.type === NotificationTypes.RESEARCH_INSPIRED &&
      !OptionsService.instance.researchBoostNoti
    ) {
      return;
    }

    MainService?.instance?.notificationEmitter?.emit(noti);
  }
}
