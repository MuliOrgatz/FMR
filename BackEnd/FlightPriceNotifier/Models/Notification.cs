
namespace FlightPriceNotifier.Models
{
  public class Notification
  {
    public int NotificationId { get; set; }
    public int UserId { get; set; }
    public int FlightId { get; set; }
    public string Message { get; set; }
    public string Status { get; set; }
    public DateTime Timestamp { get; set; }
  }
}