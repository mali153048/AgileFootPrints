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

    public class NotificationController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public NotificationController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpPost("addNew")]

        public async Task<IActionResult> AddNew(NotifcationToSaveDto notifcation)
        {
            if (notifcation == null)
                return BadRequest("Invalid data format");
            var sender = _context.Users.Where(x => x.UserName == notifcation.Sender)
                .SingleOrDefault();
            var reciever = _context.Users.Where(x => x.UserName == notifcation.Reciever)
                .SingleOrDefault();
            int senderId = sender.Id;
            int recieverId = reciever.Id;
            int projectId = notifcation.ProjectId;
            var notifcationToSave = new Notification()
            {
                projectId = projectId,
                SenderId = senderId,
                RecieverId = recieverId,
                isRead = false,
                isMail = notifcation.isMail,
                isNotification = notifcation.isNotification,
                Subject = notifcation.Subject,
                Message = notifcation.Message

            };
            await _context.Notifications.AddAsync(notifcationToSave);
            await _context.SaveChangesAsync();

            return Ok(notifcationToSave);
        }

        [HttpGet("getNotifications/{userId}")]
        public async Task<IActionResult> GetNotifications(string userId)
        {
            if (userId == null || userId == "")
                return BadRequest("User not found");
            var Notifications = await _context.Notifications
                .Where(x => x.RecieverId == Convert.ToInt32(userId))
                .Select(x => new
                {
                    x.Id,
                    x.Subject,
                    x.Message,
                    x.Sender.FirstName,
                    x.Sender.LastName,
                    x.SenderId,
                    x.Sender.UserName,
                    x.CreatedAt,
                    x.isRead,
                    x.projectId,
                    x.isMail,
                    x.isNotification
                }).ToArrayAsync();

            return Ok(Notifications);
        }
    }
}