using FlightPriceNotifier.Models;

namespace FlightPriceNotifier.Services
{
  public interface ICrudService
  {
    Task<List<UserPreference>> GetUserPreferencesAsync();
    Task<UserPreference> GetUserPreferenceByIdAsync(int userId);
    Task AddUserPreferenceAsync(UserPreference userPreference);
    Task UpdateUserPreferenceAsync(UserPreference userPreference);
    Task DeleteUserPreferenceAsync(int userId);

    Task<List<Notification>> GetNotificationsAsync(int userId);

    Task<UserPreference> GetUserPreferenceFromCacheAsync(int userId);
    Task InvalidateUserPreferenceCacheAsync(int userId);
  }
}