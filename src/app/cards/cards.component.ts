import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  AfterViewInit
} from "@angular/core";
import { PrestigeCard } from "../model/prestige/prestigeCard";
import { MainService } from "../main.service";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList
} from "@angular/cdk/drag-drop";
import { Game } from "../model/game";
import { LEVEL_PER_CARD } from "../model/CONSTANTS";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements OnInit, AfterViewInit {
  available: Array<PrestigeCard>;
  inUse: Array<PrestigeCard>;
  points = 0;
  LEVEL_PER_CARD = LEVEL_PER_CARD;
  @HostBinding("class.disable-animation") animationDisabled = true;
  constructor(public ms: MainService) {}

  ngOnInit(): void {
    this.available = this.ms.game.prestigeManager.cards.filter(
      (c) => !c.active
    );
    this.inUse = this.ms.game.prestigeManager.cards.filter((c) => c.active);
    this.reloadPoints();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.animationDisabled = false;
    });
  }
  reloadPoints() {
    this.points = this.inUse.reduce((p, c) => p + c.cardRequired, 0);
  }
  getCardId(index: number, card: PrestigeCard) {
    return card.id;
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.reloadPoints();
  }
  maxPredicate(item: CdkDrag<PrestigeCard>, list: CdkDropList<PrestigeCard>) {
    const points = list
      .getSortedItems()
      .reduce((p, c) => p + c.data.cardRequired, 0);
    return (
      points + item.data.cardRequired - 1 <
      Game.getGame().prestigeManager.maxCards
    );
  }
  confirm() {
    this.ms.game.prestigeManager.cards.forEach((card) => (card.active = false));
    this.inUse.forEach((card) => (card.active = true));
    this.ms.game.prestigeManager.lockedCars = true;
  }
}
