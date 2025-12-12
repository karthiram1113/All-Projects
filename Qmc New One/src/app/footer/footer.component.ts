import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
// import { LiveChatWidgetModel, LiveChatWidgetApiModel } from '@livechat/angular-widget';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public isLiveChatWidgetLoaded: boolean = false;
  // public liveChatApi: LiveChatWidgetApiModel;
  public visitor!: { name: string; email: string };
  public params!: { name: string; value: string }[];

  // @ViewChild('liveChatWidget', {static: false}) public liveChatWidget: LiveChatWidgetModel;
  licence: number = 11082047;
  lang: any;
  country: any;
  constructor() {
    this.lang = localStorage.getItem('language');
    this.country = localStorage.getItem('country');
  }

  // onChatLoaded(api: LiveChatWidgetApiModel): void {
  // this.liveChatApi = api;
  // this.isLiveChatWidgetLoaded = true;

  // Sometimes it can happen that LC_Invite is is still being loaded when onChatLoaded is called. To ensure that LC_Invite is loaded you can give additional check to onChatLoaded function:
  // api.on_after_load = () => {
  //   this.liveChatApi = api;
  //   this.isLiveChatWidgetLoaded = true;
  // };
  // }

  // onChatWindowMinimized() {
  //   console.log('minimized')
  // }

  // onChatWindowOpened() {
  //   console.log('opened')
  // }

  // openChatWindow(): void {
  //   if (this.isLiveChatWidgetLoaded) {
  //     this.liveChatWidget.openChatWindow();

  // You can also use methods directly on liveChatApi instance
  // for more details plese read our documentation
  // https://developers.livechatinc.com/docs/extending-ui/extending-chat-widget/javascript-api/#methods
  // this.liveChatApi.open_chat_window();
  //   };
  // }

  // hideChatWindow() {
  //   if (this.isLiveChatWidgetLoaded) {
  //     this.liveChatWidget.minimizeChatWindow();

  // You can also use methods directly on liveChatApi instance
  // for more details plese read our documentation
  // https://developers.livechatinc.com/docs/extending-ui/extending-chat-widget/javascript-api/#methods
  // this.liveChatApi.minimize_chat_window();
  //     };
  //   }
}
