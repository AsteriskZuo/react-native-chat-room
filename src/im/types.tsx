import type {
  ChatClient,
  ChatCursorResult,
  ChatMessage,
  ChatRoom,
} from 'react-native-chat-sdk';

import type { UIKitError } from '../error';

export interface ChatroomServiceListener {
  // onMessageReceived?(roomId: string, message: ChatMessage): void;
  // onMessageRecalled?(
  //   roomId: string,
  //   message: ChatMessage,
  //   recalledUserId: string
  // ): void;
  // onGlobalNotifyReceived?(roomId: string, notifyMessage: ChatMessage): void;
  onUserJoined?(roomId: string, user: UserServiceData): void;
  onUserLeave?(roomId: string, userId: string): void;
  onAnnouncementUpdate?(roomId: string, announcement: string): void;
  onUserBeKicked?(roomId: string, reason: number): void;
  onUserMuted?(roomId: string, userId: string[], operatorId: string): void;
  onUserUnmuted?(roomId: string, userId: string[], operatorId: string): void;
  onUserAdmin?(roomId: string, userId: string, operatorId: string): void;
  onUserUnAmin?(roomId: string, userId: string, operatorId: string): void;
}

export type ChatroomMemberOperateType =
  | 'mute'
  | 'unmute'
  | 'block'
  | 'unblock'
  | 'admin'
  | 'unadmin';

export interface ChatroomService {
  destructor(): void;
  addListener(listener: ChatroomServiceListener): void;
  removeListener(listener: ChatroomServiceListener): void;
  clearListener(): void;
  join(roomId: string, userId: string): Promise<void>;
  leave(roomId: string, userId: string): Promise<void>;
  kickMember(roomId: string, userId: string): void;
  fetchMembers(roomId: string, pageSize: number): Promise<string[]>;
  fetchMutedMembers(roomId: string, pageSize: number): Promise<string[]>;
  fetchAnnouncement(roomId: string): Promise<string | undefined>;
  updateAnnouncement(roomId: string, announcement: string): Promise<void>;
  updateMemberState(
    roomId: string,
    userId: string,
    op: ChatroomMemberOperateType
  ): Promise<void>;
  sendTextMessage(params: {
    roomId: string;
    content: string;
    mentionIds?: string[];
  }): Promise<void>;
  sendCustomMessage(params: {
    roomId: string;
    eventType: string;
    eventParams: Record<string, string>;
    mentionIds?: string[];
  }): Promise<void>;
  recallMessage(messageId: string): Promise<void>;
  reportMessage(params: { tag: string; reason: string }): Promise<void>;
  translateMessage(message: ChatMessage): Promise<ChatMessage>;
}

export type GiftServiceData = {
  id: string;
  name: string;
  price: string;
  count: number;
  icon: string;
  effect: string;
  selected: boolean;
  sendedThenClose: boolean;
  sender?: UserServiceData;
};

export interface GiftServiceListener {
  receiveGift?(gift: GiftServiceData): void;
}

export interface GiftService {
  addListener(listener: GiftServiceListener): void;
  removeListener(listener: GiftServiceListener): void;
  clearListener(): void;
  sendGift(gift: GiftServiceData): Promise<void>;
}

export type UserServiceData = {
  userId: string;
  nickName?: string;
  avatarURL?: string;
  gender?: number;
  identify?: string;
};

export interface UserService {
  /**
   * Get user information. Throws exception object {@link UIKitError} on failure. If you use synchronous return, you can use `await getUserInfo('John')`, if you use asynchronous return, you can use `getUserInfo('John').then().catch()`.
   */
  fetchUserInfosFromServer(userIds: string[]): Promise<UserServiceData[]>;
  uploadMyselfUserInfoToServer(user: UserServiceData): Promise<void>;
}

export enum DisconnectReasonType {
  token_will_expire = 'token_will_expire',
  token_did_expire = 'token_did_expire',
  app_active_number_reach_limit = 'app_active_number_reach_limit',
  user_did_login_from_other_device = 'user_did_login_from_other_device',
  user_did_remove_from_server = 'user_did_remove_from_server',
  user_did_forbid_by_server = 'user_did_forbid_by_server',
  user_did_change_password = 'user_did_change_password',
  user_did_login_too_many_device = 'user_did_login_too_many_device',
  user_kicked_by_other_device = 'user_kicked_by_other_device',
  user_authentication_failed = 'user_authentication_failed',
  others = 'others',
}

export interface ClientServiceListener {
  onConnected?(): void;
  onDisconnected?(reason: DisconnectReasonType): void;
}

export interface ClientService {
  destructor(): void;
  addListener(listener: ClientServiceListener): void;
  removeListener(listener: ClientServiceListener): void;
  clearListener(): void;
  login(params: {
    userId: string;
    userToken: string;
    userNickname?: string;
    userAvatarURL?: string;
  }): Promise<void>;
  logout(): Promise<void>;
  currentUserId(): string | undefined;
  getClientInstance(): ChatClient;
}

// export interface IMServiceListener {
//   onConnected?(): void;
//   onDisconnected?(reason: DisconnectReasonType): void;

//   onUserJoined?(roomId: string, user: UserServiceData): void;
//   onUserLeave?(roomId: string, userId: string): void;
//   onAnnouncementUpdate?(roomId: string, announcement: string): void;
//   onUserBeKicked?(roomId: string, reason: number): void;
//   onUserMuted?(roomId: string, userId: string[], operatorId: string): void;
//   onUserUnmuted?(roomId: string, userId: string[], operatorId: string): void;
//   onUserAdmin?(roomId: string, userId: string, operatorId: string): void;
//   onUserUnAmin?(roomId: string, userId: string, operatorId: string): void;

//   onMessageReceived?(roomId: string, message: ChatMessage): void;
//   onMessageRecalled?(
//     roomId: string,
//     message: ChatMessage,
//     recalledUserId: string
//   ): void;
//   onGlobalNotifyReceived?(roomId: string, notifyMessage: ChatMessage): void;
// }

export interface MessageServiceListener {
  onMessageReceived?(roomId: string, message: ChatMessage): void;
  onMessageRecalled?(roomId: string, message: ChatMessage): void;
  onGlobalNotifyReceived?(roomId: string, notifyMessage: ChatMessage): void;
}

export type IMServiceListener = ClientServiceListener &
  ChatroomServiceListener &
  MessageServiceListener;

export type RoomState = 'joining' | 'joined' | 'leaving' | 'leaved';

export interface IMService {
  addListener(listener: IMServiceListener): void;
  removeListener(listener: IMServiceListener): void;
  clearListener(): void;

  /**
   * If the built-in method is not enough, you can get the original IM object through this method.
   */
  get client(): ChatClient;

  login(params: {
    userId: string;
    userToken: string;
    userNickname?: string;
    userAvatarURL?: string;
    result: (params: { isOk: boolean; error?: UIKitError }) => void;
  }): Promise<void>;
  logout(): Promise<void>;
  loginState(): Promise<'logged' | 'noLogged'>;

  get userId(): string | undefined;

  getUserInfo(id: string): UserServiceData | undefined;
  getUserInfos(ids: string[]): UserServiceData[];
  updateUserInfo(user: UserServiceData): UserServiceData;
  fetchUserInfos(ids: string[]): Promise<UserServiceData[]>;
  updateSelfInfo(self: UserServiceData): Promise<void>;
  getNoExisted(ids: string[]): string[];

  get roomId(): string | undefined;
  get ownerId(): string | undefined;
  get roomState(): RoomState;

  fetchChatroomList(pageNum: number): Promise<ChatRoom[]>;
  joinRoom(roomId: string, room: { ownerId: string }): Promise<void>;
  leaveRoom(roomId: string): Promise<void>;
  kickMember(roomId: string, userId: string): void;
  fetchMembers(
    roomId: string,
    pageSize: number,
    cursor?: string
  ): Promise<ChatCursorResult<string>>;
  fetchMutedMembers(roomId: string, pageSize: number): Promise<string[]>;
  fetchAnnouncement(roomId: string): Promise<string | undefined>;
  updateAnnouncement(roomId: string, announcement: string): Promise<void>;
  updateMemberState(
    roomId: string,
    userId: string,
    op: ChatroomMemberOperateType
  ): Promise<void>;

  sendText(params: {
    roomId: string;
    content: string;
    mentionIds?: string[];
    result: (params: {
      isOk: boolean;
      message?: ChatMessage;
      error?: UIKitError;
    }) => void;
  }): Promise<void>;
  sendGift(params: {
    roomId: string;
    gift: GiftServiceData;
    mentionIds?: string[];
    result: (params: {
      isOk: boolean;
      message?: ChatMessage;
      error?: UIKitError;
    }) => void;
  }): Promise<void>;
  sendJoinCmd(params: {
    roomId: string;
    mentionIds?: string[];
    result: (params: {
      isOk: boolean;
      message?: ChatMessage;
      error?: UIKitError;
    }) => void;
  }): Promise<void>;
  recallMessage(messageId: string): Promise<void>;
  reportMessage(params: {
    messageId: string;
    tag: string;
    reason: string;
  }): Promise<void>;
  /**
   * ref: https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support
   * @param message the message object.
   * @param languagesCode the language code.
   * @returns the translated message.
   */
  translateMessage(
    message: ChatMessage,
    languagesCode: string
  ): Promise<ChatMessage>;
}

export type IMServiceInit = {
  appKey: string;
  debugMode?: boolean;
};
