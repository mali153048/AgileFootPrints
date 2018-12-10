using System.Linq;
using AgileFootPrints.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AgileFootPrints.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PriorityController : ControllerBase
    {
        private readonly DataContext _context;
        public PriorityController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetPriority()
        {
            var priorityList = _context.Priorities.ToList();
            return Ok(priorityList);
        }
    }
}