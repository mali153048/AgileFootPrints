using System;
using System.Linq;
using System.Threading.Tasks;
using AgileFootPrints.API.Data;
using AgileFootPrints.API.Dtos;
using AgileFootPrints.API.Models;
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
            int pId = Convert.ToInt32(projectId);
            var sprints = await _context.Sprints.Where(x => x.projectId == pId).ToListAsync();
            return Ok(sprints);
        }

        [HttpPost("newSprint")]
        public async Task<IActionResult> NewSprint(SprintDto sprint)
        {
            var sprintToSave = _mapper.Map<Sprint>(sprint);
            await _context.Sprints.AddAsync(sprintToSave);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetSprint", new { id = sprintToSave.Id }, sprint);
        }
        [HttpGet("{id}", Name = "GetSprint")]
        public async Task<IActionResult> GetSprint(int id)
        {
            var sprint = await _context.Sprints.FindAsync(id);
            if (sprint == null)
            {
                return NotFound("Some error occured");
            }
            var sprintToReturn = _mapper.Map<SprintDto>(sprint);
            return Ok(sprintToReturn);
        }

    }
}