using System;
using System.Linq;
using System.Threading.Tasks;
using AgileFootPrints.API.Data;
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
    public class MeetingController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MeetingController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpPost("createMeeting")]
        public async Task<IActionResult> CreateMeeting(Meeting Meeting)
        {
            Meeting.Date = TimeZone.CurrentTimeZone.ToLocalTime(Meeting.Date);
            await _context.Meetings.AddAsync(Meeting);
            await _context.SaveChangesAsync();
            return Ok(Meeting);
        }

        [HttpGet("getProjectMeetings/{projectId}")]
        public async Task<IActionResult> GetProjectMeetings(string projectId)
        {
            if (projectId == null || projectId == "")
            {
                return BadRequest();
            }
            var Meetings = _context.Meetings.Where(x => x.ProjectId == Convert.ToInt32(projectId)).ToArray();
            return Ok(Meetings);
        }
    }
}