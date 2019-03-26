using System;
using System.Threading.Tasks;
using AgileFootPrints.API.Data;
using AgileFootPrints.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    }
}