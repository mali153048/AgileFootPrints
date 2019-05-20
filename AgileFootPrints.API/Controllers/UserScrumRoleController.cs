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
            bool ProduOwnerExists = false;
            bool ScrumMasterExists = false;
            var check = _context.UserProjectRole.Where(x => x.UserId == scrumRoleDto.UserId
                         && x.ProjectId == scrumRoleDto.ProjectId &&
                         x.ScrumRolesId == scrumRoleDto.ScrumRolesId).FirstOrDefault();
            if (scrumRoleDto.ScrumRolesId == 1)
            {
                var ProductOwnerCheck = await _context.UserProjectRole
                                       .Where(x => x.ProjectId == scrumRoleDto.ProjectId
                                        && x.ScrumRolesId == 1).FirstOrDefaultAsync();
                //Check if produc owner exist against this project
                if (ProductOwnerCheck != null)
                {
                    ProduOwnerExists = true;
                }

            }
            if (scrumRoleDto.ScrumRolesId == 2)
            {
                var ScrumMasterCheck = await _context.UserProjectRole
                                       .Where(x => x.ProjectId == scrumRoleDto.ProjectId
                                        && x.ScrumRolesId == 2).FirstOrDefaultAsync();
                //Check if Scru m master exist against this project
                if (ScrumMasterCheck != null)
                {
                    ScrumMasterExists = true;
                }

            }


            if (check != null || ProduOwnerExists == true || ScrumMasterExists == true)
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

        [HttpGet("getUserRoles/{projectId}")]
        public async Task<IActionResult> GetUserRoles(string projectId)
        {

            var ids = _context.UserProjectRole.Where(x => x.ProjectId == Convert.ToInt32(projectId))
                    .Select(x => new { x.UserId, x.ScrumRolesId }).ToArray();
            UserRoleToReturnDto[] str = new UserRoleToReturnDto[ids.Length];
            int i = 0;
            foreach (var item in ids)
            {
                var user = await _context.Users.Where(x => x.Id == item.UserId)
                            .Select(x => new { x.FirstName, x.LastName, x.Id }).FirstOrDefaultAsync();
                var roleName = await _context.ScrumRoles.Where(x => x.Id == item.ScrumRolesId)
                            .Select(x => new { x.ScrumRoleName, x.Id }).FirstOrDefaultAsync();
                UserRoleToReturnDto dto = new UserRoleToReturnDto()
                {
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    RoleId = roleName.Id,
                    RoleName = roleName.ScrumRoleName
                };
                str[i] = dto;
                i++;
            }
            return Ok(str);

        }

        [HttpPost("removeRole/{projectId}")]
        public async Task<IActionResult> RemoveRole(string projectId, UserRoleToReturnDto InDto)
        {
            var roleToDelete = await _context.UserProjectRole
                    .Where(x => x.ProjectId == Convert.ToInt32(projectId)
                    && x.ScrumRolesId == InDto.RoleId && x.UserId == InDto.UserId)
                    .FirstOrDefaultAsync();
            _context.UserProjectRole.Remove(roleToDelete);
            await _context.SaveChangesAsync();
            return Ok();
        }


    }
}