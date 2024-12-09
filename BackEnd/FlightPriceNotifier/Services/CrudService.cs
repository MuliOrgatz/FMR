// Services/CrudService.cs
using FlightPriceNotifier.Data;
using FlightPriceNotifier.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace FlightPriceNotifier.Services
{
  public class CrudService : ICrudService
  {
    private readonly DatabaseContext _context;
    private readonly IDistributedCache _cache;

    public CrudService(DatabaseContext context, IDistributedCache cache)
    {
      _context = context;
      _cache = cache;
    }

    public async Task<List<UserPreference>> GetUserPreferencesAsync()
    {
      return await _context.UserPreferences.ToListAsync();
    }

    public async Task<UserPreference> GetUserPreferenceByIdAsync(int userId)
    {
      return await _context.UserPreferences.FirstOrDefaultAsync(up => up.UserId == userId);
    }

    public async Task<UserPreference> GetUserPreferenceFromCacheAsync(int userId)
    {
      var cacheKey = $"UserPreference:{userId}";
      var cachedData = await _cache.GetStringAsync(cacheKey);

      if (!string.IsNullOrEmpty(cachedData))
      {
        return JsonSerializer.Deserialize<UserPreference>(cachedData);
      }

      var userPreference = await GetUserPreferenceByIdAsync(userId);
      if (userPreference != null)
      {
        await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(userPreference), new DistributedCacheEntryOptions
        {
          AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10) // Cache expiry
        });
      }

      return userPreference;
    }

    public async Task AddUserPreferenceAsync(UserPreference userPreference)
    {
      _context.UserPreferences.Add(userPreference);
      await _context.SaveChangesAsync();

      var cacheKey = $"UserPreference:{userPreference.UserId}";
      await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(userPreference), new DistributedCacheEntryOptions
      {
        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
      });
    }

    public async Task UpdateUserPreferenceAsync(UserPreference userPreference)
    {
      _context.UserPreferences.Update(userPreference);
      await _context.SaveChangesAsync();

      var cacheKey = $"UserPreference:{userPreference.UserId}";
      await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(userPreference), new DistributedCacheEntryOptions
      {
        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
      });
    }

    public async Task DeleteUserPreferenceAsync(int userId)
    {
      var userPreference = await GetUserPreferenceByIdAsync(userId);
      if (userPreference != null)
      {
        _context.UserPreferences.Remove(userPreference);
        await _context.SaveChangesAsync();
        await InvalidateUserPreferenceCacheAsync(userId);
      }
    }

    public async Task<List<Notification>> GetNotificationsAsync(int userId)
    {
      return await _context.Notifications
          .Where(n => n.UserId == userId)
          .ToListAsync();
    }

    public async Task InvalidateUserPreferenceCacheAsync(int userId)
    {
      var cacheKey = $"UserPreference:{userId}";
      await _cache.RemoveAsync(cacheKey);
    }
  }
}
