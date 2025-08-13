namespace ShareBoard.Infrastructure.Common.Errors.User;

public static class UserErrors
{
    public static Error UserNotFoundError = Error.NotFound("User.NotFound", "User not found");
    
    public static Error UserNotCreatedError = Error.Validation("User.Validation", "User wasn't created");
}