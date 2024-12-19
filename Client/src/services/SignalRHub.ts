import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';

class SignalRHub {
  private connection: HubConnection | null = null;

  // Initialize connection to SignalR hub
  public async startConnection(hubUrl: string = "https://localhost:44357/Chat") {
    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      await this.connection.start();
      console.log('Connected to SignalR Hub');
    } catch (err) {
      console.error('Error connecting to SignalR Hub', err);
    }
  }

  // Join a chat room
  public async joinRoom(user: string, chatRoom: string) {
    if (this.connection) {
      try {
        await this.connection.invoke('JoinRoom', { User: user, ChatRoom: chatRoom });
        console.log(`Joined room: ${chatRoom}`);
      } catch (err) {
        console.error('Error joining room', err);
      }
    }
  }

  // Send a message to the chat
  public async sendMessage(message: string) {
    if (this.connection) {
      try {
        await this.connection.invoke('SendMessage', message);
        console.log("Send Message" + message);
      } catch (err) {
        console.error('Error sending message', err);
      }
    }
  }

  // Listen for new messages
  public async onReceiveMessage(callback: (user: string, message: string) => void) {
    if (this.connection) {
      await this.connection.on('ReceiveMessage', (user, message) => {
        callback(user, message);
      });
    }
  }

  // Listen for updated list of connected users
  public async onUsersInRoom(callback: (onlineUsers: string[]) => void) {
    if (this.connection) {
      await this.connection.on('UsersInRoom', (users) => {
        callback(users);
      });
    }
  }

  // Handle disconnection
  public async stopConnection() {
    if (this.connection) {
      await this.connection.stop();
      console.log('Disconnected from SignalR Hub');
    }
  }
}

export default new SignalRHub();
