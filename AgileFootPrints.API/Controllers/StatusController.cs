using System.Linq;
using AgileFootPrints.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgileFootPrints.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class StatusController : ControllerBase
    {
        private readonly DataContext _context;
        public StatusController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetStatus()
        {
            var statusList = _context.Statuses.ToList();
            return Ok(statusList);
        }
    }
}