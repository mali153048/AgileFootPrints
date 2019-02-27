using System;
using System.Collections.Generic;
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
    public class WorkItemsController : ControllerBase
    {
        private DataContext _context;
        public WorkItemsController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("getUserWorkItems/{id}")]
        public async Task<IActionResult> GetUserWorkItems(string id)
        {
            int userId = Convert.ToInt32(id);
            var list = await _context.WorkItems.Where(x => x.UserId == userId).ToListAsync();
            return Ok(list);
        }


    }
}