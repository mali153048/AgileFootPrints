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
    [Authorize]
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

        [HttpPatch("editProject/{id}")]
        public async Task<IActionResult> EditProject(string id, ProjectToReturnDto project)
        {
            int projectId = Convert.ToInt32(id);
            var projectFromDb = await _context.Projects.FindAsync(projectId);
            if (projectFromDb == null)
                return NotFound();
            projectFromDb.ProjectName = project.projectName;
            projectFromDb.ProjectDescription = project.projectDescription;
            projectFromDb.ProjectKey = project.projectKey;
            projectFromDb.StatusId = project.statusId;
            await _context.SaveChangesAsync();
            return Ok(project);
        }


        [HttpGet("myContributions/{userId}")]
        public async Task<IActionResult> UserProjectContributions(string userId)
        {
            var data = await (from user in _context.Users
                              join pc in _context.projectContributors on user.Id equals pc.UserId
                              join project in _context.Projects on pc.ProjectId equals project.Id
                              where pc.UserId == Convert.ToInt32(userId)
                              select new
                              {
                                  //getting project details to which the user is contributing
                                  // along with project owner details 
                                  userId = project.User.Id,
                                  firstName = project.User.FirstName,
                                  lastName = project.User.LastName,
                                  email = project.User.Email,
                                  userName = project.User.UserName,
                                  phoneNumber = project.User.PhoneNumber,
                                  projectId = project.Id,
                                  projectName = project.ProjectName,
                                  projectKey = project.ProjectKey,
                                  project.Status.status
                              }).ToArrayAsync();
            if (data == null)
                return BadRequest();
            return Ok(data);
        }


        [HttpPost("viewProjectArtifacts/{contributorsId}/{projectId}")]
        public async Task<IActionResult> ViewProjectArtifacts(string contributorsId, string projectId)
        {
            var isInRole = await _context.UserProjectRole.Where(x => x.UserId == Convert.ToInt32(contributorsId)
                              && x.ProjectId == Convert.ToInt32(projectId)).ToArrayAsync();


            return Ok(isInRole);
        }
        [HttpGet("getProjectName/{projectId}")]
        public async Task<IActionResult> GetProjectName(string projectId)
        {
            var name = await _context.Projects.Where(x => x.Id == Convert.ToInt32(projectId))
                        .Select(x => new { x.ProjectName }).FirstOrDefaultAsync();
            if (name == null)
                return NotFound();
            return Ok(name);
        }
    }


}