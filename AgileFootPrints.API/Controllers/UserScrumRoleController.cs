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
    public class UserScrumRoleController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserScrumRoleController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpGet("getScrumRoles")]
        public async Task<IActionResult> GetScrumRoles()
        {
            return Ok(await _context.ScrumRoles.ToListAsync());
        }

        [HttpPost("assignRole")]
        public async Task<IActionResult> AssignRole(ScrumRoleDto scrumRoleDto)
        {

            var check = _context.UserProjectRole.Where(x => x.UserId == scrumRoleDto.UserId
                         && x.ProjectId == scrumRoleDto.ProjectId
                         && x.ScrumRolesId == scrumRoleDto.ScrumRolesId).FirstOrDefault();
            if (check != null)
            {
                return BadRequest();
            }
            ScrumRoleDto dto = new ScrumRoleDto()
            {
                UserId = scrumRoleDto.UserId,
                ProjectId = scrumRoleDto.ProjectId,
                ScrumRolesId = scrumRoleDto.ScrumRolesId
            };
            var RoleToSave = _mapper.Map<UserProjectRole>(dto);
            await _context.UserProjectRole.AddAsync(RoleToSave);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}