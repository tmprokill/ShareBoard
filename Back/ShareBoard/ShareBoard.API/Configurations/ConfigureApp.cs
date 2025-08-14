using ShareBoard.Infrastructure.Data;

namespace ShareBoard.API.Configurations;

public static class ConfigureApp
{
    public static async Task Configure(this WebApplication app)
    {
        var config = app.Configuration;

        app.UseExceptionHandler();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        using (var scope = app.Services.CreateScope())
        {
            var seeder = new DatabaseSeeder(scope);
            await seeder.SeedAsync();
        }

        
        app.UseHttpsRedirection();
        
        app.UseRouting();
        
        app.UseCors(options =>
        {
            options
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins(config.GetSection("ApplicationURLs")["FrontEnd"] ?? "monkey sigma");
        });
        
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();
    }
}