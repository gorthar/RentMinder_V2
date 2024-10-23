using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.Mappers
{
    public static class PropertyMapper
    {
        public static PropertyDto ToPropertyDto(this Property property)
        {
            return new PropertyDto
            {
                Id = property.Id,
                Address = property.Address,
                Description = property.Description,
                NumberOfBedrooms = property.NumberOfBedrooms,
                NumberOfBathrooms = property.NumberOfBathrooms,
                SquareFootage = property.SquareFootage,
                IsOccupied = property.IsOccupied,
                DateAdded = property.DateAdded,
                LastModified = property.LastModified,
                LandlordId = property.LandlordId
            };
        }
        public static Property ToProperty(this PropertyDto propertyDto)
        {
            return new Property
            {
                Id = propertyDto.Id,
                Address = propertyDto.Address,
                Description = propertyDto.Description,
                NumberOfBedrooms = propertyDto.NumberOfBedrooms,
                NumberOfBathrooms = propertyDto.NumberOfBathrooms,
                SquareFootage = propertyDto.SquareFootage,
                IsOccupied = propertyDto.IsOccupied,
                DateAdded = propertyDto.DateAdded,
                LastModified = propertyDto.LastModified,
                LandlordId = propertyDto.LandlordId
            };
        }
        public static IEnumerable<PropertyDto> ToPropertyDtos(this IEnumerable<Property> properties)
        {
            return properties.Select(ToPropertyDto);
        }
        public static IEnumerable<Property> ToProperties(this IEnumerable<PropertyDto> propertyDtos)
        {
            return propertyDtos.Select(ToProperty);
        }
    }
}