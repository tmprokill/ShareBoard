namespace ShareBoard.API.Configurations;

public static class ConfigureApp
{
    public static void Configure(this WebApplication app)
    {
        var config = app.Configuration;
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }
        
        app.UseHttpsRedirection();

        app.UseCors((options) =>
        {
            options
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins(config.GetSection("ApplicationURLs")["FrontEnd"]);
        });


        app.UseAuthentication();
        app.UseAuthorization();


        app.MapControllers();
    }
}