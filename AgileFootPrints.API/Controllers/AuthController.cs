using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AgileFootPrints.API.Data;
using AgileFootPrints.API.Dtos;
using AgileFootPrints.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AgileFootPrints.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly DataContext _context;

        public AuthController(DataContext context, IConfiguration config,
          IMapper mapper,
          UserManager<User> userManager,
          SignInManager<User> signInManager)
        {
            _context = context;
            _config = config;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userForLoginDto.Username);
            if (user == null)
            {
                return Unauthorized();
            }
            var result = await _signInManager
            .CheckPasswordSignInAsync(user, userForLoginDto.Password, false);
            if (result.Succeeded)
            {

                var appUser = await _userManager.Users.Include(x => x.WorkItems)
                .FirstOrDefaultAsync(u => u.NormalizedUserName == userForLoginDto.Username.ToUpper());
                //var userToReturn = _mapper.Map<User>(appUser);
                return Ok(new
                {
                    token = GenerateJwtToken(appUser).Result,
                    user = appUser
                });
            }
            return Unauthorized();
        }

        public async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)  //using foreach cuz one user can have multiple roles
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }


            var key = new SymmetricSecurityKey(Encoding.UTF8.
            GetBytes(_config.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = cred
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var userToCreate = _mapper.Map<User>(userForRegisterDto);
            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);
            _userManager.AddToRoleAsync(userToCreate, "Member").Wait();
            if (result.Succeeded)
            {
                return StatusCode(201);
                /* CreatedAtRoute("GetUser",
               new { controller = "Users", id = userToCreate.Id }, userToCreate);*/
            }
            return BadRequest(result.Errors);
        }


        [HttpGet("getUser/{userName}")]
        public async Task<IActionResult> GetUser(string userName)
        {
            if (userName == null || userName == "")
                return BadRequest("User not found");
            var user = await _context.Users.Where(x => x.UserName == userName)
            .Select(x => new { x.Id, x.FirstName, x.LastName, x.UserName, x.Email }).SingleOrDefaultAsync();
            return Ok(user);

        }
    }


}