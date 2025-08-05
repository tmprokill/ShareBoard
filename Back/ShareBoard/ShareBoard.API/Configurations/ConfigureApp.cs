namespace ShareBoard.API.Configurations;

public static class ConfigureApp
{
    public static void Configure(this WebApplication app)
    {
        var config = app.Configuration;
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        
        app.UseHttpsRedirection();

        app.UseCors((options) =>
        {
            options
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins(config.GetSection("ApplicationURLs")["FrontEnd"] ?? "monkey sigma");
        });


        app.UseAuthentication();
        app.UseAuthorization();

        app.UseExceptionHandler();
        app.MapControllers();
    }
}