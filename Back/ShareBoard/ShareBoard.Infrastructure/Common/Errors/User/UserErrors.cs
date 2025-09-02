namespace ShareBoard.Infrastructure.Common.Errors.User;

public static class UserErrors
{
    public static Error UserNotFoundError()
    {
        return Error.NotFound("User.NotFound", "User not found");
    } 

    public static Error UserNotCreatedError(string description)
    {
        return Error.Validation("User.Validation", description);
    }

    public static Error UserNotAssignedToRole()
    {
        return Error.InternalServerError("User.Roles", "User couldn't be assigned to roles");  
    } 
}