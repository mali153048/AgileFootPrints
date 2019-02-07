using System;
using System.Linq;
using System.Threading.Tasks;
using AgileFootPrints.API.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgileFootPrints.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class SprintController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SprintController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpGet("getSprints/{projectId}")]
        public async Task<IActionResult> GetSprints(string projectId)
        {
            if (projectId == "")
                return BadRequest("Bad Request");
            int pId = Convert.ToInt32(projectId);
            var sprints = await _context.Sprints.Where(x => x.projectId == pId).ToListAsync();
            return Ok(sprints);
        }

    }
}