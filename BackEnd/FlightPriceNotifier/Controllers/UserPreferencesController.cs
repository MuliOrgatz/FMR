// Controllers/UserPreferencesController.cs
using FlightPriceNotifier.Models;
using FlightPriceNotifier.Services;
using Microsoft.AspNetCore.Mvc;

namespace FlightPriceNotifier.Controllers
{
  [ApiController]
  [Route("api/user-preferences")]
  public class UserPreferencesController : ControllerBase
  {
    private readonly ICrudService _crudService;

    public UserPreferencesController(ICrudService crudService)
    {
      _crudService = crudService;
    }

    [HttpGet]
    public async Task<ActionResult<List<UserPreference>>> GetAll()
    {
      var preferences = await _crudService.GetUserPreferencesAsync();
      return Ok(preferences);
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserPreference>> GetById(int userId)
    {
      var preference = await _crudService.GetUserPreferenceFromCacheAsync(userId);
      if (preference == null) return NotFound();
      return Ok(preference);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] UserPreference userPreference)
    {
      await _crudService.AddUserPreferenceAsync(userPreference);
      return Ok(new { Message = "User preference added successfully." });
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UserPreference userPreference)
    {
      await _crudService.UpdateUserPreferenceAsync(userPreference);
      return Ok(new { Message = "User preference updated successfully." });
    }

    [HttpDelete("{userId}")]
    public async Task<IActionResult> Delete(int userId)
    {
      await _crudService.DeleteUserPreferenceAsync(userId);
      return Ok(new { Message = "User preference deleted successfully." });
    }
  }
}
