using AgileFootPrints.API.Dtos;
using AgileFootPrints.API.Models;
using AutoMapper;

namespace AgileFootPrints.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserToReturnDto, User>();
            CreateMap<ProjectDto, Project>();
            CreateMap<Project, ProjectDto>();
            CreateMap<UserToReturnDto, User>();
            CreateMap<StoryDto, Story>();
            CreateMap<Story, StoryDto>();
            CreateMap<Project, ProjectToReturnDto>();
            CreateMap<Epic, EpicToReturnDto>();
            CreateMap<EpicToReturnDto, Epic>();
            CreateMap<SprintDto, Sprint>();

        }
    }
}