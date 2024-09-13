using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Property
    {
        public int Id { get; set; }

        [Required]
        public string Address { get; set; }

        public string Description { get; set; }

        public int NumberOfBedrooms { get; set; }

        public int NumberOfBathrooms { get; set; }
        [Column(TypeName = "decimal(18, 2)")]

        public decimal SquareFootage { get; set; }

        public decimal MonthlyRent { get; set; }

        public bool IsOccupied { get; set; }

        public DateTime DateAdded { get; set; }

        public DateTime? LastModified { get; set; }

        public string LandlordId { get; set; }

        public Landlord Landlord { get; set; }

        public ICollection<Lease> Leases { get; set; }

        public ICollection<MaintenanceRequest> MaintenanceRequests { get; set; }

        public ICollection<Inspection> Inspections { get; set; }
    }
}