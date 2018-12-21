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
    public class ProjectController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProjectController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpGet("getUserProjects/{id}")]
        public async Task<IActionResult> GetUserProjects(string id)
        {
            int userId = Convert.ToInt32(id);
            var userProjectList = await _context.Projects.Where(x => x.UserId == userId).ToListAsync();
            return Ok(userProjectList);
        }



        [HttpPost("createNewProject")]
        public async Task<IActionResult> CreateNewProject(ProjectDto projectDto)
        {
            var projectToCreate = _mapper.Map<Project>(projectDto);
            _context.Projects.Add(projectToCreate);
            var result = await _context.SaveChangesAsync();
            return CreatedAtAction("GetNewlyCreatedproject", new { id = projectDto.Id }, projectDto);
        }

        [HttpGet]
        public async Task<ActionResult<Project>> GetNewlyCreatedproject(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }


    }
}