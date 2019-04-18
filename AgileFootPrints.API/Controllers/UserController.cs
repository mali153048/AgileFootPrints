using System;
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
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        [HttpGet("getUser/{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            int userId = Convert.ToInt32(id);
            var user = await _context.Users.FindAsync(userId);
            var userToReturn = _mapper.Map<UserToReturnDto>(user);
            return Ok(userToReturn);
        }

        [HttpPut("editUser/{id}")]
        public async Task<IActionResult> EditUser(string id, UserToReturnDto user)
        {
            int userId = Convert.ToInt32(id);
            if (userId != user.Id)
                return BadRequest();
            var userObj = _context.Users.FindAsync(userId);
            // _context.Entry(userChk).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(user);
        }
    }
}