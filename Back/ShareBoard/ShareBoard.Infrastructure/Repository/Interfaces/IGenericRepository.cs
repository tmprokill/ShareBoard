﻿using System.Linq.Expressions;
using ShareBoard.Domain.Models;
using ShareBoard.Infrastructure.Common.PagedList;
using ShareBoard.Infrastructure.Common.Predicate;
using ShareBoard.Infrastructure.Common.ResultPattern;

namespace ShareBoard.Infrastructure.Repository.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<Result<IEnumerable<T>>> GetListByConditionAsync(Expression<Func<T, bool>> condition,
        IEnumerable<Func<IQueryable<T>, IQueryable<T>>>? includes = null);

    Task<Result<T>> GetSingleByConditionAsync(Expression<Func<T, bool>> condition,
        IEnumerable<Func<IQueryable<T>, IQueryable<T>>>? includes = null);

    Task<Result<int>> AddAsync(T item);

    Task<Result<bool>> AddRangeAsync(IEnumerable<T> items);

    Task<Result<bool>> UpdateAsync(T item);

    Task<Result<bool>> DeleteAsync(Expression<Func<T, bool>> condition);

    Task<Result<PagedList<T>>> FetchPaginatedByConditions(
        IEnumerable<(Expression<Func<T, bool>> predicate, PredicateOptions options)> conditions,
        (Expression<Func<T, object>> expression, bool isDesc) orderBy,
        IEnumerable<Func<IQueryable<T>, IQueryable<T>>> includes,
        bool isNoTracking,
        bool isSplitQuery,
        int pageNumber,
        int pageSize
    );

    public Task SaveAsync();
}