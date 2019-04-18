using System.Linq;
using AgileFootPrints.API.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("getPriority")]
        public async Task<IActionResult> GetPriority()
        {
            var list = await _context.Priorities.ToListAsync();
            return Ok(list);
        }
    }
}