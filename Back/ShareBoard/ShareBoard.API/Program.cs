using ShareBoard.API.Configurations;

namespace ShareBoard.API;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        builder.Configure();
        
        var app = builder.Build();

        await app.Configure();

        await app.RunAsync();
    }
}