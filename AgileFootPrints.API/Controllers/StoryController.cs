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
    public class StoryController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public StoryController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        [HttpGet("getProjetcStories/{id}")]
        public async Task<IActionResult> GetProjetcStories(string id)
        {
            int Id = Convert.ToInt32(id);
            var stories = await _context.Stories.Where(x => x.PriorityId == Id).Include(e => e.Epic).ToListAsync();
            return Ok(stories);
        }


        [HttpDelete("deleteStory/{id}")]
        public async Task<ActionResult> DeleteStory(string id)
        {
            int storyId = Convert.ToInt32(id);
            var storyToDelete = await _context.Stories.FindAsync(storyId);
            if (storyToDelete == null)
                return NotFound();
            _context.Stories.Remove(storyToDelete);
            await _context.SaveChangesAsync();
            return Ok();

        }


    }
}