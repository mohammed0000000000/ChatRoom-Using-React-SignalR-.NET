
using ChatApp.DataServices;
using ChatApp.Hubs;
using Microsoft.EntityFrameworkCore;

namespace ChatApp
{
	public class Program
	{
		public static void Main(string[] args) {
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddSignalR();
			builder.Services.AddControllers();

			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			// Add Cors
			builder.Services.AddCors(options => {
				options.AddPolicy("reactApp", builder => {
					builder.AllowAnyHeader().
					AllowAnyMethod().AllowCredentials().
					WithOrigins("http://localhost:5173");
				});
			});
			builder.Services.AddSingleton<SharedDb>();

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment()) {
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();

			app.UseAuthorization();

			app.MapControllers();

			app.UseCors("reactApp");
			app.MapHub<ChatHub>("/Chat").RequireCors("reactApp");
			app.Run();
		}
	}
}
