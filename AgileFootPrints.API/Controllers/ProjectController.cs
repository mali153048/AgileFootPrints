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
            await _context.SaveChangesAsync();
            int pid = projectToCreate.Id;
            return CreatedAtRoute("GetNewlyCreatedproject",
             new { id = projectToCreate.Id }, projectToCreate);
        }

        [HttpGet("{id}", Name = "GetNewlyCreatedproject")]
        public async Task<ActionResult<ProjectDto>> GetNewlyCreatedproject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            var projectToReturn = _mapper.Map<ProjectDto>(project);
            if (project == null)
            {
                return NotFound();
            }

            return projectToReturn;
        }

        [HttpDelete("deleteproject/{id}")]
        public async Task<ActionResult> Deleteproject(string id)
        {
            int projectId = Convert.ToInt32(id);
            var projectToDelete = await _context.Projects.FindAsync(projectId);
            if (projectToDelete == null)
                return NotFound();
            _context.Projects.Remove(projectToDelete);
            await _context.SaveChangesAsync();
            return Ok();

        }

        [HttpGet("getProject/{id}")]
        public async Task<IActionResult> GetProject(string id)
        {
            int projectId = Convert.ToInt32(id);
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null)
                return NotFound();
            var projectToReturn = _mapper.Map<ProjectToReturnDto>(project);
            return Ok(projectToReturn);
        }

    }
}