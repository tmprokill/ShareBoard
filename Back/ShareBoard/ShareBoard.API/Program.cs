using ShareBoard.API.Configurations;

namespace ShareBoard.API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        builder.Configure();

        var app = builder.Build();

        app.Configure();

        app.Run();
    }
}