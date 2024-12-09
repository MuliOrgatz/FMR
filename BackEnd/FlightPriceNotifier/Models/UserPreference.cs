namespace FlightPriceNotifier.Models
{
  public class UserPreference
  {
    public int UserPreferenceId { get; set; }
    public int UserId { get; set; }
    public string PreferredDestinations { get; set; }
    public decimal MaxPrice { get; set; }
    public string Currency { get; set; }
  }
}