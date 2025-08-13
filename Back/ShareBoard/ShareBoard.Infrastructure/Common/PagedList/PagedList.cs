﻿using Microsoft.EntityFrameworkCore;

namespace ShareBoard.Infrastructure.Common.PagedList;

public class PagedList<T> : IPagedList<T>
{
    public PagedList(IEnumerable<T> currentPage, int count, int pageNumber, int pageSize)
    {
        CurrentPage = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        PageSize = pageSize;
        TotalCount = count;
        Items = currentPage;
    }
    
    public int CurrentPage { get; set; }
    
    public int TotalPages { get; set; }
    
    public int PageSize { get; set; }
    
    public int TotalCount { get; set; }
    
    public IEnumerable<T> Items { get; set; }

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var count = await source.CountAsync();
        var items = await source.Skip(pageNumber * pageSize).Take(pageSize).ToListAsync();
        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}