using Microsoft.EntityFrameworkCore;
using FlightPriceNotifier.Models;

namespace FlightPriceNotifier.Data
{
  public class DatabaseContext : DbContext
  {
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

    public DbSet<Notification> Notifications { get; set; }
    public DbSet<UserPreference> UserPreferences { get; set; }

  }
}