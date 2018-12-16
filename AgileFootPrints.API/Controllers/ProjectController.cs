using System;
using System.Linq;
using System.Threading.Tasks;
using AgileFootPrints.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgileFootPrints.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ProjectController : ControllerBase
    {
        private readonly DataContext _context;
        public ProjectController(DataContext context)
        {
            _context = context;

        }

        [HttpGet("getUserProjects/{id}")]
        public async Task<IActionResult> GetUserProjects(string id)
        {
            int userId = Convert.ToInt32(id);
            var userProjectList = await _context.Projects.Where(x => x.UserId == userId).ToListAsync();
            return Ok(userProjectList);
        }
    }
}