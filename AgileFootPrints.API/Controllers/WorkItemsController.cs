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
        [HttpGet("getUserWorkItems/{userId}")]
        public async Task<IActionResult> GetUserWorkItems(string userId)
        {
            int Id = Convert.ToInt32(userId);
            var list = await _context.Stories.Where(x => x.UserId == Id).ToListAsync();
            return Ok(list);
        }


    }
}