using ChatApp.DataServices;
using ChatApp.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
	public class ChatHub : Hub
	{
		private readonly string botUser;
		private readonly SharedDb sharedDb;
		public ChatHub(SharedDb sharedDb) {
			botUser = "ChatBot";
			this.sharedDb = sharedDb;
		}

		public override Task OnConnectedAsync() {
			return base.OnConnectedAsync();
		}
		public override async Task OnDisconnectedAsync(Exception? exception) {
			try {
				if (sharedDb.connections.TryRemove(Context.ConnectionId, out UserConnection userConnection)) {
					if (!string.IsNullOrEmpty(userConnection.ChatRoom) && !string.IsNullOrEmpty(userConnection.User)) {
						await Clients.Group(userConnection.ChatRoom)
							.SendAsync("ReceiveMessage", botUser, $"{userConnection.User} has left");
						await SendUsersConnected(userConnection.ChatRoom);
					}
				}
			} catch (Exception ex) {
				Console.WriteLine($"Error in OnDisconnectedAsync: {ex.Message}");
			}
			await base.OnDisconnectedAsync(exception);
		}
		public async Task JoinRoom(UserConnection userConnection) {
			try {
				if (string.IsNullOrEmpty(userConnection.ChatRoom) || string.IsNullOrEmpty(userConnection.User)) {
					throw new ArgumentException("ChatRoom and User cannot be null or empty.");
				}
				await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom);

				sharedDb.connections.AddOrUpdate(Context.ConnectionId, userConnection, (key, oldValue) => userConnection);
				await Clients.Group(userConnection.ChatRoom)
				.SendAsync("ReceiveMessage", botUser, $"{userConnection.User} has joined {userConnection.ChatRoom}");

				//await Clients.Caller.SendAsync("ReceiveMessage", botUser, $"Welcome to {userConnection.ChatRoom}, {userConnection.User}!");

				await SendUsersConnected(userConnection.ChatRoom);

			} catch (Exception ex) { Console.WriteLine(ex.ToString()); }
		}
		public async Task SendUsersConnected(string chatRoom) {
			try {
				var users = sharedDb.connections.Values
					.Where(c => c.ChatRoom == chatRoom)
					.Select(uc => uc.User)
					.ToList();

				await Clients.Group(chatRoom).SendAsync("UsersInRoom", users);
			} catch (Exception ex) {
				Console.WriteLine($"Error in SendUsersConnected: {ex.Message}");
			}
		}
		public async Task SendMessage(string message) {
			try {
				if (string.IsNullOrWhiteSpace(message)) {
					throw new ArgumentException("Message cannot be null or empty.");
				}
				if (sharedDb.connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection)) {
					await Clients.Group(userConnection.ChatRoom)
						.SendAsync("ReceiveMessage", userConnection.User, message);
				}
			} catch (Exception ex) {
				Console.WriteLine($"Error in SendMessage: {ex.Message}");
			}
		}

	}
}
