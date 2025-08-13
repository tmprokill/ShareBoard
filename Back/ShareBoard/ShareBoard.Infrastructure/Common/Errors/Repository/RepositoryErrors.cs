namespace ShareBoard.Infrastructure.Common.Errors.Repository;

//Think about it as well, i don't like it.
public static class RepositoryErrors
{
    public static readonly Error NotFoundError =
        Error.NotFound("Repository.NotFoundError", "Entity not found");
    public static readonly Error UpdateError =
        Error.Conflict("Repository.UpdateError", "Entity couldn't be updated");
    public static readonly Error AddError =
        Error.Conflict("Repository.AddError", "Entity couldn't be added");
    public static readonly Error DeleteError =
        Error.NotFound("Repository.DeleteError", "Entity couldn't be deleted");
    public static readonly Error FetchError =
        Error.NotFound("Repository.FetchError", "Entity couldn't be fetched");
}