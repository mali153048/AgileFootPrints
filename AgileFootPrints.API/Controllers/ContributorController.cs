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
    public class ContributorController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ContributorController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpPost("newContributor/{userId}")]
        public async Task<IActionResult> NewContributor(string userId, Notification notification)
        {
            if (userId == null || userId == "" || notification.Id == 0 || notification.projectId == 0)
            {
                return BadRequest("Invalid data format");
            }
            var noti = await _context.Notifications.FindAsync(notification.Id);
            noti.isRead = true;
            var contributor = new ProjectContributor()
            {
                UserId = Convert.ToInt32(userId),
                ProjectId = notification.projectId

            };
            await _context.projectContributors.AddAsync(contributor);
            var delNoti = await _context.Notifications.FindAsync(notification.Id);
            _context.Notifications.Remove(delNoti);
            await _context.SaveChangesAsync();
            return Ok();

        }

        [HttpGet("getContributors/{projectId}")]
        public async Task<IActionResult> GetContributors(string projectId)
        {
            if (projectId == null || projectId == "")
                return BadRequest("Invalid data format");
            int id = Convert.ToInt32(projectId);
            var data = await (from user in _context.Users
                              join pc in _context.projectContributors on user.Id equals pc.UserId
                              join project in _context.Projects on pc.ProjectId equals project.Id
                              where pc.ProjectId == id
                              select new
                              {
                                  user.Id,
                                  user.FirstName,
                                  user.LastName,
                                  user.Email,
                                  user.UserName,
                                  user.PhoneNumber
                              }).ToArrayAsync();



            return Ok(data);
        }

        [HttpPost("removeContributor/{projectId}")]
        public async Task<IActionResult> RemoveContributor(string projectId,
         ContributorDto contributor)
        {
            var user = await _context.Users.FindAsync(contributor.Id);
            if (user == null || projectId == null || projectId == "")
                return NotFound();

            var projectContributor = await _context.projectContributors
                .Where(x => x.ProjectId == Convert.ToInt32(projectId) && x.UserId == user.Id)
                .FirstOrDefaultAsync();
            _context.projectContributors.Remove(projectContributor);
            await _context.SaveChangesAsync();
            return Ok();
        }


    }
}