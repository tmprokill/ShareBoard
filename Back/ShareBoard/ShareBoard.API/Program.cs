using AutoMapper;
using ShareBoard.API.Configurations;
using ShareBoard.Infrastructure.Mappers.Auth;

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
        //All configurations are located in the configurations folder and are created
        //as extension methods to better separate the code. To add services to DI go
        //to ConfigureBuilder.cs.
    }
}