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
    public class EpicController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EpicController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpGet("getEpics/{id}")]
        public async Task<IActionResult> getEpics(string id)
        {
            if (id == null)
                return BadRequest();
            int projectId = Convert.ToInt32(id);

            var result = await _context.Projects.Where(x => x.Id == projectId)
                        .Include(e => e.Epics).ToListAsync();
            return Ok(result);

        }

        [HttpGet("getEpicStories/{id}")]
        public async Task<IActionResult> GetEpicStories(string id)
        {
            if (id == null)
                return BadRequest("Not epic found");
            int epicId = Convert.ToInt32(id);
            var result = await _context.Stories.Where(x => x.EpicId == epicId).ToListAsync();
            return Ok(result);
        }
    }
}