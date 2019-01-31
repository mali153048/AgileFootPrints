using System;
using System.Linq;
using System.Threading.Tasks;
using AgileFootPrints.API.Data;
using AgileFootPrints.API.Dtos;
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
        public async Task<IActionResult> GetEpics(string id)
        {
            if (id == null)
                return BadRequest();
            int projectId = Convert.ToInt32(id);


            var result = await _context.Projects.Include(e => e.Epics)
            .Include(x => x.Stories).Where(x => x.Id == projectId)
                        .ToListAsync();

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

        [HttpGet("getEpic/{projectId}/{epicId}")]
        public async Task<IActionResult> GetEpic(string projectId, string epicId)
        {
            int pId = Convert.ToInt32(projectId);
            int eId = Convert.ToInt32(epicId);
            var result = await _context.Epics.Where(x => x.ProjectId == pId && x.Id == eId).SingleOrDefaultAsync();
            if (result == null)
                return NotFound();
            var epicToReturn = _mapper.Map<EpicToReturnDto>(result);
            return Ok(epicToReturn);


        }
    }
}